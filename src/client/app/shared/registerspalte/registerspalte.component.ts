/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AlphabeticalSortingService } from '../utilities/alphabetical-sorting.service';
import { DateFormatService } from '../utilities/date-format.service';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: [ 'registerspalte.component.css' ],
  providers: [ AlphabeticalSortingService, DateFormatService ]
})
export class RegisterspalteComponent {

  @Input() konvolutIRI: string;
  @Input() unsortedPoems: Array<any>;
  @Input() konvolutView: boolean;
  @Input() convoluteTitle: string;
  @Input() convoluteType: string;
  @Input() poemType: string;

  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  poemIRIArray: Array<any>;
  isAlphabeticallySorted: boolean = true;

  private static sortBySeqnum(x: any, y: any) {
    if (x[ 8 ] < y[ 8 ]) {
      return -1;
    } else if (x[ 8 ] > y[ 8 ]) {
      return 1;
    }
    return 0;
  }

  constructor(private sortingService: AlphabeticalSortingService, private dateFormatService: DateFormatService) {
  }

  formatDate(date: string) {
    return this.dateFormatService.germanNumericDate(date);
  }

  getSortedPoems(): Array<any> {
    return this.unsortedPoems !== undefined ?
      this.getAppropriateListOfSortedPoems(this.unsortedPoems) :
      this.unsortedPoems;
  }

  getNumberOfPoems(): number {
    return this.unsortedPoems !== undefined ?
      this.unsortedPoems.filter(x => x !== undefined).length :
      0;
  }

  produceFassungsLink(poem: Array<any>): string {
    if (poem) {
      if (poem[ 0 ] !== undefined && poem[ 3 ] !== undefined) {
        return poem[ 0 ].split('/')[ 0 ] + '---' + poem[ 3 ].split('raeber/')[ 1 ];
      } else {
        return 'Linkinformation has not arrived yet';
      }
    } else {
      return null;
    }
  }

  removeHtml(content: string) {
    if (content !== undefined) {
      return content.replace(/<span class="zeile">[0-9]+\s*<\/span>/g, '')
        .replace(/<br[^>a-zA-Z0-9]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/<[^>]+>/g, '');
    } else {
      return undefined;
    }
  }

  getAppropriateListOfSortedPoems(unsortedPoems: Array<any>) {
    return unsortedPoems
      .filter(x => x !== undefined)
      .sort((x, y) =>
        this.isAlphabeticallySorted ?
          this.sortByFirstLetter(x, y) :
          RegisterspalteComponent.sortBySeqnum(x, y)
      );
  }

  isTypewritten() {
    return this.convoluteType === 'poem typescript convolute' ||
      this.convoluteType === 'poem typescript convolute with image' ||
      this.convoluteType === 'printed poem book publication' ||
      this.convoluteType === 'poly-author publication convolute' ||
      this.convoluteType === 'diary convolute' ||
      this.convoluteType === 'letter convolute' ||
      this.poemType === 'TypewrittenPoem' ||
      this.poemType === 'PublicationPoem';
  }

  isHandwritten() {
    return this.convoluteType === 'poem notebook' ||
      this.convoluteType === 'poem manuscript convolute' ||
      this.convoluteType === 'poem postcard convolute' ||
      this.poemType === 'PoemNote' ||
      this.poemType === 'HandwrittenPoem' ||
      this.poemType === 'PostCardPoem';
  }

  isInDiary() {
    return this.convoluteType === 'diary convolute' ||
      this.poemType === 'DiaryEntry';
  }

  swapSortMode() {
    this.isAlphabeticallySorted = !this.isAlphabeticallySorted;
  }

  private sortByFirstLetter(x: any, y: any) {
    const xNormalized = this.sortingService.germanAlphabeticalSortKey(x[ 0 ]);
    const yNormalized = this.sortingService.germanAlphabeticalSortKey(y[ 0 ]);
    if (xNormalized < yNormalized) {
      return -1;
    } else if (xNormalized > yNormalized) {
      return 1;
    }
    return 0;
  }

}
