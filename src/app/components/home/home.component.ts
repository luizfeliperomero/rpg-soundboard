import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models';
import { PlaylistService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.getUserPlaylists();
  }

  showAddPlaylistModal: boolean = false;
  playlists: Playlist[];

  setShowAddPlaylistModal(): void {
    this.showAddPlaylistModal = !this.showAddPlaylistModal;
  }

  getUserPlaylists(): void {
    this.playlistService
      .getUserPlaylists(JSON.parse(localStorage.getItem('user')).id)
      .subscribe((data) => {
        this.playlists = data;
      });
  }
}
