import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ="http://localhost:8091/";
  private url = this.baseUrl + "api/users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private users: User[] = [];

  constructor(private http: HttpClient) { }

  public index() {
    return this.http.get<User[]>(this.url, this.httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting User list');
      })
    );
  }

  public update(user: User) {
    return this.http.put<User>(this.url, user, this.httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error updating User');
      })
    );
  }

}
