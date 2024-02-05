import { Injectable } from '@angular/core';
import { ArtDto } from './art-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RootService } from 'src/app/root.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  arts: ArtDto[] = [];


  constructor(private http: HttpClient, private rootService: RootService) { }


  clearArts(){
    this.arts = [];
  }

  insertNewArt(id: number, title: string, description: string, create_date: string, visibility: string, filename: string){
 
    const newArt: ArtDto ={
      id: id,
      title: title,
      description: description,
      create_date: create_date,
      filename: filename,
      visibility: visibility,
      thumbnail: '',
    }

    this.loadImageForArt(id, 'thumbnail').subscribe(thumbnail => {
      newArt.thumbnail = thumbnail;
    });

    this.arts.splice(0,0, newArt);
  }


  loadImageForArt(id: number, type: string): Observable<string> {
    const params = new HttpParams().set('image_type', type)
    const imageUrl = this.rootService.host + '/student/art/' + id;

    return this.http.get(imageUrl, {params, responseType: 'blob' }).pipe(
      switchMap(response => {
        const reader = new FileReader();
        return new Observable<string>((observer) => {
          reader.onloadend = () => {
            const thumbnail: string = reader.result as string;
            observer.next(thumbnail); 
            observer.complete();
          };
          reader.readAsDataURL(response);
        });
      })
    );    
  }
  
}
