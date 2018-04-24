/**
 * Created by retobaumgartner on 10.10.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { KunoRaeberGUI, Text } from '../../shared/utilities/iris';
import { equals, exists, ExtendedSearch, KnoraResource } from '../../shared/utilities/knora-api-params';

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
      this.sub = this.http.get(new KnoraResource(this.fassungIRI).toString())
        .map(result => result.json())
        .subscribe(res => {
          let title = res.props[ Text.hasTitle ].values[ 0 ].utf8str.split('/')[ 0 ];
          let iriPart = this.fassungIRI.split('raeber/')[ 1 ];
          this.linkPartPoem = title.replace(/[()]/g, '') + '---' + iriPart;
        });

      this.sub2 = this.http.get(
        new ExtendedSearch()
          .filterByRestype(KunoRaeberGUI.Poem)
          .property(KunoRaeberGUI.hasPoemIri, equals, this.fassungIRI)
          .property(KunoRaeberGUI.hasConvoluteTitle, exists)
          .toString())
        .map(results => results.json())
        .subscribe(res => {
          this.linkPartConv = res.subjects[ 0 ].value[ 1 ];
        });
    }
  }
}
