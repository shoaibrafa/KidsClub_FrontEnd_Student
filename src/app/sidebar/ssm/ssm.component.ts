import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ssm',
  templateUrl: './ssm.component.html',
  styleUrls: ['./ssm.component.css']
})
export class SsmComponent {

  constructor(private router: Router){}
  load_art(){
    this.router.navigate(['main/arts'])
  }

  load_dashboard(){
    this.router.navigate(['main/dashboard'])

  }

  load_articles(){
    this.router.navigate(['main/articles'])
  }

  load_photography(){
    this.router.navigate(['main/photography'])
  }

  load_gallery(){

  }
}
