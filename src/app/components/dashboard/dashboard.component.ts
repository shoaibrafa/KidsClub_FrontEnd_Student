import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { DashboardService } from './dashboard.service';
import { Post } from './post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = []

  constructor(public shareService: SharedService, private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.shareService.component_name = 'Dashboard';
    this.getContent()
  }
  
  getContent(){
    this.dashboardService.getAllContent().subscribe({
      next: (response) =>{
        response.forEach(post => {
          this.posts.push(post)
        })
        this.posts.forEach(post => {
          this.dashboardService.loadImageForDashboardContent(post.post_id, post.category).subscribe(image => {
            post.post_image = image;
          })

        })
      }, error: () => {

      }})
  }


}
