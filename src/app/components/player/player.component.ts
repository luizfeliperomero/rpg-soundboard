import { Component, Input, OnInit } from '@angular/core';
import {
  faPlay,
  faPause,
  faStop,
  faArrowRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Sound } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faLoop = faArrowRotateLeft;
  @Input() sound: Sound;
  audio = new Audio();

  constructor() {}

  ngOnInit(): void {
    this.audio.src = this.sound.url;
    this.audio.load();
  }

  play(): void {
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
