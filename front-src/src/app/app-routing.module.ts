import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { AuthGuard } from './guard/authentification.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  { path: 'Updateprofile', component: UpdateProfileComponent,canActivate:[AuthGuard]},
  { path: 'projects', component: ProjectsListComponent,canActivate:[AuthGuard]},
  { path: 'Addproject', component: ProjectCreateComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
