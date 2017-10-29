/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-blaettern',
  templateUrl: 'fassung-blaettern.component.html',
  styleUrls: [ 'fassung-blaettern.component.css' ]
})
export class FassungBlaetternComponent {
  @Input() idOfPrev: string;
  @Input() titleOfPrev: string;
  @Input() idOfNext: string;
  @Input() titleOfNext: string;

  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  goToNextFassung() {
    this.goToOtherFassung.emit(this.idOfNext);
  }

  goToPrevFassung() {
    this.goToOtherFassung.emit(this.idOfPrev);
  }

}
