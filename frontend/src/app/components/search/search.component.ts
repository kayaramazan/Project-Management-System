import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filter = ""
  value = ""
  result = []
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private router:Router) {  
    this.filter = this.activatedRoute.snapshot.params['filter']
    this.value = this.activatedRoute.snapshot.params['value']
    this.searchAll()
  }

  ngOnInit(): void {
  }
  searchAll(){
     this.api.search(this.value).subscribe((result:[]) => {
      this.result = result
      console.log(result)
      
     })
    
  }
  getCurl(projectName,ip,appName,gitLink)
   { 
     console.log(projectName,ip,appName,gitLink)
     this.api.getVersion(projectName,appName,ip).subscribe((item:any)=>{ 
       localStorage.setItem('version',item.response)
       localStorage.setItem('ip',ip)
       localStorage.setItem('gitLink',gitLink) 
       localStorage.setItem('projectName',projectName)
       localStorage.setItem('appName',appName) 
       this.router.navigate(['/']) 
     })
   }
  
}
