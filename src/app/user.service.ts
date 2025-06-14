import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface userItem {
  id: number;
  role: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class userService {

  private userapiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsersWithRoles(): Observable<userItem[]> {
    return this.http.get<userItem[]>(this.userapiUrl);
  }

  getUserPassword(username: string): Observable<userItem[]> {
    return this.http.get<userItem[]>(`${this.userapiUrl}/${username}`);
  }

  addComponent(user: userItem): Observable<any> {
    return this.http.post(this.userapiUrl, user);
  }

}