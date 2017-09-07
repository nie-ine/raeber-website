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

  @Input() poems_in_grid: Array<any>;
  @Input() searchTerm: Array<any>;

  showGrid = true;
  showCols = false;
  public query: string;
  private content: string;

  public constructor() {
    this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Praesent a quam ornare, bibendum ligula a, rhoncus ligula. Etiam aliquet, ' +
      'justo sollicitudin imperdiet luctus, nulla justo sodales mi, sit amet semper ' +
      'nisl velit vel massa. In hac habitasse platea dictumst.';
  }

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

  toGrid() {
    this.showGrid = true;
    this.showCols = false;
  }

  toCols() {
    this.showGrid = false;
    this.showCols = true;
  }

  highlight(textToHighlight: string, searchTerm: string) {
    if(searchTerm === undefined) {
      return textToHighlight;
    }
    return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

}
