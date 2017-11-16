/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() unsortedPoems: any[];
  @Input() konvolutView: boolean;
  @Input() convoluteTitle: string;
  @Input() convoluteType: string;
  @Input() poemType: string;

  poemIRIArray: any[];
  isAlphabeticallySorted: boolean = true;

  private static sortByDate(x: any, y: any): number {
    if (x[ 1 ] > y[ 1 ]) {
      return 1;
    } else if (x[ 1 ] < y[ 1 ]) {
      return -1;
    } else {
      if (x[ 4 ] === y[ 4 ]) {
        if (x[ 5 ] > y[ 5 ]) {
          return 1;
        } else if (x[ 5 ] < y[ 5 ]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  }

  constructor(private sortingService: AlphabeticalSortingService, private dateFormatService: DateFormatService) {
  }

  formatDate(date: string): string {
    return this.dateFormatService.germanNumericDate(date);
  }

  getSortedPoems(): any[] {
    return this.unsortedPoems !== undefined ?
      this.getAppropriateListOfSortedPoems(this.unsortedPoems) :
      this.unsortedPoems;
  }

  getNumberOfPoems(): number {
    return this.unsortedPoems !== undefined ?
      this.unsortedPoems.filter(x => x !== undefined).length :
      0;
  }

  produceFassungsLink(poem: any[]): string {
    return poem ?
      poem[ 0 ].split('/')[ 0 ] + '---' + poem[ 3 ].split('raeber/')[ 1 ] :
      undefined;
  }

  removeHtml(content: string): string {
    return content ?
      content.replace(/<span class="zeile">[0-9]+\s*<\/span>/g, '')
        .replace(/<br[^>a-zA-Z0-9]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/<[^>]+>/g, '') :
      undefined;
  }

  getAppropriateListOfSortedPoems(unsortedPoems: any[]): any[] {
    return unsortedPoems
      .filter(x => x !== undefined)
      .sort((x, y) =>
        this.isAlphabeticallySorted && !this.isInDiary() ?
          this.sortAlphabetically(x, y) :
          RegisterspalteComponent.sortByDate(x, y)
      );
  }

  isTypewritten(): boolean {
    return this.convoluteType === 'poem typescript convolute' ||
      this.convoluteType === 'poem typescript convolute with image' ||
      this.convoluteType === 'printed poem book publication' ||
      this.convoluteType === 'poly-author publication convolute' ||
      this.convoluteType === 'diary convolute' ||
      this.convoluteType === 'letter convolute' ||
      this.poemType === 'TypewrittenPoem' ||
      this.poemType === 'PublicationPoem';
  }

  isHandwritten(): boolean {
    return this.convoluteType === 'poem notebook' ||
      this.convoluteType === 'poem manuscript convolute' ||
      this.convoluteType === 'poem postcard convolute' ||
      this.poemType === 'PoemNote' ||
      this.poemType === 'HandwrittenPoem' ||
      this.poemType === 'PostCardPoem';
  }

  isInDiary(): boolean {
    return this.convoluteType === 'diary convolute' ||
      this.poemType === 'DiaryEntry';
  }

  private sortAlphabetically(x: any, y: any): number {
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
