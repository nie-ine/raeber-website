/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, Input } from '@angular/core';

import { AlphabeticalSortingService } from '../utilities/alphabetical-sorting.service';
import { DateFormatService } from '../utilities/date-format.service';
import { CachePoem } from '../textgrid/cache-poem';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: [ 'registerspalte.component.css' ],
  providers: [ AlphabeticalSortingService, DateFormatService ]
})
export class RegisterspalteComponent {

  @Input() konvolutIRI: string;
  @Input() unsortedPoems: Array<CachePoem>;
  @Input() konvolutView: boolean;
  @Input() convoluteTitle: string;
  @Input() convoluteType: string;
  @Input() poemType: string;

  poemIRIArray: any[];
  isAlphabeticallySorted: boolean = true;

  private static sortBySeqnum(x: any, y: any): number {
    const xNum = RegisterspalteComponent.prefixWithZeroes(x.seqnum);
    const yNum = RegisterspalteComponent.prefixWithZeroes(y.seqnum);
    if (xNum < yNum) {
      return -1;
    } else if (xNum > yNum) {
      return 1;
    }
    return 0;
  }

  private static prefixWithZeroes(s: string): string {
    return '000'.substr(0, 3 - s.length) + s;
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

  createLinkToPoem(poem: CachePoem): string {
    return poem ?
      poem.poemTitle.split('/')[ 0 ].replace(/[()]/g, '') + '---' + poem.poemIRI.split('raeber/')[ 1 ] :
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

  getAppropriateListOfSortedPoems(unsortedPoems: Array<CachePoem>): Array<CachePoem> {
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
    const xNormalized = this.sortingService.germanAlphabeticalSortKey(x.poemTitle);
    const yNormalized = this.sortingService.germanAlphabeticalSortKey(y.poemTitle);
    if (xNormalized < yNormalized) {
      return -1;
    } else if (xNormalized > yNormalized) {
      return 1;
    }
    return 0;
  }

}
