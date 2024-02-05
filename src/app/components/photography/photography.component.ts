import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {

  constructor(private sharedService: SharedService){}
  ngOnInit(): void {
    this.sharedService.component_name = 'Photography'
  }

}
