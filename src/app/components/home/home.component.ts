import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showAddPlaylistModal: boolean = false;
  title = 'soundboard';

  setShowAddPlaylistModal(): void {
    this.showAddPlaylistModal = !this.showAddPlaylistModal;
  }
}
