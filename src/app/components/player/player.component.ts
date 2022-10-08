import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  faPlay,
  faPause,
  faStop,
  faArrowRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Sound } from 'src/app/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faLoop = faArrowRotateLeft;
  @Input() sound: Sound;
  @Output() started: EventEmitter<Sound> = new EventEmitter();
  audio = new Audio();
  requested: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.pause();
  }

  sendSoundRequest(): void {
    if (!this.requested) {
      this.audio.src = this.sound.url;
      this.audio.load();
      this.requested = true;
    }
  }

  play(): void {
    this.started.emit(this.sound);
    this.sendSoundRequest();
    this.audio.play();
    this.listenForEnd();
  }

  listenForEnd(): void {
    this.audio.onended = function () {};
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setLoop(): void {
    this.audio.loop = !this.audio.loop;
  }

  setVolume(event) {
    this.audio.volume = event.target.value;
  }
}
