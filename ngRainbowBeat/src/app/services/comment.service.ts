import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PostComment } from '../models/post-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments: Comment[] = [];

  url = environment.baseUrl + 'api/comments';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-type' : 'application/json'
    }
  };

  public commentsByUsername(username: string){
    return this.http.get<PostComment[]>(this.url + '/user/' + username, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log('CommentService.commentsByUsername() err retrieving comment list');
        return throwError(err);
      })
    )
  }
}
