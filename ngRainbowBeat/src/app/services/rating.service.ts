import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Rating } from '../models/rating';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: Rating[] = [];

  url = environment.baseUrl + 'api/rating';
  constructor(private http: HttpClient, private auth: AuthService) { }

  getHttpOptions():object {
    const credentials = this.auth.getCredentials();
    const httpOptions =  {
      headers: new HttpHeaders( {
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    })
  }
  if (credentials) {
    httpOptions.headers = httpOptions.headers.set('authorization', `Basic ${credentials}`);
  }
     return httpOptions;
  }

  public ratingByPostId(id: number){
    return this.http.get<Rating[]>(this.url + '/post/' + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log('PostService.postByUsername() err retrieving post list');
        return throwError(err);
      })
    )
  }
  public update(postId: number,rating: Rating){
    return this.http.put<Rating>(this.url + '/post/' + postId, rating,  this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error updating rating' + err
        )
      }
    )
    )
  }

  public create(rating: Rating){
    return this.http.post<Rating>(this.url + '/post/' + rating.post.id, rating, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error creating rating' + err
        )
      }
    )
    )
  }

}
