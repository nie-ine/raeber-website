/**
 * Created by retobaumgartner on 06.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-weitere',
  templateUrl: 'fassung-weitere.component.html'
})
export class FassungWeitereComponent {
  @Input() synopsenTags: any[] = [];
  @Input() idOfNext: string;

  @Output() goOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  goToOtherFassung(otherFassung: string) {
    console.log('Go to other Fassung');
    this.goOtherFassung.emit(otherFassung);
  }

}
