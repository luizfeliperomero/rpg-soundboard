import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SendedSound, Sound } from 'src/app/models';
import { PlayerService } from 'src/app/services';
import {
  faPenToSquare,
  faTrashCan,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sound-sender',
  templateUrl: './sound-sender.component.html',
  styleUrls: ['./sound-sender.component.css'],
})
export class SoundSenderComponent implements OnInit, OnDestroy {
  @Input() sound: Sound;
  @Output() emitter: EventEmitter<SendedSound> = new EventEmitter();
  audio: HTMLAudioElement;
  subscriptions: Subscription[];
  sendedSound: SendedSound;
  faPenToSquare = faPenToSquare;
  faToggleOn = faToggleOn;
  faTrashCan = faTrashCan;
  faToggleOff = faToggleOff;
  staged: boolean = false;
  autoPlay: boolean = false;

  constructor(
    private playerService: PlayerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions = [];
    this.getUpdatedAudio();
    this.getStagedState();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  getUpdatedAudio(): void {
    this.subscriptions.push(
      this.playerService.getAudio().subscribe((data) => {
        if (data.soundId === this.sound.id) {
          setTimeout(() => {
            this.audio = data.audio;
          }, 0);
        }
      })
    );
  }

  getStagedState(): void {
    this.subscriptions.push(
      this.playerService.isStaged().subscribe((data) => {
        if (data.soundId === this.sound.id) {
          this.staged = data.staged;
          this.cd.detectChanges();
        }
      })
    );
  }

  setAutoPlay(): void {
    this.autoPlay = !this.autoPlay;
  }

  emitSound(): void {
    this.sound.autoPlay = this.autoPlay;
    this.staged = true;
    this.sendedSound = {
      sound: this.sound,
      timestamp: Date.now(),
    };
    this.emitter.emit(this.sendedSound);
  }
}
