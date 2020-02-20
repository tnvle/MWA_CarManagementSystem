import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Before TokenInterceptor " + JSON.stringify(request))
    request = request.clone(
        {setHeaders: {TokenAuthorization: `${this.auth.getToken()}`}}
        // {headers: request.headers.set('TokenAuthorization', `${this.auth.getToken()}`)}
    );
    // console.log("After TokenInterceptor " + JSON.stringify(request))
    return next.handle(request);
  }
}
