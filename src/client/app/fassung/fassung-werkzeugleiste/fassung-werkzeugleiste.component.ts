/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-werkzeugleiste',
  templateUrl: 'fassung-werkzeugleiste.component.html'
})
export class FassungWerkzeugleisteComponent implements OnInit {

  @Input() poemResizable: boolean;
  @Input() showRegister: boolean;
  @Output() poemResizableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showRegisterChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() idOfPrev: string;
  @Input() idOfNext: string;

  neuladen() {
    window.location.reload();
  }

  hilfe() {
    // TODO
    console.log('Hilfetext ergaenzen');
  }

  ngOnInit() {}
}
