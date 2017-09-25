/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-publikation',
  template: '<span><a [routerLink]="[konvolutTitel]">{{ konvolutTitel }}</a> ({{ konvolutSize}} Gedichte)</span>'
})
export class KonvolutSteckbriefPublikationComponent implements OnChanges {

  @Input() konvolutIRI: string;

  konvolutTitel: string;
  konvolutSize: string;
  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    if (this.konvolutIRI) {
      this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.konvolutIRI))
        .map(response => response.json()).subscribe(res => {

          try {
            this.konvolutTitel = res.props[ 'http://www.knora.org/ontology/work#hasPublicationDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.konvolutTitel = null;
          }

          try {
            this.konvolutSize = res.props[ 'http://www.knora.org/ontology/work#hasPublisherDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.konvolutSize = null;
          }
        });

    }
  }
}
