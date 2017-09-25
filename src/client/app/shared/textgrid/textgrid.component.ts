/**
 * Created by retobaumgartner on 21.06.17.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-textgrid',
  templateUrl: 'textgrid.component.html',
  styleUrls: [ 'textgrid.component.css' ]
})
export class TextgridComponent implements OnChanges {

  @Input() contentType: string = 'suche'; // synopse OR konvolut OR suche
  @Input() viewMode: string = 'grid';
  @Input() showText: boolean = true;

  @Input() poemsInGrid: Array<any>;

  gridTextHeight: number = 10;
  i: number;

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'poemsInGrid') {
        let chng = changes[ propName ];
        this.poemsInGrid = chng.currentValue;
        for (this.i = 0; this.i < this.poemsInGrid.length; this.i++) {
          this.poemsInGrid[this.i].obj_id = encodeURIComponent(this.poemsInGrid[this.i].obj_id);
        }
      }
    }
    /*    for (let propName in changes) {
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     }*/
    // changes.prop contains the old and the new value...
  }

  vergroessereFeld() {
    this.gridTextHeight += 2;
  }

  verkleinereFeld() {
    if (this.gridTextHeight > 3) {
      this.gridTextHeight -= 2;
    }
  }
}
