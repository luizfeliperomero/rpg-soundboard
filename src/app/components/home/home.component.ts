import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist, SendedSound, Sound } from 'src/app/models';
import { PlaylistService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  showAddPlaylistModal: boolean = false;
  playlists: Playlist[];
  sendedSound: SendedSound;
  subscriptions: Subscription[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.getUserPlaylists();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  setShowAddPlaylistModal(): void {
    this.showAddPlaylistModal = !this.showAddPlaylistModal;
  }

  getUserPlaylists(): void {
    this.subscriptions.push(
      this.playlistService
        .getUserPlaylists(JSON.parse(localStorage.getItem('user')).id)
        .subscribe((data) => {
          this.playlists = data;
        })
    );
  }

  soundStarted(event) {
    this.sendedSound = event;
  }

  playlistDeleted(event) {
    this.getUserPlaylists();
  }
}
