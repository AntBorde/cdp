import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder){
    let password = new FormControl('', Validators.required);
    let password2 = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = fb.group({
      email : [null, Validators.required, Validators.compose([Validators.required, Validators.maxLength(255)])],
      lastName : [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      firstName : [null,  Validators.compose([Validators.required, Validators.maxLength(50)])],
      password: password,
      password2: password2,
    })
  }

  ngOnInit() {
  }

  submitForm(value: any){
    console.log(value);
  }

}
