import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Playlist } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  API: string = `${environment.API}/api/v1/playlist`;

  constructor(private http: HttpClient) {}

  save(playlist: Playlist, user_id: number): Observable<Playlist> {
    let params = new HttpParams().set('user_id', user_id);
    return this.http.post<Playlist>(`${this.API}/save`, playlist, {
      params: params,
    });
  }

  getUserPlaylists(user_id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.API}/findPlaylists/${user_id}`);
  }
}
