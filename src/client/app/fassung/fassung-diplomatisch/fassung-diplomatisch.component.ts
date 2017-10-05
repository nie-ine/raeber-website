/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent {

  @Input() pageIRIs: any;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  gewaehlteSchicht: string = 'schicht0';

  oneTranscription = 'http://rdfh.ch/kuno-raeber/fURAeQjIQnuUI2j3yeQh2A';

  // TODO: sort pages by seqnum, find picture id and transcription id per page.

}
