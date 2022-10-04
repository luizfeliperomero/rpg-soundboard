import { Component, OnInit } from '@angular/core';
import { Sound } from 'src/app/models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  sound: Sound;

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.sound = {
        id: null,
        name: file.name,
        url: window.URL.createObjectURL(file),
      };
    }
  }
}
