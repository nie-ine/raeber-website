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
  konvolut_map: Map<string, KonvolutObjekt>;

  constructor(http: HttpClient) {
    this.http = http;

    this.konvolut_map = new Map<string, KonvolutObjekt>();
    this.konvolut_map.set('notizbuch-1979', {Restype: KunoRaeber.PoemNotebook, CMP: equals, Title: 'Notizbuch 1979'});
    this.konvolut_map.set('notizbuch-1952-1954', {Restype: KunoRaeber.PoemNotebook, CMP: like, Title: 'Notizbuch 1952-54'});
    this.konvolut_map.set('notizbuch-1979-1982', {Restype: KunoRaeber.PoemNotebook, CMP: like, Title: 'Notizbuch 1979-82'});
    this.konvolut_map.set('notizbuch-1980-1988', {Restype: KunoRaeber.PoemNotebook, CMP: like, Title: 'Notizbuch 1980-88'});
    this.konvolut_map.set('notizbuch-1965-80', {Restype: KunoRaeber.PoemNotebook, CMP: like, Title: 'Notizbuch 1965-80'});
    this.konvolut_map.set('manuskripte-1952', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1952'});
    this.konvolut_map.set('manuskripte-1953', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1953'});
    this.konvolut_map.set('manuskripte-1954', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1954'});
    this.konvolut_map.set('manuskripte-1955', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1955'});
    this.konvolut_map.set('manuskripte-1956', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1956'});
    this.konvolut_map.set('manuskripte-1957', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1957'});
    this.konvolut_map.set('manuskripte-1963', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1963'});
    this.konvolut_map.set('manuskripte-1979', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1979'});
    this.konvolut_map.set('manuskripte-1979-1983', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Manuskripte 1979-83'});
    this.konvolut_map.set('karten-1984', {Restype: KunoRaeber.PoemManuscriptConvolute, CMP: like, Title: 'Karten 1984'});
    this.konvolut_map.set('typoskripte-1979', {Restype: KunoRaeber.PoemTypescriptConvolute, CMP: equals, Title: 'Typoskripte 1979'});
    this.konvolut_map.set('typoskripte-1979-spez', {Restype: KunoRaeber.PoemTypescriptConvolute, CMP: like, Title: 'Typoskripte 1979-spez'});
    this.konvolut_map.set('typoskripte-1983', {Restype: KunoRaeber.PoemTypescriptConvolute, CMP: like, Title: 'Typoskripte 1983'});
    this.konvolut_map.set('gesicht-im-mittag', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Gesicht'});
    this.konvolut_map.set('die-verwandelten-schiffe', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Schiffe'});
    this.konvolut_map.set('gedichte', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'GEDICHTE 1960'});
    this.konvolut_map.set('flussufer', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Flussufer'});
    this.konvolut_map.set('reduktionen', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Reduktionen'});
    this.konvolut_map.set('abgewandt-zugewandt-hochdeutsche-gedichte', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Hochdeutsche'});
    this.konvolut_map.set('abgewandt-zugewandt-alemannische-gedichte', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: 'Alemannische'});
    this.konvolut_map.set('abgewandt-zugewandt-nachwort', {Restype: KunoRaeber.PrintedPoemBookPublication, CMP: like, Title: '(Nachwort)'});
    this.konvolut_map.set('verstreutes', {Restype: KunoRaeber.PolyAuthorPublicationConvolute, CMP: like, Title: 'Verstreutes'});
    this.konvolut_map.set('tagebuecher', {Restype: KunoRaeber.DiaryConvolute, CMP: like, Title: 'tagebuecher-2'});
    this.konvolut_map.set('tagebuecher-2', {Restype: KunoRaeber.DiaryConvolute, CMP: like, Title: 'Tagebuch'});
  }

  ngOnChanges() {

    if (this.konvolut_map.has(this.konvolut_id)) {
      let info = this.konvolut_map.get(this.konvolut_id);
      this.performQuery(
        new ExtendedSearch()
          .filterByRestype(info.Restype)
          .property(Text.hasConvoluteTitle, info.CMP, info.Title)
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


class KonvolutObjekt {
  Title: string;
  Restype: KunoRaeber;
  CMP: any;
}

