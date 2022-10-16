import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist, Sound, User } from 'src/app/models';
import { PlaylistService, SoundService } from 'src/app/services';

@Component({
  selector: 'app-add-sound-modal',
  templateUrl: './add-sound-modal.component.html',
  styleUrls: ['./add-sound-modal.component.css'],
})
export class AddSoundModalComponent implements OnInit, OnDestroy {
  @Input() sound: Sound;
  @Output() sendConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  playlists: Playlist[] = [];
  user: User;
  playlistSelectedId: number;
  subscriptions: Subscription[] = [];

  constructor(
    private playlistService: PlaylistService,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserPlaylists();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  getUserPlaylists(): void {
    this.subscriptions.push(
      this.playlistService.getUserPlaylists(this.user.id).subscribe((data) => {
        this.playlists = data;
        const firstValue = this.playlists.find((p) => {
          return p.id;
        });
        this.playlistSelectedId = Number(firstValue.id);
      })
    );
  }

  getPlaylists(): void {
    console.log('getPlaylists');
    this.subscriptions.push(
      this.playlistService
        .getPlaylistsWhereSoundNotExists(this.sound.id)
        .subscribe((data) => {
          this.playlists = data;
        })
    );
  }

  select(event): void {
    this.playlistSelectedId = event.target.value;
  }

  confirm() {
    this.subscriptions.push(
      this.soundService
        .savePlaylistSound(this.playlistSelectedId, this.sound.id)
        .subscribe(() => {
          this.sendConfirmed.emit(true);
        })
    );
  }
}
