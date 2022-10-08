import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sound } from 'src/app/models';

@Component({
  selector: 'app-sound-sender',
  templateUrl: './sound-sender.component.html',
  styleUrls: ['./sound-sender.component.css'],
})
export class SoundSenderComponent implements OnInit {
  @Input() sound: Sound;
  @Output() emitter: EventEmitter<Sound> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitSound(): void {
    this.emitter.emit(this.sound);
  }
}
