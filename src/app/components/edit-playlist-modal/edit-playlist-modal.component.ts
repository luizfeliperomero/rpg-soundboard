import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models';
import { PlaylistService } from 'src/app/services';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.css'],
})
export class EditPlaylistModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  @Input() playlist: Playlist;
  @Output() editConfirmation: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.subscription = null;
    this.form = this.formBuilder.group({
      name: [this.playlist.name],
      description: [this.playlist.description],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  send(): void {
    this.playlist.name = this.form.value.name;
    this.playlist.description = this.form.value.description;
    this.subscription = this.playlistService.edit(this.playlist).subscribe(
      () => {},
      () => {},
      () => {
        this.editConfirmation.emit(true);
      }
    );
  }
}
