import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { User } from '../shared/models/user.model';

// import 'rxjs/Rx';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  currentUser: User = new User();

  constructor(private userService: UserService,
              private carService: CarService,
              private router: Router,
              private jwtHelper: JwtHelperService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).pipe(map(
        (res: any) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.carService.getFavoriteCars(decodedUser._id).subscribe(
          data => {
            localStorage.setItem('counterFav', data.length > 0 ? data.length.toString() : '0');
          },
          error => console.dir(error),
          () => {console.log('loggedin loaded counter for favorite cars.'); console.log(localStorage.getItem('counterFav'))}
        );
        return this.loggedIn;
      }
    ));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('counterFav');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    this.currentUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    //delete decodedUser.role;
  }

}
