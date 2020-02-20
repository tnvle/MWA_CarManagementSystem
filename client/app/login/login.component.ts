import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(public auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/']);
    // }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  // setClassEmail() {
  //   return { 'has-danger': !this.email.pristine && !this.email.valid };
  // }

  // setClassPassword() {
  //   return { 'has-danger': !this.password.pristine && !this.password.valid };
  // }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/']),
      error => {
        console.log('invalid email or password!')
        const formControl = this.loginForm.get('email');
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: 'Invalid email or password!'
          });
        }
      }//this.toast.setMessage('invalid email or password!', 'danger')
    )
  }

}
