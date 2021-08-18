import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  url = environment.baseUrl + 'api/posts';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-type' : 'application/json'
    }
  };

  index(): Observable<Post[]>{
    return this.http.get<Post[]>(this.url).pipe(
      catchError((err: any) => {
        console.log('PostService.index() err retrieving post list');
        return throwError(err);
      })
    )
  }
}
