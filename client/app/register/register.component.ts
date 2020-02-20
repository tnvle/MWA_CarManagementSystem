import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
// import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/** Error when the parent is invalid */
// class CrossFieldErrorMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     return control.dirty && form.invalid;
//   }
// }
export class RegisterComponent implements OnInit {
  public errorEmailDuplicate = false;
  // errorMatcher = new CrossFieldErrorMatcher();
  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  verifyPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  getPasswordErrorMessage() {
    return this.registerForm.controls['password'].hasError('required') ? 'Password is required' :
        this.registerForm.controls['password'].hasError('minlength') ? 'Required length is at least 6 characters' :
           '';
  }
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      verifyPassword: this.verifyPassword
    }
    , {
      validator: this.confirmPasswordValidator('password', 'verifyPassword')
    }
    );
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  //(form: FormGroup): { [s: string]: boolean } {
  //   const condition = form.get('password').value !== form.get('verifyPassword').value;

  //   return condition ? { passwordsDoNotMatch: true} : null;
  // }
  // setClassUsername() {
  //   return { 'has-danger': !this.username.pristine && !this.username.valid };
  // }

  // setClassEmail() {
  //   return { 'has-danger': !this.email.pristine && !this.email.valid };
  // }

  // setClassPassword() {
  //   return { 'has-danger': !this.password.pristine && !this.password.valid };
  // }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        //this.toast.setMessage('you successfully registered!', 'success');
        console.log('you successfully registered!');
        this.router.navigate(['/login']);
      },
      error => {
        const formControl = this.registerForm.get('email');
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: 'Email already exists!'
          });
        }
        // this.errorEmailDuplicate = true;
        // console.log('email already exists');
      }//console.log('email already exists') //this.toast.setMessage('email already exists', 'danger')
    );
  }

}
