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
  @Output() numberOfResults: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTermArray: Array<any>;

  @Input() gridTextHeight: number = 0;
  i: number;
  j: number;
  searchActivated = false;
  searchInKonvolut = false;
  searchForPage: Array<any>;

  // Filter flags for synoptic view
  @Input() filterFirstLastFlag = false;
  @Input() filterDuplicatesFlag = true;
  @Input() filterNotebookFlag = false;
  @Input() filterManuscriptFlag = false;
  @Input() filterTyposcriptFlag = false;
  @Input() konvolutView: boolean;
  numberOfShownPoems: number;

  static highlightSingleSearchTerm(textToHighlight: string, searchTerm: string, j: number) {
    if (searchTerm === undefined) {
      return textToHighlight;
    } else if (textToHighlight !== undefined) {
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

  /**
   * Orders an array by date (ascending) and seqnum (ascending)
   * @param {Array<any>} unsorted Array to be sorted
   * @returns {Array<any>} Sorted array
   */
  private static sortByDate(unsorted: Array<any>): Array<any> {
    return unsorted.sort((x, y) => {
      if (x.poemCreationDate > y.poemCreationDate) {
          return 1;
      } else if (x.poemCreationDate < y.poemCreationDate) {
          return -1;
        } else {
          if (x.convoluteTitle === y.convoluteTitle) {
            if (x.seqnum > y.seqnum) {
              return 1;
            } else if (x.seqnum < y.seqnum) {
              return -1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }
      }
    );
  }

  /**
   * Filter duplicates
   * @param x Element in array (a poem)
   * @returns {boolean} Filtered
   */
  private static filterDuplicates(x: any): boolean {
    return x.sameEdition !== '1';
  }

  /**
   * Filter by convolute type.
   * @param x Element in array (a poem)
   * @param {string} type Convolute type
   * @returns {boolean} Filtered
   */
  private static filterConvoluteTypes(x: any, type: string): boolean {
    return !x.convoluteTitle.includes(type);
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

  private static filterSearchResults(x: any): boolean {
    return x.show;
  }

  private static filterSingleTextbox(x: any) {
    return !x.isVisible;
  }

  constructor(private cdr: ChangeDetectorRef, private dateFormatService: DateFormatService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.searchTermfromKonvolut) {
      if (this.searchTermfromKonvolut[ 0 ] && this.searchTermfromKonvolut[ 0 ].length > 1) {
        this.searchInKonvolut = true;
        this.searchActivated = true;
        this.searchAndFilterInTextgrid();
      }
      if (this.searchTermfromKonvolut[ 1 ] && this.searchTermfromKonvolut[ 1 ] !== 'null') {
        this.filterPoemsOnPage();
        this.searchActivated = true;
        this.searchInKonvolut = true;
      }
      if (!(this.searchTermfromKonvolut[ 0 ] && this.searchTermfromKonvolut[ 0 ].length > 1)
        && !this.searchTermfromKonvolut[ 1 ]) {
        this.searchActivated = false;
        this.searchTermArray = undefined;
      }
    }
  }

  filterPoemsOnPage() {
    this.searchForPage = undefined;
    for (let poem of this.poemsInGrid) {
      if (poem !== undefined) {
        console.log('Seite des Poems: ' + poem.onPage);
        //console.log(poem[13]);
        if (poem.onPage === this.searchTermfromKonvolut[ 1 ]) {
          poem.show = true;
        } else {
          poem.show = false;
        }
      }
    }
  }

  searchAndFilterInTextgrid() {
    this.searchTermArray = undefined;
    for (let poem of this.poemsInGrid) {
      if (poem !== undefined) {
        if (poem.poemTitle.search(this.searchTermfromKonvolut[ 0 ]) !== -1) {
          poem.show = true;
          this.searchTermArray = [];
          this.searchTermArray[ 0 ] = this.searchTermfromKonvolut[ 0 ];
        } else if (poem.poemText.search(this.searchTermfromKonvolut[ 0 ]) !== -1) {
          poem.show = true;
          this.searchTermArray = [];
          this.searchTermArray[ 0 ] = this.searchTermfromKonvolut[ 0 ];
        } else {
          poem.show = false;
        }
      }
    }
  }


  ngAfterViewChecked() {
    if (this.poemsInGrid !== undefined && this.router.url.split('/')[ 1 ] === 'synopsen') {
      this.poemsInGrid = TextgridComponent.sortByDate(this.poemsInGrid);
      this.numberOfShownPoems = this.getNumberOfShownPoems();
      this.numberOfResults.emit(this.numberOfShownPoems);
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
    for (let seachTerm of searchTermArray) {
      textToHighlight = TextgridComponent.highlightSingleSearchTerm(textToHighlight, seachTerm, this.j);
      this.j += 1;
    }
    return textToHighlight;
  }

  resetField() {
    this.gridTextHeight = 0;
    this.gridHeight.emit(this.gridTextHeight);
  }

  resetSinglePoemHiddenState() {
    for (let i in this.poemsInGrid) {
      this.poemsInGrid[i].isVisible = false;
    }
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
        .filter(x => this.searchActivated ? TextgridComponent.filterSearchResults(x) : x)
        .filter(x => this.filterDuplicatesFlag ? TextgridComponent.filterDuplicates(x) : x)
        .filter(x => this.filterNotebookFlag ? TextgridComponent.filterConvoluteTypes(x, 'Notizbuch') : x)
        .filter(x => this.filterManuscriptFlag ? TextgridComponent.filterConvoluteTypes(x, 'Manuskript') : x)
        .filter(x => this.filterTyposcriptFlag ? TextgridComponent.filterConvoluteTypes(x, 'Typoskript') : x)
        .filter(x => TextgridComponent.filterSingleTextbox(x));
    } else {
      return unfiltered;
    }
  }

  formatDate(date: string) {
    //console.log(date);
    return this.dateFormatService.germanLongDate(date);
  }

  produceTitleCss(isInFinalVersion: string) {
    if (isInFinalVersion === '1') {
      return '#a30f2d';
    } else return false;
  }

  hideTextbox(iri: string) {
    this.updatePoemByIriInArray(iri, x => x.isVisible = true);
  }

  updatePoemByIriInArray(iri: string, updateFun: (x: any) => void) {
    for (let i in this.poemsInGrid) {
      if (this.poemsInGrid[i].poemIRI === iri) {
        updateFun(this.poemsInGrid[i]);
      }
    }
  }

  getNumberOfShownPoems(): number {
    return this.filterPoems(this.poemsInGrid).length;
  }

}
