import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sound } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  API: string = `${environment.API}/api/v1/sound`;

  constructor(private http: HttpClient) {}

  save(playlist_id: number, sound: Sound): Observable<Sound> {
    let params = new HttpParams().set('playlist_id', playlist_id);
    return this.http.post<Sound>(`${this.API}/save`, sound, { params: params });
  }

  savePlaylistSound(playlistId: number, soundId: number): Observable<any> {
    return this.http.get(
      `${this.API}/savePlaylistSound/${playlistId}/${soundId}`
    );
  }

  delete(sound: Sound, playlistId: number): Observable<any> {
    const options = {
      body: sound,
    };
    return this.http.delete(`${this.API}/delete/${playlistId}`, options);
  }

  edit(sound: Sound): Observable<any> {
    return this.http.put(`${this.API}/update`, sound);
  }

  uploadFile(file, playlist_id: string, user_id: string): Observable<Sound> {
    let formData = new FormData();
    let params = new HttpParams()
      .set('playlist_id', playlist_id)
      .set('user_id', user_id);
    formData.append('file', file);
    return this.http.post<Sound>(`${this.API}/uploadFile`, formData, {
      params: params,
    });
  }

  getAudioBytes(audioCode: string): Observable<any> {
    return this.http.get<any>(`${this.API}/getAudio/${audioCode}`);
  }

  getPlaylistSounds(playlist_id: number): Observable<Sound[]> {
    return this.http.get<Sound[]>(`${this.API}/getSounds/${playlist_id}`);
  }
}
