import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Theme } from '../models/Theme';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private themeSubject: Subject<Theme> = new Subject<Theme>();
  private theme$ = this.themeSubject.asObservable();

  constructor() {}

  sendTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }

  getTheme(): Observable<Theme> {
    return this.theme$;
  }
}
