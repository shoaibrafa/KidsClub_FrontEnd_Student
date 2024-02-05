import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../root.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {


  constructor(private route: ActivatedRoute, private http: HttpClient, private service: RootService, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const security_key = params['key'];
      const email = params['email'];
      const data = {security_key, email}
      this.check_key(data);
    });
  }

  check_key(data: object) {
    this.http.post<checkresponse>(this.service.host + '/student/check', data, {observe: 'response'}).subscribe({
      next: (response: any) =>{
        const response_body = response.body;
        if(response_body){
          this.service.email = response_body.email;
          this.service.security_key = response_body.security_key;
          this.router.navigate(['/register']);
        }else{
          this.router.navigate(['/error']);
        }
      }, 
      error: (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      }
    })
  }
}

interface checkresponse {
  email: string;
  security_key: string;
}