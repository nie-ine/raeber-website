/**
 * Created by retobaumgartner on 21.06.17.
 */

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-grid',
  templateUrl: 'konvolut-grid.component.html',
  styleUrls: ['konvolut-grid.component.css']
})
export class KonvolutGridComponent {

  showGrid = true;
  showCols = false;

  constructor() {
    // tbf
  }

  toGrid() {
    this.showGrid = true;
    this.showCols = false;
  }

  toCols() {
    this.showGrid = false;
    this.showCols = true;
  }

}
