import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { NewArtComponent } from '../components/art/new-art/new-art.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public sharedservice: SharedService, private route: ActivatedRoute, private router: Router,private modalService: NgbModal){}

  create_article(){
    this.router.navigate(['articles/create_article'], {relativeTo: this.route})
  }


  new_art() {
    const modalRef = this.modalService.open(NewArtComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
