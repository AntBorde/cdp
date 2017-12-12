import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgSelectOption } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import {Issue} from '../../../models/issue';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent implements OnInit {
  Backlog:Issue[]=null;
  story:string;
  priority:number;
  difficulty:number;
  stateOption;
  projectId=this.activatedRoute.snapshot.paramMap.get('idProject');
  UpdateIssueForm: FormGroup;
  message = '';
  isError = false;
  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router ,
    private auth: AuthService,) {
      this.UpdateIssueForm = fb.group({
        issue_id : [,[]],
        story : [, [Validators.required]],
        priority:[,[]],
        difficulty:[,[]],
        state:[,[]],
      });
    }

  ngOnInit() {
    this.
    http.
    get<Issue[]>('http://localhost:3000/api/projects/'+this.projectId+'/issues')
    .subscribe( data => { 
      if(data.length==0)
      this.Backlog=null;
      else
      this.Backlog=data;
     });
  }
  onChange($event) {
    this.Backlog.forEach(issue => {
    if(issue.issue_id==this.UpdateIssueForm.value.issue_id)
    {
      this.story=issue.story;
      this.priority=issue.priority;
      this.difficulty=issue.difficulty;
      this.stateOption=issue.state;
  
    }});
}

UpdateIssue(){
  this.http
  .put<UpdateIssueResponse>('http://localhost:3000/api/projects/'+this.projectId+'/issues/'+this.UpdateIssueForm.value.issue_id,this.UpdateIssueForm.value,{
  headers: new HttpHeaders().set('Authorization', this.auth.getToken())})
  .subscribe(
    data => {
      this.showSuccess(data.message);
      setTimeout(() => this.router.navigate(['project/'+this.projectId+'/Backlog']), 1000);
     this.UpdateIssueForm.reset();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.showError(err.error.message);
      } else {
        this.showError( err.error);
      }
    }
  );

}
private showError(message: string): void {
  this.message = message;
  this.isError = true;
}

private showSuccess(message: string): void {
  this.message = message;
  this.isError = false;
}
}
interface UpdateIssueResponse
{
message:string;
}
