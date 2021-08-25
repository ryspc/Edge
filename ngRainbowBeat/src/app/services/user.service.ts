import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + "api/users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

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

  public getCurrentUser(cred: string[]) {
    return this.http.get<User>(`${this.url}/${cred[0]}`, this.httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting User list');
      })
    );
  }

  public getUserFollowing(cred: string[]) {
    return this.http.get<User[]>(`${this.url}/${cred[0]}/following`, this.httpOptions)
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
