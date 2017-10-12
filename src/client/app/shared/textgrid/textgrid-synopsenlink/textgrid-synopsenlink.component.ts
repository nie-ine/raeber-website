/**
 * Created by Reto Baumgartner (rfbaumgartner) on 12.10.17.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-textgrid-synopsenlink',
  template: '<a [routerLink]="[\'/synopsen/\' + partialIRI ]">{{ synopsenTitel }}</a>'
})
export class TextgridSynopsenlinkComponent implements OnChanges {
  @Input() workIRI: string;
  partialIRI: string;
  synopsenTitel: string;

  constructor(private http: Http) {}

  ngOnChanges() {
    if(this.workIRI) {
      this.http.get(globalSearchVariableService.API_URL + /resources/ + encodeURIComponent(this.workIRI))
        .map(result => result.json())
        .subscribe( res => {
            try {
              this.synopsenTitel = res.props['http://www.knora.org/ontology/text#hasTitle'].values[0].utf8str;
            } catch (TypeError) {
              this.synopsenTitel = '';
            }
          });

      this.partialIRI = this.workIRI.split('raeber/')[1];
    }
  }
}
