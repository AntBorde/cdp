import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import {Sprint} from '../../../models/sprint';
import {ProjectService} from "../../../services/project.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  projectName:string;
  ProductOwner: string;
  Sprints:Sprint[]=null
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
   projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  ngOnInit() {
    this.http
    .get<ProductOwnerResponse>('http://localhost:3000/api/projects/'+this.projectId+'/productOwner')
    .subscribe(
      data => {
      this.projectName=data.projectName;
      this.ProductOwner=data.productOwner;
      }
    );
    this.
    http.
    get<Sprint[]>('http://localhost:3000/api/projects/'+this.projectId+'/sprints')
    .subscribe( data => { this.Sprints=data;
     });
  }
  NavigateAddSprint(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/CreateSprint']);
  }
}

interface ProductOwnerResponse
{
projectName:string;
productOwner:string;
}




