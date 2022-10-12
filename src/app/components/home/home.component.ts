import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist, SendedSound } from 'src/app/models';
import { Theme } from 'src/app/models/Theme';
import { GlobalService, PlaylistService } from 'src/app/services';

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
  theme: Theme = Theme.DEFAULT;

  constructor(
    private playlistService: PlaylistService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.sendTheme(this.theme);
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

  sendTheme(theme: Theme): void {
    this.globalService.sendTheme(theme);
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

  onThemeSelected(theme: string) {
    if (theme === 'Default') {
      this.theme = Theme.DEFAULT;
      this.sendTheme(this.theme);
    }
    if (theme === 'Medieval Fantasy') {
      this.theme = Theme.MEDIEVAL_FANTASY;
      this.sendTheme(this.theme);
    }
    if (theme === 'Medieval') {
      this.theme = Theme.MEDIEVAL;
      this.sendTheme(this.theme);
    }
    if (theme === 'Space') {
      this.theme = Theme.SPACE;
      this.sendTheme(this.theme);
    }
    if (theme === 'Post Apocalyptic') {
      this.theme = Theme.POST_APOCALYPTC;
      this.sendTheme(this.theme);
    }
  }

  soundStarted(event) {
    this.sendedSound = event;
  }

  playlistDeleted(event) {
    this.getUserPlaylists();
  }

  onNewPlaylist() {
    this.getUserPlaylists();
    this.setShowAddPlaylistModal();
  }
}
