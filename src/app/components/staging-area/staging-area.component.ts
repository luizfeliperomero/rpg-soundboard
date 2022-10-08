import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { SendedSound, Sound } from 'src/app/models';
import { PlayerComponent } from '../player';

@Component({
  selector: 'app-staging-area',
  templateUrl: './staging-area.component.html',
  styleUrls: ['./staging-area.component.css'],
})
export class StagingAreaComponent implements OnInit, OnChanges {
  @Input() sendedSound: SendedSound;
  @Input() player: PlayerComponent;

  faTrashCan = faTrashCan;

  sounds: Sound[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    var newSound = changes['sendedSound']['currentValue']['sound'];
    if (newSound !== undefined) {
      this.sounds.push(newSound);
    }
  }

  clear(): void {
    this.sounds = [];
  }
}
