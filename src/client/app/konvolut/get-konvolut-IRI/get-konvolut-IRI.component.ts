import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { equals, ExtendedSearch, like } from '../../shared/utilities/knora-request';
import { KunoRaeber, Text } from '../../shared/utilities/iris';

@Component({
  moduleId: module.id,
  selector: 'get-konvolut-iri',
  template: ``
})
export class GetKonvolutIRIComponent implements OnChanges {

  @Input() konvolut_id: string;
  @Output() sendKonvolutTitleBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutIRIBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutBildBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutTypeBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendSearchingStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnChanges() {
    if (this.konvolut_id === 'notizbuch-1979') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemNotebook)
          .property(Text.hasConvoluteTitle, equals, 'Notizbuch 1979')
          .toString());
    } else if (this.konvolut_id === 'notizbuch-1979-1982') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemNotebook)
          .property(Text.hasConvoluteTitle, like, 'Notizbuch 1979-82')
          .toString());
    } else if (this.konvolut_id === 'notizbuch-1980-1988') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemNotebook)
          .property(Text.hasConvoluteTitle, like, 'Notizbuch 1980-88')
          .toString());
    } else if (this.konvolut_id === 'notizbuch-1965-80') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemNotebook)
          .property(Text.hasConvoluteTitle, like, 'Notizbuch 1965-80')
          .toString());
    } else if (this.konvolut_id === 'manuskripte-1979') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemManuscriptConvolute)
          .property(Text.hasConvoluteTitle, like, 'Manuskripte 1979')
          .toString());
    } else if (this.konvolut_id === 'manuskripte-1979-1983') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemManuscriptConvolute)
          .property(Text.hasConvoluteTitle, like, 'Manuskripte 1979-83')
          .toString());
    } else if (this.konvolut_id === 'karten-1984') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemPostcardConvolute)
          .property(Text.hasConvoluteTitle, like, 'Karten 1984')
          .toString());
    } else if (this.konvolut_id === 'typoskripte-1979') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemTypescriptConvolute)
          .property(Text.hasConvoluteTitle, equals, 'Typoskripte 1979')
          .toString());
    }
    if (this.konvolut_id === 'typoskripte-1979-spez') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemTypescriptConvolute)
          .property(Text.hasConvoluteTitle, equals, 'Typoskripte 1979-spez')
          .toString());
    } else if (this.konvolut_id === 'typoskripte-1983') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PoemTypescriptConvolute)
          .property(Text.hasConvoluteTitle, equals, 'Typoskripte 1983')
          .toString());
    } else if (this.konvolut_id === 'gesicht-im-mittag') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Gesicht')
          .toString());
    } else if (this.konvolut_id === 'die-verwandelten-schiffe') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Schiffe')
          .toString());
    } else if (this.konvolut_id === 'gedichte') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'GEDICHTE 1960')
          .toString());
    } else if (this.konvolut_id === 'flussufer') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Flussufer')
          .toString());
    } else if (this.konvolut_id === 'reduktionen') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Reduktionen')
          .toString());
    } else if (this.konvolut_id === 'abgewandt-zugewandt-hochdeutsche-gedichte') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Hochdeutsche')
          .toString());
    } else if (this.konvolut_id === 'abgewandt-zugewandt-alemannische-gedichte') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, 'Alemannische')
          .toString());
    } else if (this.konvolut_id === 'abgewandt-zugewandt-nachwort') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PrintedPoemBookPublication)
          .property(Text.hasConvoluteTitle, like, '(Nachwort)')
          .toString());
    } else if (this.konvolut_id === 'verstreutes') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.PolyAuthorPublicationConvolute)
          .property(Text.hasConvoluteTitle, like, 'Verstreutes')
          .toString());
    } else if (this.konvolut_id === 'tagebuecher') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.DiaryConvolute)
          .property(Text.hasConvoluteTitle, like, 'tagebuecher-2')
          .toString());
    } else if (this.konvolut_id === 'tagebuecher-2') {
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(KunoRaeber.DiaryConvolute)
          .property(Text.hasConvoluteTitle, like, 'Tagebuch')
          .toString());
    } else if (this.konvolut_id) {
      this.sendKonvolutTitleBack.emit('Es gibt kein Konvolut mit diesem Titel');
      this.sendKonvolutIRIBack.emit(undefined);
      this.sendSearchingStatus.emit(false);
    }
  }

  performQuery(queryPart: string) {
    return this.http
      .request(new HttpRequest('GET', queryPart))
      .subscribe((response: any) => {
          if (response instanceof HttpResponse) {
            const data = response.body;
            if (data === undefined || data.subjects.length === 0 ) {
              console.log('no data for query: ' + queryPart );
            } else {
              this.sendKonvolutTitleBack.emit(data.subjects[ 0 ].value[ 1 ]);
              this.sendKonvolutIRIBack.emit(data.subjects[ 0 ].obj_id);
              this.sendKonvolutBildBack.emit(data.subjects[ 0 ].preview_path);
              this.sendKonvolutTypeBack.emit(data.subjects[ 0 ].iconlabel);
              this.sendSearchingStatus.emit(false);
            }
          }
        },
        err => {
          this.sendSearchingStatus.emit(false);
          this.sendKonvolutTitleBack.emit('Es gibt kein Konvolut mit diesem Titel');
        });
  }
}
