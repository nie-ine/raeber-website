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

  @ViewChild('diplomatischKarte')
  diplomatischKarte: ElementRef;

  cardWidth: number;
  pages: Array<any> = [];
  gewaehlteSchicht: string = 'schicht0';
  textIsMovable: boolean = false;
  showPage: Array<boolean>;
  showStufe1: boolean = false;
  showStufe2: boolean = false;

  private sub: any;

  constructor(private http: Http) {};

  ngOnChanges() {
    this.pages = [];
    this.showPage = [];

    if (this.diplomaticIRIs) {
      for (let i = 0; i < this.diplomaticIRIs.length; i++) {
        let seqnum: number;
        this.pages.push({'diplIRI': null, 'pageIRI': null, 'pagenumber': null, 'picData': null, 'origName': null});

        this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/'
          + encodeURIComponent(this.diplomaticIRIs[i]))
          .map(results => results.json())
          .subscribe(res => {
            try {
              seqnum = Number(res.props[ 'http://www.knora.org/ontology/knora-base#seqnum' ].values[ 0 ]);
              this.showPage[ i ] = true;
            } catch (TypeError) {
              console.log('Cannot get seqnum for this page.');
              seqnum = 100;
            }

            try {
              this.pages[seqnum][ 'pageIRI' ]
                = res.props[ 'http://www.knora.org/ontology/text#isDiplomaticTranscriptionOfTextOnPage' ].values[ 0 ];
            } catch (TypeError) {
              console.log('Cannot set IRI of page for this page.');
            }

            try {
              this.pages[seqnum]['diplIRI'] = this.diplomaticIRIs[i];
            } catch (TypeError) {
              console.log('Cannot set IRI of diplomatic transcription for this page.');
            }
          });
      }

    }
    this.gewaehlteSchicht = 'schicht0';
    this.textIsMovable = false;
  }

  ngAfterViewInit() {
    if (this.diplomatischKarte.nativeElement.offsetWidth > 300) {
      this.cardWidth = Math.floor(this.diplomatischKarte.nativeElement.offsetWidth * 0.4);
    } else {
      this.cardWidth = 300;
    }
  }

  addPage(values: any) {
    for (let i = 0; i < this.pages.length; i++) {
      if (values['pageIRI'] === this.pages[i]['pageIRI']) {
        this.pages[i]['pagenumber'] = values['pagenumber'];
        this.pages[i]['picData'] = values['picData'];
        this.pages[i]['origName'] = values['origName'];
      }
    }
  }
}
