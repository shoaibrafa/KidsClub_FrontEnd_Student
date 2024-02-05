import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RootService } from 'src/app/root.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { ArtDto } from '../art-dto';
import { ArtService } from '../art.service';



@Component({
  selector: 'app-new-art',
  templateUrl: './new-art.component.html',
  styleUrls: ['./new-art.component.css']
})
export class NewArtComponent {

  formData: { title: string, description: string, file: File | null, visibility: string} = { title: '', description: '', file: null, visibility: ''}

  loading: boolean = false;
  show_save_btn: boolean = true;
  show_close_btn: boolean = true;

  constructor(
    private modalService: NgbModal,
    private rootService: RootService, 
    private http: HttpClient, 
    private sharedService: SharedService,
    private artService: ArtService){}

  onFileChange(event: any) {
    this.formData.file = event.target.files[0];
  }

save(){
  this.loading = true;
  this.show_save_btn = false;
  this.show_close_btn = false;
  const form = new FormData();
  form.append('title', this.formData.title);

  form.append('description', this.formData.description);
  if(this.formData.visibility){
    form.append('visibility', 'private');
  }else{
    form.append('visibility', 'public');
  }
  if(this.formData.file){
    form.append('file', this.formData.file)
  }

  this.http.post<ArtDto>(this.rootService.host + "/student/art/create_art", form, { observe: 'response' }).subscribe({
    next: (response: any) => {
      this.sharedService.failure_alert = false;
      this.sharedService.success_alert = true;
      this.alertTimer_success();
      console.log(response.body.visibility)
      this.artService.insertNewArt(response.body.id, response.body.title, response.body.description, response.body.create_date, response.body.visibility, response.body.filename)
      this.loading = false;
      this.close_modal();
    }, error: () => {
      this.sharedService.success_alert = false;
      this.sharedService.failure_alert = true;
      this.alertTimer_failure();
      this.close_modal();
    }
  } )
  }

  close_modal(){
    this.modalService.dismissAll();
  }

  alertTimer_success() {
    const alert_timer = 5000;
    setTimeout(() => {
      this.close_alert_success();
    }, alert_timer);
  }


  alertTimer_failure() {
    const alert_timer = 5000;
    setTimeout(() => {
      this.close_alert_failure();
    }, alert_timer);
  }

  close_alert_success() {
    this.sharedService.success_alert = false;
  }

  close_alert_failure() {
    this.sharedService.failure_alert = false;
  }
}
