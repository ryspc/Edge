import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songs: Song[] = [];
  private song: Song = new Song;

  url = environment.baseUrl + 'api/songs';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-type' : 'application/json'
    }
  };

  public create(s: Song){
    console.log(s);
    return this.http.post<Song>(this.url, s).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'error creating post' + err
        )
      }
      )
    )
  }
}
