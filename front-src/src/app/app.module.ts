import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from "./services/auth.service";
import { MessageService } from "./services/message.service";
import { ProjectService } from "./services/project.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { ProjectParticipateComponent } from './components/project/project-participate/project-participate.component';
import { BacklogComponent } from './components/backlog/backlog.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUserComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    ProfileComponent,
    ProjectCreateComponent,
    UpdateProfileComponent,
    ProjectsListComponent,
    ProjectParticipateComponent,
    BacklogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    Title,
    AuthService,
    MessageService,
    ProjectService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
