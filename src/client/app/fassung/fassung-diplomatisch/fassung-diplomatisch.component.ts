/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent implements OnChanges, AfterViewInit {

  @Input() diplomaticIRIs: any;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  cardWidth: number;
  pages: Array<any> = [];
  gewaehlteSchicht: string = 'schicht0';

  private sub: any;

  constructor(private http: Http) {};

  ngOnChanges() {
    this.pages = [];

    if (this.diplomaticIRIs) {
      for (let i = 0; i < this.diplomaticIRIs.length; i++) {
        let page = {
          'diplIRI': this.diplomaticIRIs[i],
          'pageIRI': '',
          'pagenumber': '',
          'picData': ''
        };

        this.sub = this.http.get(globalSearchVariableService.API_URL + /resources/
          + encodeURIComponent(this.diplomaticIRIs[i]))
          .map(results => results.json())
          .subscribe(res => {
            try {
              page['pageIRI'] = res.props['http://www.knora.org/ontology/text#isDiplomaticTranscriptionOfTextOnPage'].values[0];
              console.log(page['pageIRI']);
            } catch (TypeError) {
              page[ 'pageIRI' ] = '';
            }
          });

        this.pages.push(page);
      }

    }
  }

  @ViewChild('diplomatischKarte')
  diplomatischKarte: ElementRef;

  ngAfterViewInit() {
    if (this.diplomatischKarte.nativeElement.offsetWidth > 300) {
      this.cardWidth = Math.floor(this.diplomatischKarte.nativeElement.offsetWidth * 0.4);
    } else {
      this.cardWidth = 300;
    }
  }

  addPage(values: any) {
    for (let i = 0; i < this.pages.length; i++) {
      if (values['pageIRI'] = this.pages[i]['pageIRI']) {
        this.pages[i]['pagenumber'] = values['pagenumber'];
        this.pages[i]['picData'] = values['picData'];
      }
    }
  }

  // TODO kann nicht sortieren, wenn alle Seiten alle Nummern haben.
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
