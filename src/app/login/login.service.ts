import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { RootService } from '../root.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = new BehaviorSubject<User | null>(null);


  constructor(private http: HttpClient, private service: RootService ) { }

  login(credentials: any): Observable<HttpResponse<LoginResponseData>> {
    return this.http.post<LoginResponseData>(this.service.host + '/student/login', credentials, {observe: 'response'})
  }
}

export interface LoginResponseData{
  school_id: number;
  token: string;
  email: string;
  refresh_token: string;
  expiration_date: Date;

}
