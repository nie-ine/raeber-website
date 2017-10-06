/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Component, ElementRef, EventEmitter, Input, Output, OnChanges, AfterViewInit, ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent implements OnChanges, AfterViewInit {

  @Input() pageIRIs: any;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  cardWidth: number;
  pages: Array<any> = new Array();
  gewaehlteSchicht: string = 'schicht0';

  private sub: any;

  ngOnChanges() {
    this.pages = [];
  }

  ngAfterViewInit() {
    if (this.diplomatischKarte.nativeElement.offsetWidth > 300) {
      this.cardWidth = Math.floor(this.diplomatischKarte.nativeElement.offsetWidth * 0.4);
    } else {
      this.cardWidth = 300;
    }
  }

  @ViewChild('diplomatischKarte')
  diplomatischKarte: ElementRef;

  addPage(values: Array<string>) {
    this.pages.push(values);
    this.sortPages();
    console.log(this.pages);
  }

  // TODO: sort pages by seqnum, find picture id and transcription id per page.
  sortPages() {
    this.pages = this.pages.sort((n1, n2) => {
      const k1 = n1.value[ 'pagenumber' ];
      const k2 = n2.value[ 'pagenumber' ];
      if (k1 > k2) {
        return 1;
      }

      if (k1 < k2) {
        return -1;
      }

      return 0;
    });
  }
}
