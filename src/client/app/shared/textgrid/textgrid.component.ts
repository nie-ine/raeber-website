/**
 * Created by retobaumgartner on 21.06.17.
 */

import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'rae-textgrid',
  templateUrl: 'textgrid.component.html',
  styleUrls: [ 'textgrid.component.css' ]
})
export class TextgridComponent implements OnChanges, AfterViewChecked {

  @Input() contentType: string = 'suche'; // synopse OR konvolut OR suche
  @Input() viewMode: string = 'grid';
  @Input() showText: boolean = true;
  @Input() columns: string = '43%';
  @Input() rahmen: boolean = true;
  @Input() poemsInGrid: Array<any>;

  @Output() gridHeight: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTerm: Array<any>;

  gridTextHeight: number = 0;
  i: number;
  router: Router;

  /**
   * Orders an array by date (ascending)
   * @param {Array<any>} unsorted Array to be sorted
   * @returns {Array<any>} Sorted array
   */
  private static sortByDate(unsorted: Array<any>): Array<any> {
    return unsorted.sort((x, y) => {
        if (x[ 1 ] > y[ 1 ]) {
          return 1;
        } else if (x[ 1 ] < [ 1 ]) {
          return -1;
        } else {
          return 0;
        }
      }
    );
  }

  constructor(private cdr: ChangeDetectorRef, r: Router) {
    this.router = r;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'poemsInGrid') {
        let chng = changes[ propName ];
        if (!chng.isFirstChange()) {
          if (this.poemsInGrid) {
            this.poemsInGrid = chng.currentValue;
            for (this.i = 0; this.i < this.poemsInGrid.length; this.i++) {
              this.poemsInGrid[ this.i ].obj_id = encodeURIComponent(this.poemsInGrid[ this.i ].obj_id);
            }
          }
          // TODO: Abklären, welche Ansichten die Sortierfunktion benötigen
          this.poemsInGrid = TextgridComponent.sortByDate(this.poemsInGrid);
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

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  vergroessereFeld() {
    if (this.gridTextHeight <= 18) {
      this.gridTextHeight += 2;
      this.gridHeight.emit(this.gridTextHeight);
    }
  }

  verkleinereFeld() {
    if (this.gridTextHeight >= -18) {
      this.gridTextHeight -= 2;
      this.gridHeight.emit(this.gridTextHeight);
    }
  }

  highlight(textToHighlight: string, searchTerm: string) {
    if (searchTerm === undefined) {
      return textToHighlight;
    }
    return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

  resetField() {
    this.gridTextHeight = 0;
    this.gridHeight.emit(this.gridTextHeight);
  }

}
