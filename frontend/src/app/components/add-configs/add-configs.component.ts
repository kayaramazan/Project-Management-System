import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-configs',
  templateUrl: './add-configs.component.html',
  styleUrls: ['./add-configs.component.css']
})
export class AddConfigsComponent implements OnInit {
  isResetNavbar = true; // Reload navbar
  project:any[]=[]
  projectIp:any[]=[]
  config
  constructor(private api:ApiService) { 
    api.config().subscribe(result =>{
      this.config = result
      Object.keys(result).forEach(key => { 
        this.project.push(key) 
      }) 
    })
 
  }

  ngOnInit(): void {
  }
  getIp(value){ 
    this.projectIp = this.config[value]
  }
  onSubmit(value)
  {
    let ip = value.ip
    let projectName = value.projectName
    delete value.ip
    delete value.projectName
    let result = {ip,projectName,configs:value}
    console.log(result)
    this.api.addConfigs(result).subscribe((result:any)=>
      {
        if(result.success)
        {
          alert('Kayit Basarili')
          window.location.href = '/'
        }
        else
        {
          alert('Kayit Eklenemedi!!')
        }
      console.log(result)
      }
      )
  }
}
 