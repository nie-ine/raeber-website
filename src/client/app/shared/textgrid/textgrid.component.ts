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
import { DateFormatService } from '../utilities/date-format.service';


@Component({
  moduleId: module.id,
  selector: 'rae-textgrid',
  templateUrl: 'textgrid.component.html',
  styleUrls: [ 'textgrid.component.css' ],
  providers: [ DateFormatService ]
})
export class TextgridComponent implements OnChanges, AfterViewChecked {

  @Input() contentType: string = 'suche'; // synopse OR konvolut OR suche
  @Input() viewMode: string = 'grid';
  @Input() showText: boolean = true;
  @Input() columns: string = '43%';
  @Input() rahmen: boolean = true;
  @Input() poemsInGrid: Array<any>;
  @Input() resetPoems: string;

  @Output() gridHeight: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTermArray: Array<any>;

  gridTextHeight: number = 0;
  i: number;
  j: number;

  constructor(private cdr: ChangeDetectorRef, private dateFormatService: DateFormatService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.resetPoems === 'reset') {
      this.poemsInGrid = [];
    }
    for (let propName in changes) {
      if (propName === 'poemsInGrid') {
        let chng = changes[ propName ];
        if (!chng.isFirstChange()) {
          if (this.poemsInGrid) {
            this.poemsInGrid = chng.currentValue;
            //for (this.i = 0; this.i < this.poemsInGrid.length; this.i++) {
            //  this.poemsInGrid[ this.i ].obj_id = encodeURIComponent(this.poemsInGrid[ this.i ].obj_id);
            //}
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

  highlight(textToHighlight: string, searchTermArray: Array<string>) {
    this.j = 0;
      for(let seachTerm of searchTermArray) {
        textToHighlight = this.highlightSingleSearchTerm(textToHighlight,seachTerm, this.j);
        this.j += 1;
      }
      return textToHighlight;
  }
  highlightSingleSearchTerm(textToHighlight: string, searchTerm: string, j: number) {
    if (searchTerm === undefined) {
      return textToHighlight;
    } else if(textToHighlight !== undefined ) {
      if (j === 0) {
        return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
          return '<span class="highlightText0">' + match + '</span>';
        });
      } else if (j === 1) {
        return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
          return '<span class="highlightText1">' + match + '</span>';
        });
      } else if (j === 2) {
        return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
          return '<span class="highlightText2">' + match + '</span>';
        });
      } else if (j === 3) {
        return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
          return '<span class="highlightText3">' + match + '</span>';
        });
      } else {
        return textToHighlight.replace(new RegExp(searchTerm, 'gi'), match => {
          return '<span class="highlightText0">' + match + '</span>';
        });
      }
    } else {
      return null;
    }
  }
  resetField() {
    this.gridTextHeight = 0;
    this.gridHeight.emit(this.gridTextHeight);
  }

  produceFassungsLink(titel: string, iri: string) {
    if(titel !== undefined && iri !== undefined) {
      return titel.split('/')[0] + '---' + iri.split('raeber/')[1];
    } else {
      return 'Linkinformation has not arrived yet';
    }
  }

  formatDate(date: string) {
    return this.dateFormatService.germanLongDate(date);
  }
}
