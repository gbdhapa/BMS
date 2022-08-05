import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../model/user';



@Injectable({ providedIn: 'root' })

export class UserService {

  totalAngularPackages: any;
  errorMessage: any;
  baseUrl: string;

  constructor(private http: HttpClient) {

     
    this.baseUrl = 'http://localhost:8080/account';

  }
  
  addUser(User: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/add', User);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all');
  }

  updateUser(User: User): Observable<any> {
    console.log("updated id "+ User.id);
    return this.http.put(this.baseUrl + '/update/' + User.id, User)
  }

  deleteUser(User: User): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/delete/' + User.id);
  }

}
