import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Playlist, Sound } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlistSubject: Subject<Sound[]> = new Subject<Sound[]>();
  private playlist$ = this.playlistSubject.asObservable();
  API: string = `${environment.API}/api/v1/playlist`;

  constructor(private http: HttpClient) {}

  save(playlist: Playlist, user_id: number): Observable<Playlist> {
    let params = new HttpParams().set('user_id', user_id);
    return this.http.post<Playlist>(`${this.API}/save`, playlist, {
      params: params,
    });
  }

  edit(playlist: Playlist): Observable<any> {
    return this.http.post(`${this.API}/update`, playlist);
  }

  delete(playlist: Playlist): Observable<any> {
    return this.http.post(`${this.API}/delete`, playlist);
  }

  getUserPlaylists(user_id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.API}/findPlaylists/${user_id}`);
  }

  sendPlaylist(sounds: Sound[]): void {
    this.playlistSubject.next(sounds);
  }

  getPlaylist(): Observable<Sound[]> {
    return this.playlist$;
  }

  getPlaylistsWhereSoundNotExists(soundId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(
      `${this.API}/getPlaylistsWhereSoundNotExists/${soundId}`
    );
  }
}
