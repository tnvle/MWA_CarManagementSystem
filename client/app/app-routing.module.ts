import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CarsComponent } from './cars/cars.component';
import { AccountComponent } from './account/account.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { HomeComponent } from './home/home.component';

import { UsercarsComponent } from './usercars/usercars.component';
import { FavoritecarsComponent } from './favoritecars/favoritecars.component';

import { AdminGuard } from './services/adminGuard.service';




const routes: Routes = [
 
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'cars/admin', component: CarsComponent, canActivate: [AdminGuard]},  
  { path: 'favorite', component: FavoritecarsComponent },
  { path: 'cardetails/:cid', component: UsercarsComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
