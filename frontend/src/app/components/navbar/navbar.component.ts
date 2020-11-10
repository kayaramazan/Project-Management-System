import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Input() isReset:any 
  result: any[] = []
  constructor(private api: ApiService, private router: Router) {
    this.resetMenu()  
  }
  resetMenu()
  {
    this.result = []
    this.api.getService().subscribe((result: any[]) => {
      this.result = result
    }).add(() => {
      for (let i = 0; i < this.result.length; i++) {
        this.result[i]['id'] = Math.floor(Math.random() * 100000);;
        for (let j = 0; j < this.result[i].list.length; j++) {
          this.result[i].list[j]['id'] = (i + 1) + Math.floor(Math.random() * 100000);

        }
      }
    }).add(() => {  
    })
  }
  
  ngOnChanges(c:SimpleChanges)
  { 
    this.resetMenu()
  }

  getCurl(projectName, ip, appName, gitLink) {
    console.log(projectName, ip, appName, gitLink)
    this.api.getVersion(projectName, appName, ip).subscribe((item: any) => {
      localStorage.setItem('version', item.response)
      localStorage.setItem('ip', ip)
      localStorage.setItem('gitLink', gitLink)
      localStorage.setItem('projectName', projectName)
      localStorage.setItem('appName', appName) 
      this.router.navigate(['/aa'])
    })
  }

  onSubmit(value) {
    console.log(value)
    if (value.value != '')
      window.location.href = `search/${value.value}`
    else
      alert('Lutfen butun alanlari doldurunuz')
  }
  goHomePage() {
    localStorage.clear();
    window.location.href = '/home';
  }
  ngOnInit(): void {
  }

}
