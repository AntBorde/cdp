import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFieldComponent } from './login-field/login-field.component';
import { AppRoutingModule } from './/app-routing.module';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFieldComponent,
    AccountCreationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Title
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
