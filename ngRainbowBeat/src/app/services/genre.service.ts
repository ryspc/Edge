import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url = environment.baseUrl + 'api/genres';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-type' : 'application/json'
    }
  };

  public genreByName(genreName: string){
    return this.http.get<Genre>(this.url + '/name/' + genreName, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log('CommentService.commentsByUsername() err retrieving genre');
        return throwError(err);
      })
    )
  }

  public genreById(genreName: string){
    console.log(genreName);
    return this.http.get<Genre>(this.url + '/' + genreName, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log('CommentService.commentsByUsername() err retrieving genre');
        return throwError(err);
      })
    )
  }

  public allGenres(){
    return this.http.get<Genre[]>(this.url, this.httpOptions).pipe(
      catchError((err: any) => {
        console.log('GenreService err retrieving all genres');
        return throwError(err);
      })
    )
  }
}
