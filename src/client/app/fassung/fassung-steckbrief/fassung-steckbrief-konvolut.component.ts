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

  constructor(private http: Http) {}

  ngOnChanges() {
    this.publications = [];

    for (const i in this.konvolutIRI) {
      this.publications.push({ 'title': '', 'type': '', 'alias': '' });
      try {

        this.http.get(globalSearchVariableService.API_URL + '/resources/' + encodeURIComponent(this.konvolutIRI[ i ]))
          .map(response => response.json()).subscribe(res => {
          this.publications[ i ][ 'title' ] =
            res.props[ 'http://www.knora.org/ontology/' +
            (res.resinfo.restype_label === 'poly-author publication' ? 'work#hasPublicationTitle' : 'text#hasConvoluteTitle') ]
              .values[ 0 ].utf8str;
          this.publications[ i ][ 'alias' ] =
            res.resinfo.restype_label === 'poly-author publication' ?
              null :
              res.props[ 'http://www.knora.org/ontology/text#hasAlias' ].values[ 0 ].utf8str;
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
