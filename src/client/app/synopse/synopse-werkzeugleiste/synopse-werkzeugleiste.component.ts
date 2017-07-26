/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse-werkzeugleiste',
  templateUrl: 'synopse-werkzeugleiste.component.html',
  styleUrls: [ 'synopse-werkzeugleiste.component.css' ]
})
export class SynopseWerkzeugleisteComponent implements OnInit {

  @Input() viewMode: string;
  @Output() viewModeChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() showText: boolean;
  @Output() showTextChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  neuladen() {
    window.location.reload();
  }

  hilfe() {
    // TODO
    console.log('Hilfetext ergaenzen');
  }

  ngOnInit() {}
}
