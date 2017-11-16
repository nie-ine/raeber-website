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

  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  poemIRIArray: any[];
  isAlphabeticallySorted: boolean = true;

  private static sortBySeqnum(x: any, y: any): number {
    if (x[ 8 ] < y[ 8 ]) {
      return -1;
    } else if (x[ 8 ] > y[ 8 ]) {
      return 1;
    }
    return 0;
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

  createLinkToPoem(poem: any[]): string {
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
        this.isAlphabeticallySorted && !this.isDiaryEntry() ?
          this.sortAlphabetically(x, y) :
          RegisterspalteComponent.sortBySeqnum(x, y)
      );
  }

  isTypewritten(): boolean {
    return this.isTyposcript() ||
      this.isInMonograph() ||
      this.isInSerialPublication() ||
      this.isDiaryEntry() ||
      this.isLetter();
  }

  isHandwritten(): boolean {
    return this.isNote() ||
      this.isManuscript() ||
      this.isPostcard();
  }

  isNote(): boolean {
    return this.convoluteType === 'poem notebook' ||
      this.poemType === 'PoemNote';
  }

  isManuscript(): boolean {
    return this.convoluteType === 'poem manuscript convolute' ||
      this.poemType === 'HandwrittenPoem';
  }

  isPostcard(): boolean {
    return this.convoluteType === 'poem postcard convolute' ||
      this.poemType === 'PostCardPoem';
  }

  isTyposcript(): boolean {
    return this.convoluteType === 'poem typescript convolute' ||
      this.convoluteType === 'poem typescript convolute with image' ||
      this.poemType === 'TypewrittenPoem';
  }

  isInMonograph(): boolean {
    return this.convoluteType === 'printed poem book publication' ||
      (this.poemType === 'PublicationPoem' && this.convoluteTitle !== 'Verstreutes');
  }

  isInSerialPublication(): boolean {
    return this.convoluteType === 'poly-author publication convolute' ||
      this.convoluteTitle === 'Verstreutes';
  }

  isDiaryEntry(): boolean {
    return this.convoluteType === 'diary convolute' ||
      this.poemType === 'DiaryEntry';
  }

  isLetter(): boolean {
    return this.convoluteType === 'letter convolute' ||
      this.convoluteTitle === 'Briefe';
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
