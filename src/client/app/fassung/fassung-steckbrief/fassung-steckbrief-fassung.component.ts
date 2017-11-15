/**
 * Created by retobaumgartner on 10.10.17.
 */
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-fassung',
  template: '<a [routerLink]="[\'/\' + linkPartConv + \'/\' + linkPartPoem]">{{ linkText }}</a>'
})
export class FassungSteckbriefFassungComponent implements OnChanges {

  @Input() fassungIRI: string;
  @Input() linkText: string;

  linkPartPoem: string;
  linkPartConv: string;

  private sub: any;
  private sub2: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    if (this.fassungIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' +
        encodeURIComponent(this.fassungIRI))
        .map(result => result.json())
        .subscribe(res => {
          let title = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str.split('/')[ 0 ];
          let iriPart = this.fassungIRI.split('raeber/')[ 1 ];
          this.linkPartPoem = title + '---' + iriPart;
        });

      this.sub2 = this.http.get(globalSearchVariableService.API_URL + '/search/'
        + '?searchtype=extended'
        + '&filter_by_restype=' + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#Poem')
        + '&property_id=' + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#hasPoemIRI')
        + '&compop=EQ'
        + '&searchval=' + encodeURIComponent(this.fassungIRI)
        + '&property_id=' + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#hasConvoluteTitle')
        + '&compop=EXISTS'
        + '&searchval=')
        .map(results => results.json())
        .subscribe(res => {
          this.linkPartConv = res.subjects[ 0 ].value[ 1 ];
        });
    }
  }
}
