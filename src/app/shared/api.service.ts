import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../core/models/users';


@Injectable({
providedIn: 'root'
})

export class ApiService {
redirectUrl: string;
baseUrl:string = "http://localhost/phpGame/php/";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
constructor(private httpClient : HttpClient) { }
public userlogin(username, password) {
alert(username)
return this.httpClient.post<any>(this.baseUrl + 'registry', { username, password })
.pipe(map(Users => {
this.setToken(Users[0].name);
this.getLoggedInName.emit(true);
return Users;
}));
}

public userregistration(name,email,pwd) {
return this.httpClient.post<any>(this.baseUrl + 'registry.php', { name,email, pwd })
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
