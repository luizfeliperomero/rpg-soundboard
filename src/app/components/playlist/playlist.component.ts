import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  faCirclePlus,
  faSpinner,
  faCheck,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Playlist, Sound } from 'src/app/models';
import { PlaylistService, SoundService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  @Input() playlist: Playlist;
  @Output() started: EventEmitter<Sound> = new EventEmitter();
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  newSound: Sound;
  sounds: Sound[];
  faPlusCircle = faCirclePlus;
  faSpinner = faSpinner;
  faCheck = faCheck;
  uploading: boolean = false;
  uploadingMessage: String = '';
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  constructor(
    private soundService: SoundService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.getPlaylistSounds();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newSound = {
        id: null,
        name: file.name.split('.')[0],
        url: `${environment.API}/api/v1/sound/getAudio/${file.name}`,
      };
    }
    this.uploadFile(file);
  }

  setUploading(): void {
    this.uploading = !this.uploading;
  }

  uploadFile(file): void {
    this.setUploading();
    this.uploadingMessage = 'Uploading';
    this.subscriptions.push(
      this.soundService.uploadFile(file, this.playlist.id).subscribe(
        (success) => {
          this.uploadingMessage = "Uploading, Please don't refresh the page";
        },
        (err) => {
          this.uploadingMessage = 'Sorry, something went wrong';
          setTimeout(() => {
            this.setUploading();
          }, 5000);
        },
        () => {
          this.uploadingMessage = 'Upload completed!';
          setTimeout(() => {
            this.getPlaylistSounds();
            this.setUploading();
          }, 2000);
        }
      )
    );
  }

  delete(): void {
    this.subscriptions.push(
      this.playlistService.delete(this.playlist).subscribe(
        () => {},
        () => {},
        () => {
          this.deleted.emit(true);
        }
      )
    );
  }

  getPlaylistSounds(): void {
    this.subscriptions.push(
      this.soundService
        .getPlaylistSounds(Number(this.playlist.id))
        .subscribe((data) => {
          this.sounds = data;
        })
    );
  }

  soundStarted(event) {
    this.started.emit(event);
  }

  soundDeleted(event) {
    this.getPlaylistSounds();
  }

  soundEdited(event) {
    this.getPlaylistSounds();
  }
}
