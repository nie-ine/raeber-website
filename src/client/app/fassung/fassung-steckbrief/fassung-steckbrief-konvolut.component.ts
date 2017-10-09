/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-konvolut',
  templateUrl: 'fassung-steckbrief-konvolut.component.html'
})
export class FassungSteckbriefKonvolutComponent implements OnChanges {

  @Input() konvolutIRI: Array<string>;

  publications: Array<any>;
  konvolutTypeMap = {
    'poem notebook': 'notizbuecher',
    'poem manuscript convolute': 'manuskripte',
    'poem typescript convolute': 'typoskripte',
    'poem typescript convolute with image': 'typoskripte',
    'printed poem book publication': 'drucke',
    'poly-author publication convolute': 'drucke',
    'poem postcard convolute': 'manuskripte',
    'diary convolute': 'material',
    'letter convolute': 'material'
  };
  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    this.publications = [];

    for (let i = 0; i < this.konvolutIRI.length; i++) {
      this.publications.push({'title': '', 'type': '', 'alias': ''});

      try {
        this.sub = this.http.get(globalSearchVariableService.API_URL
          + '/resources/' + encodeURIComponent(this.konvolutIRI[i]))
          .map(response => response.json()).subscribe(res => {
            this.publications[i]['title'] = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ].utf8str;
            this.publications[i]['alias'] = res.props['http://www.knora.org/ontology/text#hasAlias'].values[0].utf8str;
            this.publications[i]['type'] = res.resinfo.restype_label;

          });
      } catch (TypeError) {
        this.publications[i]['title'] = null;
        this.publications[i]['alias'] = null;
        this.publications[i]['type'] = null;
      }
    }
  }
}
