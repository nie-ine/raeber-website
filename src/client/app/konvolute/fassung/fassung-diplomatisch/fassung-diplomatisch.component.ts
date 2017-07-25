/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent {

  @Input() pages: any;
  gewaehlteSchicht: string = 'schicht0';

}
