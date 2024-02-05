import { Component, HostListener as HostListenerDecorator, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpandArtComponent } from './expand-art/expand-art.component';
import { SharedService } from 'src/app/services/shared.service';
import { RootService } from 'src/app/root.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ArtDto } from './art-dto';
import { ArtService } from './art.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {


  currentPage: number = 0;
  totalPages: number = 0;
  number_of_elements: number = 0;
  totalArtCounts: number = 0;



  constructor(private modalService: NgbModal,
    public sharedService: SharedService,
    private rootService: RootService,
    private http: HttpClient,
    public artService: ArtService,
    private router: Router) { }


  ngOnInit(): void {

    this.artService.clearArts();
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(screenWidth)
    if(screenWidth <= 820){
      this.number_of_elements = 6;
    }
    if (screenWidth > 820 && screenWidth < 1200) {
      this.number_of_elements = 12;
    }
    else if (screenWidth > 1200 && screenWidth < 2300) {
      this.number_of_elements = 24;
    } else if (screenWidth > 2300) {
      this.number_of_elements = 40;
    }

    this.sharedService.component_name = 'Arts'
    this.totalArts();
  }


  totalArts() {
    this.http.get(this.rootService.host + '/student/art/total',).subscribe({
      next: (response: any) => {
        this.totalArtCounts = response;
        this.totalPages = response / this.number_of_elements;
        this.loadArts();
        this.currentPage = this.currentPage + 1;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401){
          this.router.navigateByUrl('')
          window.localStorage.clear()
        }
      }
    });
  }


  loadArts() {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('pageSize', this.number_of_elements.toString());
    this.http.get<ArtDto[]>(this.rootService.host + '/student/art/arts', { params, observe: 'response' }).subscribe({
      next: (response: any) => {
        const newArts = response.body;
        this.artService.arts = this.artService.arts.concat(newArts);
        this.artService.arts.forEach(art => {
          this.artService.loadImageForArt(art.id, 'thumbnail').subscribe(thumbnail => {
            art.thumbnail = thumbnail;
          });
        })
      },
      error: (error: HttpErrorResponse) => {
      }
    });
  }

  loadMore() {
    this.loadArts();
    this.currentPage = this.currentPage + 1;
  }


  keyword: string = '';
  onInputChanged(event: Event) {
    if (this.keyword.length > 0) {
      const params = new HttpParams().set('keyword', this.keyword);
      this.http.get<ArtDto[]>(this.rootService.host + '/student/art/search', { params, observe: 'response' }).subscribe(
        {
          next: (response: any) => {
            this.artService.clearArts();
            this.artService.arts = response.body;
            this.artService.arts.forEach(art => {
              this.artService.loadImageForArt(art.id, 'thumbnail').subscribe(thumbnail => {
                art.thumbnail = thumbnail;
              });
            })

          },
          error: (error: HttpErrorResponse) => {
          }
        }
      )
    }else {
      this.artService.clearArts();
      this.currentPage = 0;
      this.totalArts();
    }
  }



  expand(id: number, title: string, desc: string, date: string, index: number) {
    const modalRef = this.modalService.open(ExpandArtComponent, {
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.art_id = id;
    modalRef.componentInstance.art_title = title;
    modalRef.componentInstance.art_desc = desc;
    modalRef.componentInstance.date = date;
    modalRef.componentInstance.index = index;
  }
}


