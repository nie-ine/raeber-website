/**
 * Created by retobaumgartner on 06.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-weitere',
  templateUrl: 'fassung-weitere.component.html'
})
export class FassungWeitereComponent {
  @Input() synopsenTags: any[] = [];
  @Input() idOfNext: string;

  private static getPoemDateFromPoemString(poemString: string) {
    return poemString.split('###')[ 2 ];
  }

  private static getConvoluteTitleFromPoemString(poemString: string) {
    return poemString.split('###')[ 0 ].split('/')[ 1 ];
  }

  private static getPoemSeqnumFromPoemString(poemString: string) {
    return poemString.split('###')[ 3 ];
  }

  constructor(private router: Router) {
  }

  /**
   * Orders an array by date (ascending) and seqnum (ascending)
   * @param {Array<any>} unsorted Array to be sorted
   * @returns {Array<any>} Sorted array
   */
  sortByDateAndSeqnum(unsorted: Array<string>): Array<string> {
    return unsorted.sort((x, y) => {
        if (FassungWeitereComponent.getPoemDateFromPoemString(x) > FassungWeitereComponent.getPoemDateFromPoemString(y)) {
          return 1;
        } else if (FassungWeitereComponent.getPoemDateFromPoemString(x) < FassungWeitereComponent.getPoemDateFromPoemString(y)) {
          return -1;
        } else {
          if (FassungWeitereComponent.getConvoluteTitleFromPoemString(x) ===
            FassungWeitereComponent.getConvoluteTitleFromPoemString(y)) {
            if (FassungWeitereComponent.getPoemSeqnumFromPoemString(x) > FassungWeitereComponent.getPoemSeqnumFromPoemString(y)) {
              return 1;
            } else if (FassungWeitereComponent.getPoemSeqnumFromPoemString(x) < FassungWeitereComponent.getPoemSeqnumFromPoemString(y)) {
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
}
