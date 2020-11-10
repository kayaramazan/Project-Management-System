import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
   
   }
  
  
  getService(){ 
    return this.http.get('/api/servers/')
  }
   getConfig(appName,ip){
    let projectName = localStorage.getItem('projectName')
    return this.http.get(`/api/servers/config/${projectName}/${appName}/${ip}`)
  }
   getLogConfig(appName,ip){
    let projectName = localStorage.getItem('projectName')
    return this.http.get(`/api/servers/logConfig/${projectName}/${appName}/${ip}`)
  }
   getLogServer(appName,ip){
    let projectName = localStorage.getItem('projectName')
    return this.http.get(`/api/servers/logServer/${projectName}/${appName}/${ip}`)
  }
   getVersion(projectName,appName,ip){ 
    return this.http.get(`/api/servers/version/${projectName}/${appName}/${ip}`)
  }

  postConfig(appName,ip,body)
  { 
    let projectName = localStorage.getItem('projectName')
    return this.http.post('/api/servers/configPost',{projectName,appName,ip,body}) 
  }
  postVersion(appName,ip,body)
  { 
    let projectName = localStorage.getItem('projectName') 
    console.log(projectName,appName,ip,body)
    return this.http.post('/api/servers/versionPost',{projectName,appName,ip,body}) 
  }
  postLogConfig(appName,ip,body)
  { 
    let projectName = localStorage.getItem('projectName')
    return this.http.post('/api/servers/configLogPost',{projectName,appName,ip,body}) 
  }

  // reload
  logReload(appName,ip)
  {
    let projectName = localStorage.getItem('projectName')
    return this.http.post('/api/servers/logReload',{projectName,appName,ip})  
  }
  configReload(appName,ip)
  {
    let projectName = localStorage.getItem('projectName')
    return this.http.post('/api/servers/configReload',{projectName,appName,ip})  
  }


  search(value)
  {
    return this.http.get(`/api/servers/search/${value}`) 
  }
  config()
  { 
    return this.http.get(`/api/servers/config`)
  }

  createNewProject(projectName)
  {
    return this.http.post('/api/servers/newProjectPost',{projectName})
  }
  addMachine(value)
  {
    return this.http.post('/api/servers/addMachine',value)
  }
  addConfigs(value)
  {
    return this.http.post('/api/servers/addConfigs',value)
  }


  deleteProject(projectName)
  { 
    return this.http.post('/api/servers/deleteProject',{projectName})
  }
  deleteip(ip,appName,projectName)
  { 
    return this.http.post('/api/servers/deleteIp',{ip,appName,projectName})
  }

  selfPost(url,body)
  {
    return this.http.post('/api/servers/selfPost',{url,body})
  }
  getFile(url){
    return this.http.post('/api/servers/getFile',{url})

  }

}
