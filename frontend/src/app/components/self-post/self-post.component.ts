import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';
import { Jsonp } from '@angular/http';
declare var $: any;


 
@Component({
  selector: 'app-self-post',
  templateUrl: './self-post.component.html',
  styleUrls: ['./self-post.component.css']
})
export class SelfPostComponent implements OnInit { 
 result ="" 
  constructor(private api:ApiService,private http:HttpClient,private jsonp: Jsonp) { }

  ngOnInit(): void {
  }
  onSubmit(body,url)
  {
    if(body && url) {
      this.http.post<any>(url,JSON.parse(body)).subscribe(data => {
        this.result = JSON.stringify(data)
    })
      
    }
      else
      alert('Hatali icerik veya url')
  } 
 
  search(url) { 

     this.api.getFile(url).subscribe((result:any)=>
     {
       this.result = result.response
     })
      }

  getFile(url){ 
    this.http.get(`${url}`,{responseType:'blob'}
     ).subscribe(response => this.downLoadFile(response, 'text/json; charset=utf-8'));

  }
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}
  
   
}
