import { Component, OnInit, ViewChild, ElementRef, ViewChildren, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isEdit = false
    contentReload = true // content reload every fram
    gitLink = ""
    versionUrl: string
    configUrl: string
    configLogUrl: string
    serverLogUrl: string
    ip = ""
    appName = ""
    projectName = ""
    selectedSection = ""
    versionDiv = ""
    selectedPanel = "version"
    logUrl = ""
    playerName: string;
    projects = []
    machines: any = []
    @ViewChild('configDiv') configDiv: ElementRef<any>;
    @ViewChild('logConfigDiv') logConfigDiv: ElementRef<any>;
    @ViewChild('logServerDiv') logServerDiv: ElementRef<any>; 

    constructor(private api: ApiService, private router: Router) {

        api.getService().subscribe((result: any) => {
            this.projects = result
        })
        this.ip = localStorage.getItem('ip') || ""
        this.appName = localStorage.getItem('appName') || ""
        this.gitLink = localStorage.getItem('gitLink') || ""
        this.projectName = localStorage.getItem('projectName') || ""
        if (this.ip || this.appName || this.projectName)
            this.getVersion()
    }

    resetContent()
    {   
      this.router.navigate(['/']) 
    }

    edit() {
        console.log(this.isEdit)
        this.isEdit = true
        console.log(this.isEdit)

    }
    reload() {
        console.log(this.selectedPanel + "calisti")
        if (this.selectedPanel == "version") {
            this.versionDiv = ""
            this.getVersion()
        }
        else if (this.selectedPanel == "logServer") {
            this.logServerDiv.nativeElement.innerHTML = ""
            this.getLogServer()
        }
        else if (this.selectedPanel == "logConfig") {
            this.api.logReload(this.appName, this.ip).subscribe((result: any) => {
                if (result.success)
                    alert("Reload Basarili")
                else
                    alert("Reload sirasinda bir hata olustu")
            })
        }
        else if (this.selectedPanel == "config") {
            this.api.configReload(this.appName, this.ip).subscribe((result: any) => {
                if (result.success)
                    alert("Reload Basarili")
                else
                    alert("Reload sirasinda bir hata olustu")
            })
        }
    }
    async getVersion() {
        if (!this.versionDiv.length) {
            await this.api.getVersion(this.projectName, this.appName, this.ip).subscribe((result: any) => {
                if (result.response) {
                    console.log(result)
                    this.versionDiv = result.response
                    this.selectedSection = result.response
                    this.versionUrl = result.url
                    this.logUrl = this.versionUrl
                }
            })

        }
        this.logUrl = this.versionUrl
        this.selectedPanel = "version"
        this.isEdit = false
        this.selectedSection = this.versionDiv
    }


    async getLogServer() {
        if (!this.logServerDiv.nativeElement.innerHTML.length) {
            await this.api.getLogServer(this.appName, this.ip).subscribe(
                (result: any) => {
                    if (result.response) {
                        this.selectedSection = result.response
                        let response = result.response.replaceAll(`<a href='`, `<a href='http://${this.ip}`)
                        this.serverLogUrl = result.url
                        this.logUrl = this.serverLogUrl
                        this.logServerDiv.nativeElement.innerHTML = response
                    }
                })
        }
        this.logUrl = this.serverLogUrl
        this.selectedPanel = "logServer"
        this.isEdit = false
        this.selectedSection = this.logServerDiv.nativeElement.innerHTML

    }

    async getLogConfig() {

        if (!this.logConfigDiv.nativeElement.innerHTML.length) {
            await this.api.getLogConfig(this.appName, this.ip).subscribe((result: any) => {
                if (result.response) {
                    this.selectedSection = result.response
                    let response = result.response
                    this.configLogUrl = result.url
                    this.logUrl = this.configLogUrl
                    this.logConfigDiv.nativeElement.innerHTML = response
                }
            })
        }
        this.logUrl = this.configLogUrl
        this.selectedPanel = "logConfig"
        this.isEdit = false
        this.selectedSection = this.logConfigDiv.nativeElement.innerHTML

    }
    async getConfig() {
        if (!this.configDiv.nativeElement.innerHTML.length) {
            await this.api.getConfig(this.appName, this.ip).subscribe((result: any) => {
                if (result.response) {
                    this.selectedSection = result.response
                    let response = result.response
                    this.configUrl = result.url
                    this.logUrl = this.configUrl
                    this.configDiv.nativeElement.innerHTML = response

                }
            })
        }
        this.logUrl = this.configUrl
        this.selectedPanel = "config"
        this.isEdit = false
        this.selectedSection = this.configDiv.nativeElement.innerHTML

    }
    getCurl(ip, appName, gitLink) {
        this.api.getVersion(this.projectName, appName, ip).subscribe((item: any) => {
            localStorage.setItem('version', item.response)
            localStorage.setItem('ip', ip)
            localStorage.setItem('gitLink', gitLink)

            localStorage.setItem('appName', appName)
            window.location.reload()
        })
    }

    update(value) {

        console.log(this.selectedPanel, '--', this.appName, '---', this.ip, '----', value)
        if (this.selectedPanel == 'version') {
            this.api.postVersion(this.appName, this.ip, value).subscribe((result: any) => {
                if (result.success == false) {
                    alert('Islem basarisiz')
                }
                else {
                    console.log(result)
                    this.versionDiv = value
                    this.isEdit = false
                    this.selectedSection = value
                }
            })
        }
        else if (this.selectedPanel == 'config') {
            this.api.postConfig(this.appName, this.ip, value).subscribe((result: any) => {
                if (result.success == false) {
                    alert('Islem basarisiz')
                }
                else {
                    console.log(result)
                    this.configDiv.nativeElement.innerHTML = value
                    this.isEdit = false
                    this.selectedSection = value
                }

            })
        }
        else if (this.selectedPanel == 'logConfig') {
            this.api.postLogConfig(this.api, this.ip, value).subscribe((result: any) => {
                if (result.success == false) {
                    alert('Islem basarisiz')
                }
                else {
                    console.log(result)
                    this.logConfigDiv.nativeElement.innerHTML = value
                    this.isEdit = false
                    this.selectedSection = value
                }

            })
        }
    }
    deleteProject(projectName) {
        if (confirm(`Bu projeyi silmek istediginizden emin misiniz?`)) {
            this.api.deleteProject(projectName).subscribe((result: any) => {
                if (result.success) {
                    alert(`Proje silindi`)
                    window.location.href = '/home'
                }
            })
        }
    }
    editProject(projectName) {
        console.log(this.projects.filter(e => e.projectName == projectName)[0])
        this.machines = this.projects.filter(e => e.projectName == projectName)[0]

    }

    deleteIp(projectIp, appName, projectName) {
        if (confirm(`Bu projeyi silmek istediginizden emin misiniz?`)) {
            this.api.deleteip(projectIp, appName, projectName).subscribe((result: any) => {
                if (result.success) {
                    alert(`Silme islemi basarili`);
                    window.location.href = '/home';
                }
            })
        }
    }
    //    editIp(ip,appName)
    //    {
    //         console.log(this.machines.list.filter(e=>e.ip == ip)[0].name.filter(e=>e.name == appName));
    //    }
    ngOnInit(): void {
    }

}
