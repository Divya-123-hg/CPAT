import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributorComponent } from './contributor/contributor.component';
import { UploadComponent } from './upload/upload.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DetailComponent } from './detail/detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ApproverComponent } from './approver/approver.component';
import { DetailapproverComponent } from './detailapprover/detailapprover.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  // {path: 'contributor',component:ContributorComponent},
  {path: 'contributor/:username',component:ContributorComponent},
  {path: 'upload', component: UploadComponent},
  // {path:'reviewer',component: ReviewerComponent},
  {path:'reviewer/:username',component: ReviewerComponent},
  {path:'timeline/:id',component: TimelineComponent},
  {path:'detail/:id',component: DetailComponent},
  {path:'homepage',component: HomepageComponent},
  // {path:'approver',component: ApproverComponent},
  {path:'approver/:username',component: ApproverComponent},
  {path:'detailapprover/:id',component: DetailapproverComponent},
  {path:'login',component: LoginComponent},
  {path:'path/:username',component: DetailComponent}, 
  {path:'admin',component: AdminComponent},   
  {path:'a,',component: AdminComponent}, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
