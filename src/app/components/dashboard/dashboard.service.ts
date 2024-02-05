import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { RootService } from 'src/app/root.service';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private rootService: RootService) { }

  getAllContent(): Observable<Post[]> {
    return this.http.get<Post[]>(this.rootService.host + '/student/dashboard/all')
  }



  loadImageForDashboardContent(id: number, category: string): Observable<string> {
    const imageUrl = this.rootService.host + '/student/dashboard/getpostimage/' + id;
    const params = new HttpParams().set('category', category)

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
