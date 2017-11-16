import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import { Router } from '@angular/router';
import { CachePoem } from '../textgrid/cache-poem';

@Component({
  moduleId: module.id,
  selector: 'from-poem-iri-to-textgrid-information',
  templateUrl: 'fromPoemIRIToTextgridInformation.component.html'
})
export class FromPoemIRIToTextgridInformationComponent implements OnChanges {
  @Input() contentType: string;
  @Input() poemIRIArray: Array<any>;
  @Input() konvolutIRI: string;
  @Input() workIRI: string;
  @Output() sendPoemInformationBack: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<CachePoem>;
  i: number;
  countRequests: number;
  poemInformation: Array<CachePoem>;

  constructor(private http: Http, private router: Router) {
  }

  ngOnChanges() {
    if (this.contentType === 'synopse') {
      if (this.workIRI) console.log('Work iri to get Poems with Cache ' + this.workIRI);
      this.poemInformation = [];
      this.countRequests = 0;
      this.performQuery();
    } else {
      //if(this.konvolutIRI) console.log('Konvoluttitle to get Poems with Cache ' + this.konvolutIRI);
      this.poemInformation = [];
      this.countRequests = 0;
      this.performQuery();
    }
    //if (this.poemIRIArray !== undefined && this.poemIRIArray.length !== 0) {
    //  for (this.i = 0; this.i < this.poemIRIArray.length; this.i++) {
    //console.log('get information for this poem:');
    //this.getTitleAndDate(this.poemIRIArray[ this.i ], this.i);
    //    this.poemInformation[ this.i ] = [];
    //  }
    //}
  }

//}

  performQuery() {
    if (this.contentType === 'synopse') {
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent('http://rdfh.ch/kuno-raeber/' + this.workIRI) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSameEditionAs' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&show_nrows=2000'
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            for (this.i = 0; this.i < data.subjects.length; this.i++) {
              this.poemInformation[ this.i ] = new CachePoem();
              this.poemInformation[ this.i ].poemTitle = data.subjects[ this.i ].value[ 7 ]; // poem title
              this.poemInformation[ this.i ].poemCreationDate = data.subjects[ this.i ].value[ 4 ]; // poem creation date
              this.poemInformation[ this.i ].poemText = data.subjects[ this.i ].value[ 6 ]; // poem text
              this.poemInformation[ this.i ].poemIRI = data.subjects[ this.i ].value[ 5 ]; // poem IRI
              this.poemInformation[ this.i ].convoluteTitle = data.subjects[ this.i ].value[ 3 ]; // convolute Title
              this.poemInformation[ this.i ].seqnum = data.subjects[ this.i ].value[ 1 ]; // poem seqnum
              this.poemInformation[ this.i ].sameEdition = data.subjects[ this.i ].value[ 8 ]; // hasSameEditionAs
              if (this.poemInformation[ this.i ].convoluteTitle.includes('Notizbuch')) {
                this.poemInformation[ this.i ].convolutePath = '/notizbuecher/notizbuch-'
                  + this.poemInformation[ this.i ].convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
              } else if (this.poemInformation[ this.i ].convoluteTitle.includes('Manuskripte')) {
                this.poemInformation[ this.i ].convolutePath = '/manuskripte/manuskripte-'
                  + this.poemInformation[ this.i ].convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
              } else if (this.poemInformation[ this.i ].convoluteTitle.includes('Typoskripte 1979-spez')) {
                this.poemInformation[ this.i ].convolutePath = '/typoskripte/typoskripte-1979-spez';
              } else if (this.poemInformation[ this.i ].convoluteTitle.includes('Typoskript')) {
                this.poemInformation[ this.i ].convolutePath = '/typoskripte/typoskripte-'
                  + this.poemInformation[ this.i ].convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
              } else {
                if (this.poemInformation[ this.i ].convoluteTitle === 'GESICHT IM MITTAG 1950') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/gesicht-im-mittag';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Die verwandelten Schiffe 1957') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/die-verwandelten-schiffe';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'GEDICHTE 1960') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/gedichte';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'FLUSSUFER 1963') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/flussufer';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Reduktionen 1981') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/reduktionen';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Hochdeutsche Gedichte 1985') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/abgewandt-zugewandt-hochdeutsche-gedichte';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Alemannische Gedichte 1985') {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/abgewandt-zugewandt-alemannische-gedichte';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Tagebuch') {
                  this.poemInformation[ this.i ].convolutePath = '/material/tagebuecher';
                } else if (this.poemInformation[ this.i ].convoluteTitle === 'Karten 1984') {
                  this.poemInformation[ this.i ].convolutePath = '/manuskripte/karten-1984';
                } else {
                  this.poemInformation[ this.i ].convolutePath = '/drucke/verstreutes';
                }
              }
            }
            this.sendPoemInformationBack.emit(this.poemInformation);
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    } else {
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent(this.konvolutIRI) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
        '&compop=!EQ' +
        '&searchval=GREGORIAN:2217-01-27' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasDateIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasAlphabeticIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
        '&compop=!EQ' +
        '&searchval=123455666' +
/*        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isOnPage' +
        '&compop=!EQ' +
        '&searchval=123455666' +*/
        '&show_nrows=2000'
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            for (this.i = 0; this.i < data.subjects.length; this.i++) {
              this.poemInformation[ this.i ] = new CachePoem();
              this.poemInformation[ this.i ].poemTitle = data.subjects[ this.i ].value[ 9 ];
              this.poemInformation[ this.i ].poemCreationDate = data.subjects[ this.i ].value[ 6 ];
              this.poemInformation[ this.i ].poemText = data.subjects[ this.i ].value[ 8 ];
              this.poemInformation[ this.i ].poemIRI = data.subjects[ this.i ].value[ 7 ];
              this.poemInformation[ this.i ].alphabeticIndex = data.subjects[ this.i ].value[ 2 ];
              this.poemInformation[ this.i ].dateIndex = data.subjects[ this.i ].value[ 5 ];
              this.poemInformation[ this.i ].seqnum = data.subjects[ this.i ].value[ 1 ];
              this.poemInformation[ this.i ].synopsisIRI = data.subjects[ this.i ].value[ 10 ];
              this.poemInformation[ this.i ].synopsisTitle = data.subjects[ this.i ].value[ 11 ];
              this.poemInformation[ this.i ].isFinalVersion = data.subjects[ this.i ].value[ 12 ];
              this.poemInformation[ this.i ].onPage = data.subjects[ this.i ].value[ 13 ];
              this.poemInformation[ this.i ].convoluteTitle = data.subjects[ this.i ].value[ 4 ];
              this.poemInformation[ this.i ].isVisible = false;
            }
            this.sendPoemInformationBack.emit(this.poemInformation);
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    }
  }
}
