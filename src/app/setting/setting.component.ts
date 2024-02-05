import { Component, OnInit } from '@angular/core';
import { RootService } from '../root.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  name: string = '';
  lastname: string = '';

  constructor(public service: RootService){}

 
  img_edit(){

  }
  



}

