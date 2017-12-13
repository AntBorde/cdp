import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/authentification.guard';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectsListComponent } from './components/project/projects-list/projects-list.component';
import { ProjectListUserComponent } from "./components/project/project-list-user/project-list-user.component";
import { BacklogComponent } from './components/backlog/backlog.component';
import { CreateIssueComponent } from './components/backlog/create-issue/create-issue.component';
import { UpdateIssueComponent } from './components/backlog/update-issue/update-issue.component';
import { SprintListComponent } from './components/backlog/sprint-list/sprint-list.component';
import { SprintCreateComponent } from './components/backlog/sprint-create/sprint-create.component';
import { SprintUpdateComponent } from './components/backlog/sprint-update/sprint-update.component';
import { TaskListComponent } from './components/backlog/task-list/task-list.component';
import { TaskCreateComponent } from './components/backlog/task-create/task-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'projects', component: ProjectsListComponent, canActivate:[AuthGuard]},
  { path: 'addproject', component: ProjectCreateComponent, canActivate:[AuthGuard]},
  { path: 'myprojects', component: ProjectListUserComponent, canActivate:[AuthGuard]}
  { path: 'project/:idProject/Backlog', component: BacklogComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/CreateIssue', component: CreateIssueComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/UpdateIssue', component: UpdateIssueComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/SprintList', component: SprintListComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/CreateSprint', component: SprintCreateComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/UpdateSprint', component: SprintUpdateComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/Sprint/:idSprint/Tasks', component: TaskListComponent,canActivate:[AuthGuard]},
  { path: 'project/:idProject/Backlog/Sprint/:idSprint/CreateTask', component: TaskCreateComponent,canActivate:[AuthGuard]}
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

