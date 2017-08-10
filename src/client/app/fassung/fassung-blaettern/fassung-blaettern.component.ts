/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-blaettern',
  templateUrl: 'fassung-blaettern.component.html'
})
export class FassungBlaetternComponent {
  @Input() idOfPrev: string;
  @Input() idOfNext: string;


  titleOfPrev = 'Baum'; //TODO
  titleOfNext = 'Brunnen'; //TODO


}
