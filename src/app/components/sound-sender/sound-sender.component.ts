import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SendedSound, Sound } from 'src/app/models';

@Component({
  selector: 'app-sound-sender',
  templateUrl: './sound-sender.component.html',
  styleUrls: ['./sound-sender.component.css'],
})
export class SoundSenderComponent implements OnInit {
  @Input() sound: Sound;
  @Output() emitter: EventEmitter<SendedSound> = new EventEmitter();
  sendedSound: SendedSound;

  constructor() {}

  ngOnInit(): void {}

  emitSound(): void {
    this.sendedSound = {
      sound: this.sound,
      timestamp: Date.now(),
    };
    this.emitter.emit(this.sendedSound);
  }
}
