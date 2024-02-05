import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RootService } from '../root.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  studentRegData = {
    email: '',
    password: '',
    security_key: ''
  }

  confirm_password: string = '';

  form_not_filled: boolean = true;
  registration_result: string = ''
  register_successful = false;
  register_error = false;

  constructor(private router: Router, private http: HttpClient, private rootService: RootService){}

  ngOnInit(): void {
    this.studentRegData.email = this.rootService.email;
    this.studentRegData.security_key = this.rootService.security_key;
    console.log(this.studentRegData.security_key);
  }


  onRegister() {

    if(this.studentRegData.password == '' || this.studentRegData.email == '' || this.studentRegData.security_key == ''){
      this.form_not_filled = false;
      return
    }else if (this.confirm_password != this.studentRegData.password){
      return
    }else{
        this.http.post(this.rootService.host + '/student/register', this.studentRegData, { observe: 'response' }).subscribe({
          next: (response: any) => {
            this.registration_result = 'Registration successful!';
            this.register_successful = true;
            this.register_error = false;
            
          },
          error: (error: HttpErrorResponse) => {
            this.registration_result = 'Internal Error! Try again later';
            this.register_successful = false;
            this.register_error = true;
          }
        });
    }
  }

}

interface checkresponse {
  id: number;
  name: string;
  email: string;
  security_key: string;
}