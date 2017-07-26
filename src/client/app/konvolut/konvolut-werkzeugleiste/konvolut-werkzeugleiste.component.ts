/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-werkzeugleiste',
  templateUrl: 'konvolut-werkzeugleiste.component.html',
  styleUrls: [ 'konvolut-werkzeugleiste.component.css' ]
})
export class KonvolutWerkzeugleisteComponent implements OnInit {

  @Input() viewMode: string;
  @Output() viewModeChange: EventEmitter<string> = new EventEmitter<string>();

  hilfe() {
    // TODO
    console.log('Hilfetext ergaenzen');
  }

  ngOnInit() {}
}
