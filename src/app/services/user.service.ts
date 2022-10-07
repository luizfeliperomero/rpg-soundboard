import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API: string = `${environment.API}/api/v1/user`;
  constructor(private http: HttpClient) {}

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.API}/save`, user);
  }

  authenticate(user: User): Observable<any> {
    return this.http.post<any>(`${this.API}/authenticate`, user);
  }
}
