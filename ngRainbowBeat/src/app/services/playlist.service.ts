import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Playlist } from '../models/playlist';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  favoriteSongs: Playlist = new Playlist();


  url = environment.baseUrl + 'api/playlists';
  private playlists: Playlist[] = [];


  index(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log('PlaylistService.index() err retrieving  playlists');
        return throwError(err);
      })
    );
  }

  create(){
  return this.http.post<Playlist>(this.url, this.favoriteSongs, this.getHttpOptions()).pipe(
    catchError((err: any) => {
      console.log('PlaylistService.create() err creating  playlists');
      return throwError(err);
    })
  );
  }

  update(playlist: Playlist) {
    return this.http.put<Playlist>(this.url, playlist, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log("PlaylistService.update(): err updating playlist")
        return throwError(err);
      })
    );
  }

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
  // httpOptions = {
  //   headers: {
  //     'Content-type' : 'application/json'
  //   }
  // };
}
