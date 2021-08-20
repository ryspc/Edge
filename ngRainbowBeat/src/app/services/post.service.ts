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

  public showPostByUser(username: String ): Observable<Post[]>{
    return this.http.get<Post[]>(this.url+'/user/'+username).pipe(
      catchError((err: any) => {
        console.log('PostService.index() err retrieving post list');
        return throwError(err);
      })
    )
  }

  public create(p: Post){

    // this.todos.push(todo);
    return this.http.post<Post>(this.url, p).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error creating post' + err
        )
      }

      )
    )
  }

  public update(p: Post){
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].id == p.id){
        this.posts[i] = p;

      }
    }
    return this.http.put<Post>(this.url + '/' + p.id, p,  this.httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error updating post' + err
        )
      }


    )
    )
  }

  public destroy(id: number){

    return this.http.delete<Post>(this.url + '/' + id, this.httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error deleting post' + err
        )
      }


    )
    )
  }

}
