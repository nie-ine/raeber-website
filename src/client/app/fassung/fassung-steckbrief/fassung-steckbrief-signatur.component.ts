/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-signatur',
  templateUrl: 'fassung-steckbrief-signatur.component.html'
})
export class FassungSteckbriefSignaturComponent implements OnChanges {

  @Input() carrierIRIs: Array<string>;

  signatures: Array<string>;

  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    this.signatures = [];
    if (this.carrierIRIs) {
      for (let i = 0; i < this.carrierIRIs.length; i++) {
        this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' +
          encodeURIComponent(this.carrierIRIs[ i ]))
          .map(result => result.json())
          .subscribe(res => {
            this.signatures.push(res.props[ 'http://www.knora.org/ontology/work#hasArchiveSignature' ].values[ 0 ].utf8str);
            console.log(res.props[ 'http://www.knora.org/ontology/work#hasArchiveSignature' ].values[ 0 ].utf8str);
          });
      }
    }
  }
}
