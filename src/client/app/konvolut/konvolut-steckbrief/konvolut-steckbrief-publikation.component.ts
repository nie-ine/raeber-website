/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { ExtendedSearch, KnoraProperty } from '../../shared/utilities/knora-api-params';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-publikation',
  template: '<span><a [routerLink]="[\'/\' + konvolutTitel]">{{ konvolutTitel }}</a> ({{ konvolutSize}} Gedichte)</span>{{res}}'
})
export class KonvolutSteckbriefPublikationComponent implements OnChanges {

  @Input() konvolutIRI: string;

  konvolutTitel: string;
  konvolutSize: string;
  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute) {}

  ngOnChanges() {
    if (this.konvolutIRI) {
      this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.konvolutIRI))
        .map(response => response.json()).subscribe(res => {

          try {
            this.konvolutTitel = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.konvolutTitel = null;
          }

          try {
            let searchParams = new ExtendedSearch();
            searchParams.property = new KnoraProperty('http://www.knora.org/ontology/work#isPublishedIn', 'EQ', this.konvolutIRI);
            searchParams.showNRows = 500;

            this.route.params
              .switchMap((params: Params) =>
                this.http.get(searchParams.toString()))
              .map(response => response.json())
              .subscribe((res: any) => {
                this.konvolutSize = res.subjects.length;
              });
          } catch (TypeError) {
            this.konvolutSize = null;
          }
        });

    }
  }
}
