import { Component, Input, OnInit } from '@angular/core';
import { ArtService } from '../art.service';
import { HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ArtDto } from '../art-dto';
import { RootService } from 'src/app/root.service';

@Component({
  selector: 'app-expand-art',
  templateUrl: './expand-art.component.html',
  styleUrls: ['./expand-art.component.css']
})
export class ExpandArtComponent implements OnInit{
  @Input() art_id: number = 0;
  @Input() art_title: string ='';
  @Input() art_desc: string = '';
  @Input() date: string = '';
  @Input() index: number = 0;

  current_art_index: number = 0;
  current_art_title: string = '';
  current_art_desc: string = '';
  current_art_date: string = '';
  current_art_image: string = '';
  current_img_large: boolean = false;

  loading: boolean = false;
  image_load_successful: boolean = true;
  


  constructor(private artService: ArtService, private http: HttpClient, private rootService: RootService){
  }

  ngOnInit(){
    this.current_art_index = this.index;
    this.current_art_title = this.art_title;
    this.current_art_desc = this.art_desc;
    this.current_art_date = this.date;
    this.loadArtImage(this.art_id);
  }

  // loadArtImage(id: number) {
  //   this.loading = true;

  //   this.artService.loadImageForArt(id,'full_image').subscribe({next: (image: any)=> {
  //     this.image_load_successful = true;
  //     this.current_art_image = image;

  //     const img = new Image();
  //     img.src = image;

  //     console.log(img.height);



  //     this.loading = false;
  //   }, error: ()=>{
  //     this.image_load_successful = false;
  //     this.loading = false;
  //   }})
  // }

  loadArtImage(id: number) {
    this.loading = true;
  
    this.artService.loadImageForArt(id, 'full_image').subscribe({
      next: (image: any) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const imageHeight = img.height;
          if(img.height > 1900){
            this.current_img_large = true;
          }
          this.image_load_successful = true;
          this.current_art_image = image;
          this.loading = false;
        };
        img.onerror = () => {
          this.image_load_successful = false;
          this.loading = false;
        };
      },
      error: () => {
        this.image_load_successful = false;
        this.loading = false;
      }
    });
  }
  
  
  
  
  
  


  nextArt(){
    this.current_art_image = '';
    if(this.current_art_index < this.artService.arts.length){
      this.current_art_index = this.current_art_index + 1;
    } else {
      this.current_art_index = 1;
    }
    this.current_art_title = this.artService.arts[this.current_art_index - 1].title;
    this.current_art_desc = this.artService.arts[this.current_art_index - 1].description;
    this.current_art_date = this.artService.arts[this.current_art_index - 1].create_date;

    const current_art_id = this.artService.arts[this.current_art_index - 1].id;
    this.loadArtImage(current_art_id);
  }


  previous(){
    this.current_art_image = '';
    if(this.current_art_index > 1){
      this.current_art_index = this.current_art_index - 1;
      this.current_art_title = this.artService.arts[this.current_art_index - 1].title;
      this.current_art_desc = this.artService.arts[this.current_art_index - 1].description;
      this.current_art_date = this.artService.arts[this.current_art_index - 1].create_date;
      const current_art_id = this.artService.arts[this.current_art_index - 1].id;
      this.loadArtImage(current_art_id);
    }
  }

}
