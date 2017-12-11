import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {Issue} from '../../models/issue';
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})

export class BacklogComponent implements OnInit {
  projectName:string;
  ProductOwner: string;
  Backlog:Issue[]=null
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }
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
    get<Issue[]>('http://localhost:3000/api/projects/'+this.projectId+'/issues')
    .subscribe( data => { this.Backlog=data; console.log(this.Backlog);
     });

  }
}

interface ProductOwnerResponse
{
projectName:string;
productOwner:string;
}
