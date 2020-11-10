import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { AddConfigsComponent } from './components/add-configs/add-configs.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelfPostComponent } from './components/self-post/self-post.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:value',component:SearchComponent},
  {path:'new-project',component:NewProjectComponent},
  {path:'add-configs',component:AddConfigsComponent},
  {path:'add-machine',component:AddMachineComponent},
  {path:'refresh',component:RefreshComponent},
  {path:'foot',component:FooterComponent},
  {path:'self-post',component:SelfPostComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
