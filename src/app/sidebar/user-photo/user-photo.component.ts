import { Component } from '@angular/core';
import { RootService } from 'src/app/root.service';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent {

  constructor(public rootService: RootService){}

}
