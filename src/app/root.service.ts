import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  host: string = 'http://10.0.0.128:8081/kc';
  // host: string ='http://99.79.38.223:8081/kc'
  email: string = '';
  security_key: string = '';

  name: string = '';
  lastname: string = '';
  birth_date: string= '';
  current_school: string = '';
  current_grade: string = '';
  phone: string = '';
  address: string = '';


  // school_id!: number;

  constructor() { }
}
