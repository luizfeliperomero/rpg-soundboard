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

  uploadFile(file, playlist_id: string): Observable<Sound> {
    let formData = new FormData();
    let params = new HttpParams().set('playlist_id', playlist_id);
    formData.append('file', file);
    return this.http.post<Sound>(`${this.API}/uploadFile`, formData, {
      params: params,
    });
  }

  getAudioBytes(audioName: string): Observable<any> {
    return this.http.get<any>(`${this.API}/getAudio/${audioName}`);
  }

  getPlaylistSounds(playlist_id: number): Observable<Sound[]> {
    return this.http.get<Sound[]>(`${this.API}/getSounds/${playlist_id}`);
  }
}
