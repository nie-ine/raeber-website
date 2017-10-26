import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'get-konvolut-iri',
  templateUrl: 'get-konvolut-IRI.component.html'
})
export class GetKonvolutIRIComponent implements OnChanges {

  @Input() konvolut_id: string;
  @Output() sendKonvolutTitleBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutIRIBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutBildBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutTypeBack: EventEmitter<any> = new EventEmitter<any>();

  responseArray: Array<any>;
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  ngOnChanges() {
    //console.log('Get IRI Component for Konvolut - ID: ' + this.konvolut_id);
    //**
    // Notizbuch 1979
    // TODO: Steckbrief etc.
    // */
    if (this.konvolut_id === 'notizbuch-1979') {
      this.performQuery(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Notizbuch%201979');
    } else if (this.konvolut_id === 'notizbuch-1979-1982') {
      this.performQuery(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201979-82');
    } else if (this.konvolut_id === 'notizbuch-1980-1988') {
      this.performQuery(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201980-88');
    } else if (this.konvolut_id === 'notizbuch-1965-80') {
      this.performQuery(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201965-80');
    } else if (this.konvolut_id === 'manuskripte-1979') {
      this.performQuery(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979');
    } else if (this.konvolut_id === 'manuskripte-1979-1983') {
      this.performQuery(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979-83');
    } else if (this.konvolut_id === 'karten-1984') {
      this.performQuery(
        '%23PoemPostcardConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984');
    } else if (this.konvolut_id === 'karten-1984') {
      this.performQuery(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984');
    } else if (this.konvolut_id === 'typoskripte-1979') {
      this.performQuery(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979');
    }
    if (this.konvolut_id === 'typoskripte-1979-spez') {
      this.performQuery(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979-spez');
    } else if (this.konvolut_id === 'typoskripte-1983') {
      this.performQuery(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201983');
    } else if (this.konvolut_id === 'gesicht-im-mittag') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=gesicht');
    } else if (this.konvolut_id === 'die-verwandelten-schiffe') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Schiffe');
    } else if (this.konvolut_id === 'gedichte') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=GEDICHTE%201960');
    } else if (this.konvolut_id === 'flussufer') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Flussufer');
    } else if (this.konvolut_id === 'reduktionen') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Reduktionen');
    } else if (this.konvolut_id === 'abgewandt-zugewandt-hochdeutsche-gedichte') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Hochdeutsche');
    } else if (this.konvolut_id === 'abgewandt-zugewandt-alemannische-gedichte') {
      this.performQuery(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Alemannische');
    } else if (this.konvolut_id === 'verstreutes') {
      this.performQuery(
        '%23PolyAuthorPublicationConvolute' +
        '&property_id=http%3A%2F%2Fwwgit pullw.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Verstreutes');
    } else if (this.konvolut_id === 'tagebuecher') {
      this.performQuery(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch');
    } else if (this.konvolut_id === 'tagebuecher-2') {
      this.performQuery(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch');
    } else {
      this.sendKonvolutTitleBack.emit('Es gibt kein Konvolut mit diesem Titel');
      this.sendKonvolutIRIBack.emit(undefined);
    }
  }

  performQuery(queryPart: string) {
    //console.log('Klicked on Menu: ' + this.konvolut_id);
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      queryPart
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          if(data.subjects[ 0 ]!== undefined) {
            this.sendKonvolutTitleBack.emit(data.subjects[ 0 ].value[ 1 ]);
            this.sendKonvolutIRIBack.emit(data.subjects[ 0 ].obj_id);
            this.sendKonvolutBildBack.emit(data.subjects[ 0 ].preview_path);
            this.sendKonvolutTypeBack.emit(data.subjects[ 0 ].iconlabel);
          }
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
}
