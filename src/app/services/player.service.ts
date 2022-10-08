import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SoundAudio } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private audioSubject: Subject<SoundAudio> = new Subject<SoundAudio>();
  private audio$ = this.audioSubject.asObservable();
  private stagedSubject: Subject<any> = new Subject<any>();
  private staged$ = this.stagedSubject.asObservable();

  constructor() {}

  sendAudio(soundAudio: SoundAudio): void {
    this.audioSubject.next(soundAudio);
  }

  getAudio(): Observable<SoundAudio> {
    return this.audio$;
  }

  sendStagedStatus(staged: any): void {
    this.stagedSubject.next(staged);
  }

  isStaged(): Observable<any> {
    return this.staged$;
  }
}
