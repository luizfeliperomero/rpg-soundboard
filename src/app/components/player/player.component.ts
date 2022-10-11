import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  faPlay,
  faPause,
  faStop,
  faArrowRotateLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { Sound } from 'src/app/models';
import { PlayerService } from 'src/app/services';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy, DoCheck {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faLoop = faArrowRotateLeft;
  faTrashCan = faTrashCan;
  @Input() sound: Sound;
  @Output() started: EventEmitter<Sound> = new EventEmitter();
  @Output() leave: EventEmitter<Sound> = new EventEmitter();
  audio = new Audio();
  staged: boolean = true;
  requested: boolean = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    if (this.sound.autoPlay) {
      this.play();
    }
    this.playerService.sendStagedStatus({
      staged: this.staged,
      soundId: this.sound.id,
    });
  }

  ngDoCheck(): void {
    this.playerService.sendAudio({
      audio: this.audio,
      soundId: this.sound.id,
    });
  }

  ngOnDestroy(): void {
    this.staged = false;
    this.playerService.sendStagedStatus({
      staged: this.staged,
      soundId: this.sound.id,
    });
    this.pause();
    if (this.audio.loop) {
      this.setLoop();
    }
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

  getOut() {
    this.leave.emit(this.sound);
  }
}
