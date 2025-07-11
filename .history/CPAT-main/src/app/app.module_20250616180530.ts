import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContributorComponent } from './contributor/contributor.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DetailComponent } from './detail/detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ApproverComponent } from './approver/approver.component';
import { DetailapproverComponent } from './detailapprover/detailapprover.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ContributorComponent,
    UploadComponent,
    ReviewerComponent,
    TimelineComponent,
    DetailComponent,
    HomepageComponent,
    ApproverComponent,
    DetailapproverComponent,
    LoginComponent,
    AdminComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
