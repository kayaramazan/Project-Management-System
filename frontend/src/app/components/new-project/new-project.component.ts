import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
   
  constructor(private api:ApiService,private router:Router) { 
    
  }

  ngOnInit(): void {
  }
  onSubmit(value)
  {
    this.api.createNewProject(value.projectName).subscribe((result:any) =>{
      if(result.success)
      {
        console.log(result)
        this.router.navigate(['/add-machine'])

      }
      else
      alert('Eklenemedi!! Ayni isim kullanilmis olabilir.')
    })
  }
}
