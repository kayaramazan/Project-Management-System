import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { SearchComponent } from './components/search/search.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import { AddConfigsComponent } from './components/add-configs/add-configs.component'; 
import { FormsModule } from '@angular/forms';
import { RefreshComponent } from './components/refresh/refresh.component';
import { SelfPostComponent } from './components/self-post/self-post.component' 
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent, 
    NavbarComponent, SearchComponent, NewProjectComponent, AddMachineComponent, AddConfigsComponent, RefreshComponent, SelfPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JsonpModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
