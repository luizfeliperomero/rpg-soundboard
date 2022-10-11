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
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { ForceFunction, Sound } from 'src/app/models';
import { PlayerService } from 'src/app/services';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy, OnChanges {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faLoop = faArrowRotateLeft;
  faTrashCan = faTrashCan;
  @Input() sound: Sound;
  @Input() forceFunction: ForceFunction;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forceFunction']['currentValue']['forcePlay']) {
      this.play();
    }
    if (changes['forceFunction']['currentValue']['forcePause']) {
      this.pause();
    }
    if (changes['forceFunction']['currentValue']['forceStop']) {
      this.stop();
    }
    if (changes['forceFunction']['currentValue']['forceLoop']) {
      this.audio.loop = true;
    } else {
      this.audio.loop = false;
    }
  }

  sendAudio(): void {
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
    this.sendAudio();
  }

  listenForEnd(): void {
    this.audio.onended = function () {};
    this.sendAudio();
  }

  pause(): void {
    this.audio.pause();
    this.sendAudio();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.sendAudio();
  }

  setLoop(): void {
    this.audio.loop = !this.audio.loop;
  }

  setVolume(event) {
    this.audio.volume = event.target.value;
  }

  getOut() {
    this.leave.emit(this.sound);
    this.sendAudio();
  }
}
