import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RootService } from '../root.service';
import { StudentDTO } from '../sidebar/user-photo/studentDTO';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{


  constructor (private http: HttpClient, private rootService: RootService){}

  ngOnInit(): void {
    this.http.get<StudentDTO>(this.rootService.host + '/student/studentbio',{ observe: 'response' }).subscribe({
      next: (response: any)=> {
        this.rootService.name = response.body.name;
        this.rootService.lastname = response.body.lastname;
        this.rootService.current_school = response.body.currentSchool;
        this.rootService.current_grade = response.body.currentGrade;

      }, error: (error: HttpErrorResponse)=>{
        console.log(error);

      }})    
  }
}
