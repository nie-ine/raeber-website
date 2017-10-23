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
import { Router } from '@angular/router';


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
  @Input() konvolutTitle: string;
  @Input() searchTermfromKonvolut: string;

  @Output() gridHeight: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTermArray: Array<any>;

  gridTextHeight: number = 0;
  i: number;
  j: number;
  searchActivated = false;
  searchInKonvolut = false;

  // Filter flags for synoptic view
  @Input() filterFirstLastFlag = false;
  @Input() filterDuplicatesFlag = false;
  @Input() filterNotebookFlag = false;
  @Input() filterManuscriptFlag = false;
  @Input() filterTyposcriptFlag = false;

  /**
   * Orders an array by date (ascending)
   * @param {Array<any>} unsorted Array to be sorted
   * @returns {Array<any>} Sorted array
   */
  private static sortByDate(unsorted: Array<any>): Array<any> {
    return unsorted.sort((x, y) => {
        if (x[ 1 ] + String(1000000 + x[ 8 ]) > y[ 1 ] + String(1000000 + x[ 8 ])) {
          return 1;
        } else if (x[ 1 ] + String(1000000 + x[ 8 ]) < x[ 1 ]+ String(1000000 + x[ 8 ])) {
          return -1;
        } else {
          return 0;
        }
      }
    );
  }

  constructor(private cdr: ChangeDetectorRef, private dateFormatService: DateFormatService, private router: Router) {
  }

  /**
   * Filter duplicates
   * @param x Element in array (a poem)
   * @returns {boolean} Filtered
   */
  private static filterDuplicates(x: any): boolean {
    return !x[ 4 ];
  }

  /**
   * Filter by convolute type.
   * @param x Element in array (a poem)
   * @param {string} type Convolute type
   * @returns {boolean} Filtered
   */
  private static filterConvoluteTypes(x: any, type: string): boolean {
    return x[ 5 ] !== type;
  }

  /**
   * Filters chronologically first and last element in array
   * @param {Array<any>} x Unfiltered array
   * @returns {Array<any>} Filtered array
   */
  private static filterFirstLast(x: Array<any>): Array<any> {
    let firstLast: Array<any> = [];
    firstLast.push(x[ 0 ]);
    if (x.length > 1) {
      firstLast.push(x[ x.length - 1 ]);
    }
    return firstLast;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.resetPoems === 'reset') {
      this.poemsInGrid = [];
    }
    for (let propName in changes) {
      if (propName === 'poemsInGrid') {
        let chng = changes[ propName ];
        if (!chng.isFirstChange()) {
          if (this.poemsInGrid) {
            this.poemsInGrid = chng.currentValue;
          }
        }
      }
    }
    if(this.searchTermfromKonvolut && this.searchTermfromKonvolut.length > 1) {
      this.searchAndFilterInTextgrid();
      this.searchInKonvolut = true;
    } else if (this.searchInKonvolut !== false ) {
      this.searchActivated = false;
      this.searchTermArray = undefined;
    }
  }

  searchAndFilterInTextgrid() {
    this.searchTermArray = undefined;
    console.log(this.searchTermfromKonvolut);
    if (this.searchTermfromKonvolut === '') {
      this.searchActivated = false;
    } else {
      this.searchActivated = true;
    }
    console.log('Filter and Search in Textgrid');
    console.log(this.searchTermfromKonvolut);
    for(let poem of this.poemsInGrid) {
      if(poem[0] !== undefined) {
        if(poem[0].search(this.searchTermfromKonvolut) !== -1) {
          this.searchTermArray = [];
          poem.show = true;
          this.searchTermArray[ 0 ] = this.searchTermfromKonvolut;
        } else if (poem[2].search(this.searchTermfromKonvolut) !== -1) {
          this.searchTermArray = [];
          poem.show = true;
          this.searchTermArray[ 0 ] = this.searchTermfromKonvolut;
        } else {
          poem.show = false;
        }
        }
      }
    }


  ngAfterViewChecked() {
    if (this.poemsInGrid !== undefined && this.router.url.split('/')[ 1 ] === 'synopsen') {
      this.poemsInGrid = TextgridComponent.sortByDate(this.poemsInGrid);
    }
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
    //console.log(textToHighlight);
    //console.log(searchTermArray);
    if (searchTermArray === undefined) {
      return textToHighlight;
    }
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
    if (titel !== undefined && iri !== undefined) {
      if (this.konvolutTitle === undefined) {
        return '/' + titel.split('/')[ 0 ] + '---' + iri.split('raeber/')[ 1 ];
      } else {
        return '/' + this.konvolutTitle + '/' + titel.split('/')[ 0 ] + '---' + iri.split('raeber/')[ 1 ];
      }
    } else {
      return 'Linkinformation has not arrived yet';
    }
  }

  /**
   * Apply filters for synoptic view
   * @param {Array<any>} unfiltered Unfiltered poems array
   * @returns {Array<any>} Filtered poems array
   */
  filterPoems(unfiltered: Array<any>): Array<any> {
    if (unfiltered !== undefined) {
      return (this.filterFirstLastFlag ? TextgridComponent.filterFirstLast(unfiltered) : unfiltered)
        .filter(x => this.filterDuplicatesFlag ? TextgridComponent.filterDuplicates(x) : x)
        .filter(x => this.filterNotebookFlag ? TextgridComponent.filterConvoluteTypes(x, 'PoemNote') : x)
        .filter(x => this.filterManuscriptFlag ? TextgridComponent.filterConvoluteTypes(x, 'HandwrittenPoem') : x)
        .filter(x => this.filterTyposcriptFlag ? TextgridComponent.filterConvoluteTypes(x, 'TypewrittenPoem') : x);
    } else {
      return unfiltered;
    }
  }

  formatDate(date: string) {
    return this.dateFormatService.germanLongDate(date);
  }

}
