import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private soundService: SoundService) {}

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
    console.log(this.newSound);
    this.uploadFile(file);
    this.saveSound(this.newSound);
  }

  saveSound(sound: Sound): void {
    this.soundService
      .save(Number(this.playlist.id), sound)
      .subscribe((data) => {
        console.log(data);
      });
  }

  uploadFile(file): void {
    this.soundService.uploadFile(file).subscribe((data) => {
      console.log(data);
    });
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
