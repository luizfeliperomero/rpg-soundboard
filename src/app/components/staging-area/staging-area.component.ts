import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  faPlay,
  faPause,
  faStop,
  faArrowRotateLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { ForceFunction, SendedSound, Sound } from 'src/app/models';
import { PlayerComponent } from '../player';

@Component({
  selector: 'app-staging-area',
  templateUrl: './staging-area.component.html',
  styleUrls: ['./staging-area.component.css'],
})
export class StagingAreaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sendedSound: SendedSound;
  @Input() player: PlayerComponent;
  faPlay = faPlay;
  faStop = faStop;
  faPause = faPause;
  faArrowRotateLeft = faArrowRotateLeft;
  faTrashCan = faTrashCan;
  forcePlay: boolean;
  forcePause: boolean;
  forceStop: boolean;
  loop: boolean;
  forceFunction: ForceFunction;

  sounds: Sound[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sounds = [];
    this.initForce();
    this.setForceFunction();
  }

  setForceFunction(): void {
    this.forceFunction = {
      forcePlay: this.forcePlay,
      forcePause: this.forcePause,
      forceStop: this.forceStop,
      forceLoop: this.loop,
    };
  }

  initForce(): void {
    this.forcePlay = false;
    this.forcePause = false;
    this.forceStop = false;
    this.loop = false;
  }

  ngOnDestroy(): void {
    this.initForce();
    this.forceFunction = {
      forcePlay: this.forcePlay,
      forcePause: this.forcePause,
      forceStop: this.forceStop,
      forceLoop: this.loop,
    };
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newSound: Sound = changes['sendedSound']['currentValue']['sound'];
    if (newSound !== undefined) {
      this.sounds.push(newSound);
    }
  }

  setLoop(): void {
    this.loop = !this.loop;
    this.setForceFunction();
    this.cd.detectChanges();
  }

  setForcePlay(): void {
    this.forcePlay = !this.forcePlay;
    this.forcePause = false;
    this.forceStop = false;
    this.setForceFunction();
    this.cd.detectChanges();
  }

  setForcePause(): void {
    this.forcePause = !this.forcePause;
    this.forcePlay = false;
    this.forceStop = false;
    this.setForceFunction();
    this.cd.detectChanges();
  }

  setForceStop(): void {
    this.forceStop = !this.forceStop;
    this.forcePlay = false;
    this.forcePause = false;
    this.setForceFunction();
    this.cd.detectChanges();
  }

  clear(): void {
    this.sounds = [];
    this.ngOnDestroy();
  }

  removeSound(event: Sound): void {
    this.sounds.forEach((el, i) => {
      if (el.id === event.id) {
        this.sounds.splice(i, 1);
        if (this.sounds.length === 0) {
          this.ngOnDestroy();
        }
      }
    });
  }
}
