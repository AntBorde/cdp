import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const password2 = new FormControl(null, CustomValidators.equalTo(password));

    this.signupForm = fb.group({
      email : [null, [Validators.required, CustomValidators.email]],
      lastName : [null, Validators.required],
      firstName : [null,  Validators.required],
      password: password,
      password2: password2,
    });
  }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

}
