import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
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

  public allComments(){
    return this.http.get<Comment[]>(this.url).pipe(
      catchError((err: any) => {
        console.log("CommentService.allComments(): Error retrieving comment list");
        return throwError(err);
      })
    );
  }

  public commentsByUsername(username: string){
    return this.http.get<PostComment[]>(this.url + '/user/' + username, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log('CommentService.commentsByUsername() err retrieving comment list');
        return throwError(err);
      })
    )
  }

  public destroy(id: number){

    return this.http.delete<PostComment>(this.url + '/' + id, this.httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error deleting comment' + err
        )}
    ))
  }

  public update(comment: PostComment) {
    return this.http.put<PostComment>(this.url, comment, this.httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error updating comment');
      })
    );
  }
}
