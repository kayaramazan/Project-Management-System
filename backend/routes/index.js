const express = require('express');
const app = express()
const router = express.Router();
const config = require('../config.json')
const AuthList = require('./AuthList.json')
const curl = new (require('curl-request'))();
const homeController = require('../controller/homeController')
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
var auth = require('basic-auth') 

/* GET home page. */


const checkAuth = app.use((req, res, next) => {
    // authentication middleware

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // // Verify login and password are set and correct
    if (login && password && AuthList.filter(e => e.username == login && e.password == password).length > 0) {
      // Access granted...
      return next()
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message

    // -----------------------------------------------------------------------

  })

const getVersion = (req, res, next) => {




  lock.acquire("versionLock", function (done) {

    let projectName = req.params.projectName
    // get server ip 
    let server = config[projectName].filter(e => e.ip_no == req.params.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.params.appName);
    let url = finalObject[0].version

    curl.setHeaders([
      'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    ])
      .get(url)
      .then(({ statusCode, body, headers }) => {
        res.status(200).send({ response: body, url: url })
        done();
      })
      .catch((e) => {
        res.send({ success: false })
        console.log(e);
        done();
      });
  }, function (err, ret) {
    console.log("VersionLock Done")
  }, {});
}
const getConfig = (req, res, next) => {
  lock.acquire("configLock", function (done) {
    let projectName = req.params.projectName
    // get server ip 
    server = config[projectName].filter(e => e.ip_no == req.params.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.params.appName);
    let url = finalObject[0].configUrl
    curl.setHeaders([
      'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    ])
      .get(url)
      .then(({ statusCode, body, headers }) => {
        res.status(200).send({ response: body, url: url })
        done();
      })
      .catch((e) => {
        done();
        console.log(e);
      });
  }, function (err, ret) {
    console.log("ConfigLock Done")
  }, {});

}
const getLogConfig = (req, res, next) => {
  lock.acquire("logConfigLock", function (done) {
    let projectName = req.params.projectName
    // get server ip 
    server = config[projectName].filter(e => e.ip_no == req.params.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.params.appName);
    let url = finalObject[0].logUrl
    curl.setHeaders([
      'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    ])
      .get(url)
      .then(({ statusCode, body, headers }) => {
        res.status(200).send({ response: body, url: url })
        done();
      })
      .catch((e) => {
        done();

        console.log(e);
      });
  }, function (err, ret) {
    console.log("LogConfigLock Done")
  }, {});
}
const getLogServer = (req, res, next) => {

  lock.acquire("logServerLock", function (done) {
    let projectName = req.params.projectName
    // get server ip 
    server = config[projectName].filter(e => e.ip_no == req.params.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.params.appName);
    let url = finalObject[0].serverLog
    curl.setHeaders([
      'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    ])
      .get(url)
      .then(({ statusCode, body, headers }) => {
        res.status(200).send({ response: body, url: url })
        done();
      })
      .catch((e) => {
        done();

        console.log(e);
      });
  }, function (err, ret) {
    console.log("LogServerLock Done")
  }, {});
}


var servers = [], appName = [], projects = []
function getServers() {
  servers = [], appName = [], projects = []
  Object.keys(config).forEach(key => {
    machines = config[key]

    machines.forEach(element => {
      element.configs.forEach(async item => {
        appName.push({ name: item.appName, gitLink: item.gitSource })
      });
      servers.push({ ip: element.ip_no, name: appName })
      appName = []
    });

    projects.push({ projectName: key, list: servers })
    servers = []
  });
}



router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/servers', (req, res, next) => {
  getServers();
  if (projects.length > 0) {
    res.status(200).send(projects)
  }
  else
    res.status(200).send([])

})

router.get('/api/servers/config', (req, res, next) => {

  res.status(200).send(config)
})


router.post('/api/servers/getFile',(req,res)=>
{
  console.log(req.body)
  
  url = req.body.url
  curl.setHeaders([
    'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  ])
    .get(url)
    .then(({ statusCode, body, headers }) => {
      
      res.status(200).send({ response: body.substr(1,200), url: url }) 
    })
    .catch((e) => { 

      console.log(e);
    });
})

router.get('/api/servers/version/:projectName/:appName/:ip', getVersion);
router.get('/api/servers/version/:projectName/:appName/:ip', getVersion);
router.get('/api/servers/config/:projectName/:appName/:ip', getConfig);
router.get('/api/servers/logConfig/:projectName/:appName/:ip', getLogConfig);
router.get('/api/servers/logServer/:projectName/:appName/:ip', getLogServer);
router.get('/api/servers/search/:value', homeController.search);
router.post('/api/servers/configPost', checkAuth, homeController.configPost)
router.post('/api/servers/versionPost', checkAuth, homeController.versionPost)
router.post('/api/servers/configLogPost', checkAuth, homeController.logPost)
router.post('/api/servers/logReload', checkAuth, homeController.logReload)
router.post('/api/servers/configReload', checkAuth, homeController.configReload)
router.post('/api/servers/newProjectPost', checkAuth, homeController.newProjectPost)
router.post('/api/servers/addMachine', checkAuth, homeController.addMachine)
router.post('/api/servers/addConfigs', checkAuth, homeController.addConfigs)
router.post('/api/servers/deleteProject', checkAuth, homeController.deleteProject)
router.post('/api/servers/deleteIp', checkAuth, homeController.deleteIp)
router.post('/api/servers/selfPost', checkAuth, homeController.selfPost)
module.exports = router;



