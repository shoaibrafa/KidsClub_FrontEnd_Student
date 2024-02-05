import { Component, OnInit } from '@angular/core';
import { RootService } from '../root.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(public rootService: RootService){}

  // ngOnInit(): void {
  //   console.log()
  //   this.school_name = this.rootService.current_school;
  // }
}
