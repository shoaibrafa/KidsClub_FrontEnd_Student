import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{

  constructor(private sharedService: SharedService){}

  ngOnInit(): void {
    this.sharedService.component_name = 'Articles'
  }

}
