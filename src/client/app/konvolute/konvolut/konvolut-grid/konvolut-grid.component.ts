/**
 * Created by retobaumgartner on 21.06.17.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-grid',
  templateUrl: 'konvolut-grid.component.html',
  styleUrls: [ 'konvolut-grid.component.css' ]
})
export class KonvolutGridComponent implements OnChanges {

  @Input() poems_in_grid: Array<any>;

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[ propName ];
      this.poems_in_grid = chng.currentValue;
    }
    /*    for (let propName in changes) {
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     }*/
    // changes.prop contains the old and the new value...
  }

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
