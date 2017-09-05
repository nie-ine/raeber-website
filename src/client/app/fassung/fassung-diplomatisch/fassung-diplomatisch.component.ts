/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent implements OnChanges {

  @Input() pages: any;
  gewaehlteSchicht: string = 'schicht0';

  ngOnChanges() {
    this.gewaehlteSchicht = 'schicht0';
  }

}
