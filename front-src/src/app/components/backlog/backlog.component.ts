import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {Issue} from '../../models/issue';
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})

export class BacklogComponent implements OnInit {
  projectName:string;
  ProductOwner: string;
  Backlog:Issue[]=null;
  ProjectTeam:any=[];
  private modalRef: NgbModalRef;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }
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
    .subscribe( data => { this.Backlog=data;
     });
     this.http.get<ProjectMembersResponse>('http://localhost:3000/api/projects/'+this.projectId+'/team')
     .subscribe( data => { 
      this.ProjectTeam.push(data[0].productOwner);
      data[0].contributor.forEach(contributor => {
       this.ProjectTeam.push(contributor);
      });
      });
  }
  NavigateAddIssue(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/CreateIssue']);
  }
  NavigateUpdateIssue(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/UpdateIssue']);
  }
  NavigateSprints(){
    this.router.navigate(['project/'+this.projectId+'/Backlog/SprintList']);
  }
  open(content) {
    this.modalRef = this.modalService.open(content);
  }
}

interface ProductOwnerResponse
{
projectName:string;
productOwner:string;
}

interface ProjectMembersResponse
{
   project_id:number,
   productOwner:object, 
   contributor:any 
}
