/**
 * Created by retobaumgartner on 19.06.17.
 */
import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-grid',
  templateUrl: 'konvolut-grid.component.html',
  styleUrls: ['konvolut-grid.component.css']
})
export class KonvolutGridComponent {
  selectedRow: number;
  cols: number;

  constructor() {

  }
}
