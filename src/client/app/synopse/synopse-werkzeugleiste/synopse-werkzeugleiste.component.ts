/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse-werkzeugleiste',
  templateUrl: 'synopse-werkzeugleiste.component.html',
  styleUrls: [ 'synopse-werkzeugleiste.component.css' ]
})
export class SynopseWerkzeugleisteComponent {

  @Input() showText: boolean;
  @Output() showTextChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() vergroessereText = new EventEmitter();
  @Output() verkleinereText = new EventEmitter();
  @Output() cols: EventEmitter<number> = new EventEmitter<number>();

  columns: number = 2;
  rahmen: boolean = true;

  neuladen() {
    window.location.reload();
  }

  hilfe() {
    // TODO
    console.log('Hilfetext ergaenzen');
  }

  textVergroessern() {
    this.vergroessereText.emit(null);
  }

  textVerkleinern() {
    this.verkleinereText.emit(null);
  }

  toggleFrame() {
    this.rahmen = !this.rahmen;
  }


}
