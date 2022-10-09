import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faCirclePlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Playlist, Sound } from 'src/app/models';
import { SoundService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  @Input() playlist: Playlist;
  @Output() started: EventEmitter<Sound> = new EventEmitter();
  newSound: Sound;
  sounds: Sound[];
  faPlusCircle = faCirclePlus;
  faSpinner = faSpinner;
  uploading: boolean = false;
  uploadingMessage: String = '';

  constructor(
    private soundService: SoundService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPlaylistSounds();
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
    this.saveSound(this.newSound);
  }

  saveSound(sound: Sound): void {
    this.soundService
      .save(Number(this.playlist.id), sound)
      .subscribe((data) => {
        this.cd.detectChanges();
      });
  }

  setUploading(): void {
    this.uploading = !this.uploading;
  }

  uploadFile(file): void {
    this.setUploading();
    this.uploadingMessage = 'Uploading';
    this.soundService.uploadFile(file).subscribe(
      (success) => {
        this.uploadingMessage = "Uploading, Please don't refresh the page";
      },
      (err) => {
        this.uploadingMessage = 'Sorry, something went wrong :(';
        setTimeout(() => {
          this.setUploading();
        }, 3000);
      },
      () => {
        this.uploadingMessage = 'Upload completed!';
        this.setUploading();
      }
    );
  }

  getPlaylistSounds(): void {
    this.soundService
      .getPlaylistSounds(Number(this.playlist.id))
      .subscribe((data) => {
        this.sounds = data;
      });
  }

  soundStarted(event) {
    this.started.emit(event);
  }
}
