import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Sound } from 'src/app/models';
import { PlayerComponent } from '../player';

@Component({
  selector: 'app-staging-area',
  templateUrl: './staging-area.component.html',
  styleUrls: ['./staging-area.component.css'],
})
export class StagingAreaComponent implements OnInit, OnChanges {
  @Input() sound: Sound;
  @Input() player: PlayerComponent;

  sounds: Sound[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    var newSound = changes['sound']['currentValue'];
    if (newSound !== undefined) {
      this.sounds.push(newSound);
    }
  }
}
