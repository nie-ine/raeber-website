/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse-werkzeugleiste',
  templateUrl: 'synopse-werkzeugleiste.component.html'
})
export class SynopseWerkzeugleisteComponent implements OnInit {

  @Input() viewMode: string;
  @Output() viewModeChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() showText: boolean;
  @Output() showTextChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() vergroessereText = new EventEmitter();
  @Output() verkleinereText = new EventEmitter();

  ngOnInit() {}

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

}
