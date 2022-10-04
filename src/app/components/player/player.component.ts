import { Component, Input, OnInit } from '@angular/core';
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
  }

  play(): void {
    this.audio.load();
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }
}
