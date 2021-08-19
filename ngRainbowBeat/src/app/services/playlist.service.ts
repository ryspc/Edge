import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  url = environment.baseUrl + 'api/playlists';
  private playlists: Playlist[] = [];


  index(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.url).pipe(
      catchError((err: any) => {
        console.log('PlaylistService.index() err retrieving  playlists');
        return throwError(err);
      })
    );
  }


  httpOptions = {
    headers: {
      'Content-type' : 'application/json'
    }
  };
}
