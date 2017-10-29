/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-signatur',
  template: '<span>{{ signature }}</span>'
})
export class FassungSteckbriefSignaturComponent implements OnChanges {

  @Input() carrierIRI: string;

  signature: string;

  private sub: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    this.signature = '';
    if (this.carrierIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' +
        encodeURIComponent(this.carrierIRI))
        .map(result => result.json())
        .subscribe(res => {
          this.signature = res.props[ 'http://www.knora.org/ontology/work#hasArchiveSignature' ].values[ 0 ].utf8str;
        });
    }
  }
}
