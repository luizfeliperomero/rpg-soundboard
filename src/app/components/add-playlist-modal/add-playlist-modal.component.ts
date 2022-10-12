import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Playlist, User } from 'src/app/models';
import { PlaylistService } from 'src/app/services';

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.css'],
})
export class AddPlaylistModalComponent implements OnInit {
  form: FormGroup;
  user: User;
  playlist: Playlist;
  @Output() sendConfirmation: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private playlistService: PlaylistService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      name: [null],
      description: [null],
    });
  }

  submit(): void {
    this.playlist = this.form.value;
    this.playlistService.save(this.playlist, this.user.id).subscribe((data) => {
      this.sendConfirmation.emit(true);
    });
  }
}
