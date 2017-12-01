import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from "./auth.service";
import { MessageService } from "./message.service";
import { ProjectService } from "./project.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUserComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    ProjectsComponent
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
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
