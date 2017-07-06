/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-werkzeugleiste',
  templateUrl: 'fassung-werkzeugleiste.component.html',
  styleUrls: ['fassung-werkzeugleiste.component.css']
})
export class FassungWerkzeugleisteComponent implements OnInit {

  @Input() poemResizable: boolean;
  @Input() showRegister: boolean;
  @Output() poemResizableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showRegisterChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  neuladen() {
    // TODO
    window.location.reload();
  }

  hilfe() {
    // TODO
    console.log('Hilfetext ergaenzen');
  }

  ngOnInit() {}
}
