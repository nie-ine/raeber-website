/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-blaettern',
  templateUrl: 'fassung-blaettern.component.html',
  styleUrls: [ 'fassung-blaettern.component.css' ]
})
export class FassungBlaetternComponent {
  @Input() idOfPrev: string;
  @Input() titleOfPrev: string;
  @Input() idOfNext: string;
  @Input() titleOfNext: string;

}
