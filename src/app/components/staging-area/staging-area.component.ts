import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
export class StagingAreaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sendedSound: SendedSound;
  @Input() player: PlayerComponent;

  faTrashCan = faTrashCan;

  sounds: Sound[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sounds = [];
  }

  ngOnDestroy(): void {
    console.log('DESTROYED');
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newSound: Sound = changes['sendedSound']['currentValue']['sound'];
    if (newSound !== undefined) {
      this.sounds.push(newSound);
    }
    console.log(this.sounds.length);
  }

  clear(): void {
    this.sounds = [];
    this.ngOnDestroy();
  }

  removeSound(event: Sound): void {
    this.sounds.forEach((el, i) => {
      if (el.id === event.id) {
        this.sounds.splice(i, 1);
      }
    });
  }
}
