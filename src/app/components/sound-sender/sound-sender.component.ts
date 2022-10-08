import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SendedSound, Sound } from 'src/app/models';
import { PlayerService } from 'src/app/services';

@Component({
  selector: 'app-sound-sender',
  templateUrl: './sound-sender.component.html',
  styleUrls: ['./sound-sender.component.css'],
})
export class SoundSenderComponent implements OnInit {
  @Input() sound: Sound;
  @Output() emitter: EventEmitter<SendedSound> = new EventEmitter();
  audio: HTMLAudioElement;
  sendedSound: SendedSound;
  staged: boolean = false;

  constructor(
    private playerService: PlayerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUpdatedAudio();
    this.getStagedState();
  }

  getUpdatedAudio(): void {
    this.playerService.getAudio().subscribe((data) => {
      if (data.soundId === this.sound.id) {
        this.audio = data.audio;
        this.cd.detectChanges();
      }
    });
  }

  getStagedState(): void {
    this.playerService.isStaged().subscribe((data) => {
      if (data.soundId === this.sound.id) {
        this.staged = data.staged;
        this.cd.detectChanges();
      }
    });
  }

  emitSound(): void {
    this.staged = true;
    this.sendedSound = {
      sound: this.sound,
      timestamp: Date.now(),
    };
    this.emitter.emit(this.sendedSound);
  }
}
