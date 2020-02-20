import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  isLoading = true;

  public errorEmailDuplicate = false;
  accountForm: FormGroup;
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
    return this.accountForm.controls['password'].hasError('required') ? 'Password is required' :
        this.accountForm.controls['password'].hasError('minlength') ? 'Required length is at least 6 characters' :
           '';
  }
  constructor(private formBuilder: FormBuilder,private router: Router,private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    
    this.accountForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      verifyPassword: this.verifyPassword
    }, {
      validator: this.confirmPasswordValidator('password', 'verifyPassword')
    }
    );
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.error(error),
      () => this.isLoading = false
    )
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
  save(user: User){
    this.userService.editUser(user).subscribe(
      res => {console.log('account settings saved!')
      this.router.navigate(['/'])},//this.toast.setMessage('account settings saved!', 'success'),
      error => {
        //console.log(error)
        const formControl = this.accountForm.get('email');
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: 'Email already exists!'
          });
        }
      });
  }
}
