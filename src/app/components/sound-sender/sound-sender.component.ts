import {
  ChangeDetectionStrategy,
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
import { PlayerService, SoundService } from 'src/app/services';
import {
  faPenToSquare,
  faTrashCan,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sound-sender',
  templateUrl: './sound-sender.component.html',
  styleUrls: ['./sound-sender.component.css'],
})
export class SoundSenderComponent implements OnInit, OnDestroy {
  @Input() sound: Sound;
  @Input() playlistId: string;
  @Output() emitter: EventEmitter<SendedSound> = new EventEmitter();
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() sendEditedConfirmation: EventEmitter<boolean> = new EventEmitter();
  @Output() soundShared: EventEmitter<boolean> = new EventEmitter();
  audio: HTMLAudioElement;
  faShare = faShare;
  subscriptions: Subscription[];
  sendedSound: SendedSound;
  faPenToSquare = faPenToSquare;
  faToggleOn = faToggleOn;
  faTrashCan = faTrashCan;
  faToggleOff = faToggleOff;
  staged: boolean = false;
  autoPlay: boolean = false;
  editSound: boolean = false;
  addSoundToPlaylist: boolean = false;

  constructor(
    private soundService: SoundService,
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

  setAddSoundToPlaylist(): void {
    this.addSoundToPlaylist = !this.addSoundToPlaylist;
  }

  delete(): void {
    this.subscriptions.push(
      this.soundService.delete(this.sound, Number(this.playlistId)).subscribe(
        () => {},
        () => {},
        () => {
          this.deleted.emit(true);
        }
      )
    );
  }

  setEditSound(): void {
    this.editSound = !this.editSound;
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

  soundEdited(event): void {
    this.sendEditedConfirmation.emit(event);
    this.setEditSound();
  }

  sendSharedSound(event): void {
    this.addSoundToPlaylist = false;
    this.soundShared.emit(event);
  }
}
