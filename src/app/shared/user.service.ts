import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../core/models/users';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  redirectUrl: string;
  baseUrl: string = "http://localhost/phpGame/php/";

  loginStatus = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<Users>(null);

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }


//   loginServer(loginData): Observable<Response> {
//     let username = loginData.username.trim();
//     let password = loginData.password.trim();
//     return this.http.post<Response>(this.appConfig.apiUrl + '/users/authenticate', { username: username, password: password });
// }

  public userlogin(username, password) {
    alert(username)
    return this.httpClient.post<any>(this.baseUrl + 'registry', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }

  public userregistration(name, email, pwd) {
    return this.httpClient.post<any>(this.baseUrl + 'registry.php', { name, email, pwd })
      .pipe(map(data => {
        return data;
      }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
