import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  name = ""   
 
  onActivate(componentReference) {
   if(componentReference.isResetNavbar)
    this.name +='a'
    if(componentReference.contentReload)//  specify to home component
    {
      componentReference.resetContent()
    }
 } 
}
