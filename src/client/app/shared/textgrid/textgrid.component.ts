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

  @Input() contentType: string; // synopse OR konvolut OR suche
  @Input() viewMode: string;
  @Input() showText: boolean;

  @Input() poemsInGrid: Array<any>;

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[ propName ];
      this.poemsInGrid = chng.currentValue;
    }
    /*    for (let propName in changes) {
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     }*/
    // changes.prop contains the old and the new value...
  }
}
