import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private service: LoginService){}

  loginData = {
    email: '',
    password: ''
  }

  login_error = false;


  onLogin(): void {
    this.login_error = false;
    this.service.login(this.loginData).subscribe({
      next: (response: any) => {
        const res: LoginResponseData = response.body;
        const user = new User(res.email, res.token, res.expiration_date);
        this.service.user.next(user);
        window.localStorage.setItem('data', JSON.stringify(user));
        this.router.navigate(['/main'])
      }, error: (error: HttpErrorResponse) => {
        console.log(error)
        this.login_error = true;
      }})
  }
}


interface LoginResponseData {
  token: string;
  email: string;
  expiration_date: Date;
}