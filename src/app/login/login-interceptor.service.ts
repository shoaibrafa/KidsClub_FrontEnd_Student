import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService {

  constructor(private loginService: LoginService, private router: Router){}
  token = '';


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(req.url.endsWith('/login') || req.url.endsWith('/kc/student/register')){
          return next.handle(req)
      }
      const data = localStorage.getItem("data");
      if(data !== null){
          const user: User = JSON.parse(data)
          if(new Date(user._expiration_date) > new Date){
              this.token = 'Bearer ' + user._token
              req = req.clone({ setHeaders: { Authorization: this.token, category: "STUDENT" }});
          }else {
              this.router.navigateByUrl('')
              window.localStorage.clear()
          }
      } else {
          this.router.navigateByUrl('')
      }
      return next.handle(req);        
  }
}
