
'use strict';
const path = require('path');
const views = path.join(__dirname, '../public');
const config = require("../config.json");
const http = require('http');
const request = require('request');
const fs = require('file-system');
global.gconfig = config;

const writeToConf = () => {
    try {
        let data = JSON.stringify(config);
        fs.writeFile('config.json', data, function (err) {
            console.log('err', err)
        })
    }

    catch (err) {
        console.log(err)
    }
}

let deleteIp = function (req, res, next) {
    let projectName = req.body.projectName
    let ip_no = req.body.ip

    if (req.body.appName) {
        let slicePosition = config[projectName].filter(e => e.ip_no == ip_no)[0].configs.findIndex(e => e.appName == req.body.appName)
        config[projectName][0].configs.splice(slicePosition, 1)
        writeToConf()
        res.send({ success: true })
    }

    else {
        config[projectName].splice(config[projectName].findIndex(e => e.ip_no == ip_no), 1)
        writeToConf()
        res.send({ success: true })
    }

}

let deleteProject = function (req, res, next) {
    let projectName = req.body.projectName
    if (config[projectName] && delete config[projectName]) {
        writeToConf()
        res.send({ success: true })
    }
    else
        res.send({ success: false })
}

let indexAction = function (req, res, next) {
    res.sendFile("app.html", { root: views });

};


let newProjectPost = function (req, res, next) {
    let newProject = req.body.projectName;
    if (!config[newProject]) {
        config[newProject] = []
        writeToConf()
    }
    else
        res.send({ config, success: false })
    res.send({ config, success: true })
}
//to do
let addMachine = async (req, res, next) => {
    let ip = req.body.ip
    let projectName = req.body.projectName
    if (ip != "" && projectName != "") {
        config[projectName].push({ ip_no: ip, configs: [] })
        writeToConf()
        res.send({ config, success: true })
    }
    else
        res.send({ success: false })
}

let addConfigs = (req, res, next) => {
    let ip = req.body.ip
    let projectName = req.body.projectName
    let newConfigs = req.body.configs

    config[projectName].filter(e => e.ip_no == ip)[0].configs.push(newConfigs);
    writeToConf()
    res.send({ config, success: true })

}

let configList = function (req, res, next) {
    res.json(config.machines);
};


let versionPost = function (req, res, next) {
    let ipNo = req.body.ip;
    let appName = req.body.appName;
    let projectName = req.body.projectName

    let veri = config[projectName].filter(e => e.ip_no == ipNo)[0].configs.filter(e => e.appName == appName)

    res.send(req.body)
}

let configPost = function (req, res, next) {
    let ipNo = req.body.ip;
    let appName = req.body.appName;
    let projectName = req.body.projectName

    let veri = config[projectName].filter(e => e.ip_no == ipNo)[0].configs.filter(e => e.appName == appName)
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: veri[0].configUpdateUrl,
        body: req.body.body
    }, function (error, response, body) {
        res.send({ body })
    });
};



var logPost = function (req, res, next) {

    let ipNo = req.body.ipNo;
    let appName = req.body.appName;
    let projectName = req.body.projectName

    let veri = config[projectName][0].filter(e => e.ip_no == ipNo)[0].configs.filter(e => e.appName == appName)

    request.post({
        //headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: veri.logUpdateUrl,
        form: req.body.body
    }, function (error, response, body) {
        res.send(body)
    });


}

var logReload = function (req, res) {
    let projectName = req.body.projectName
    // get server ip 
    server = config[projectName].filter(e => e.ip_no == req.body.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.body.appName);
    let url = finalObject[0]

    request(url.logReload, function (error, response, body) {
        //     console.error('error:', error); // Print the error if one occurred
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //     console.log('body:', body);  
        if (error)
            res.send({ success: false })
        else
            res.send({ success: true })
    });
};
var configReload = function (req, res) {
    let projectName = req.body.projectName
    // get server ip 
    server = config[projectName].filter(e => e.ip_no == req.body.ip)
    // get section by appName
    let finalObject = server[0].configs.filter(e => e.appName == req.body.appName);
    let url = finalObject[0]

    request(url.configReload, function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); 
        if (error)
            res.send({ success: false })
        else
            res.send({ success: true })
    });
};

var version = function (req, res, next) {
    var a = global.gconfig.machines;
    var ipNo = req.query.ipNo;
    var appname = req.query.appname;

    for (let i = 0; i < a.length; i++) {
        //console.log("element",a[i]);
        if (a[i].ip_no == ipNo) {
            const element = a[i].configs;
            //console.log("ipNo",element)
            for (let k = 0; k < element.length; k++) {
                const veri = element[k];
                if (veri.appName == appname) {
                    request.get({ url: veri.version }, function (error, response, body) {
                        //console.log("body",body);
                        res.send(body)
                    });
                }
            }
        }

    }
};

var checkStatus = function (req, res) {
    var a = global.gconfig.machines;
    var ipNo = req.query.ipNo;
    var appname = req.query.appname;

    for (let i = 0; i < a.length; i++) {
        //console.log("element",a[i]);
        if (a[i].ip_no == ipNo) {
            const element = a[i].configs;
            //console.log("ipNo",element)
            for (let k = 0; k < element.length; k++) {
                const veri = element[k];
                if (veri.appName == appname) {
                    request.get({ url: veri.checkStatus }, function (error, response, body) {
                        //console.log("body",body);
                        res.send(body)
                    });
                }
            }
        }
    }
};


const search = (req, res, next) => {
    let array = []
    let value = req.params.value 
    let regex = new RegExp(value, "i");
 
        Object.keys(config).forEach(key => {
            config[key].forEach(element => {
                let output = element.ip_no.match(regex) || [];
                if (output.length > 0)
                    array.push({ project: key, element })
            })
        }); 
        Object.keys(config).forEach(key => {
            config[key].forEach(element => {
                element.configs.forEach(item => {
                    let output = item.appName.match(regex) || []
                    if (output.length > 0) {
                        array.push({ project: key, element })
                    }
                })
            })
        });
    
    res.send(array)
}

let selfPost = (req, res, next) => {
    let url = req.body.url
    let body = req.body.body
    console.log(req.body)
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: url,
        body: body
    }, function (error, response, body) {
        res.send({ body })
    });
}


module.exports.indexAction = indexAction;
module.exports.configList = configList;
module.exports.configPost = configPost;
module.exports.logPost = logPost;
module.exports.logReload = logReload;
module.exports.configReload = configReload;
module.exports.version = version;
module.exports.versionPost = versionPost
module.exports.checkStatus = checkStatus;
module.exports.search = search;
module.exports.newProjectPost = newProjectPost;
module.exports.addConfigs = addConfigs;
module.exports.addMachine = addMachine;
module.exports.deleteProject = deleteProject;
module.exports.deleteIp = deleteIp;
module.exports.selfPost = selfPost;