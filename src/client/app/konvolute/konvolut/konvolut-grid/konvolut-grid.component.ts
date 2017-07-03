/**
 * Created by retobaumgartner on 21.06.17.
 */

import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-grid',
  templateUrl: 'konvolut-grid.component.html',
  styleUrls: [ 'konvolut-grid.component.css' ]
})
export class KonvolutGridComponent {

  @Input() poems_in_grid: Array<any>;

  showGrid = true;
  showCols = false;

  toGrid() {
    this.showGrid = true;
    this.showCols = false;
  }

  toCols() {
    this.showGrid = false;
    this.showCols = true;
  }

}
