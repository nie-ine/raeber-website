/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Text, Work } from '../../shared/utilities/iris';
import { KnoraResource } from '../../shared/utilities/knora-request';


@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-konvolut',
  template: `
    <span *ngFor="let pub of publications; let i = index">
      {{ pub['title'] }}
      <span *ngIf="i+1 < publications.length">,</span>
    </span>
  `
})
export class FassungSteckbriefKonvolutComponent implements OnChanges {

  @Input() konvolutIRI: Array<string>;

  publications: Array<any>;

  constructor(private http: Http) {}

  ngOnChanges() {
    this.publications = [];

    for (const i in this.konvolutIRI) {
      this.publications.push({ 'title': '', 'type': '', 'alias': '' });
      try {

        this.http.get(new KnoraResource(this.konvolutIRI[ i ]).toString())
          .map(response => response.json()).subscribe(res => {
          this.publications[ i ][ 'title' ] =
            res.props[ (res.resinfo.restype_label === 'poly-author publication' ? Work.hasPublicationTitle : Text.hasConvoluteTitle) ]
              .values[ 0 ].utf8str;
          this.publications[ i ][ 'alias' ] =
            res.resinfo.restype_label === 'poly-author publication' ?
              null :
              res.props[ Text.hasAlias ].values[ 0 ].utf8str;
          this.publications[ i ][ 'type' ] = res.resinfo.restype_label;
        });
      } catch (TypeError) {
        this.publications[ i ][ 'title' ] = null;
        this.publications[ i ][ 'alias' ] = null;
        this.publications[ i ][ 'type' ] = null;
      }
    }
  }
}
