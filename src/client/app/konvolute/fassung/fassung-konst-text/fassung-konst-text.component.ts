/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/10/17.
 */

import { Component, OnInit } from '@angular/core';
import { FassungKonstTextService } from './fassung-konst-text.service';
import { ActivatedRoute } from '@angular/router';
import { ExtendedSearch, KnoraProperty } from '../../shared/knora-api-params';

const _expressions: { [key: string]: string } = {
  'notizbuecher': 'http://www.knora.org/ontology/text#Note',
  'manuskripte': 'http://www.knora.org/ontology/text#Manuscript',
  'typoskripte': 'http://www.knora.org/ontology/text#Typescript',
  'drucke': 'http://www.knora.org/ontology/text#Print'
};

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-konsttext',
  templateUrl: 'fassung-konst-text.component.html',
  providers: [ FassungKonstTextService ]
})
export class FassungKonstTextComponent implements OnInit {

  text: Array<any>;
  errorMsg: any;

  constructor(private konstTextService: FassungKonstTextService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let searchParams = new ExtendedSearch;
    searchParams.filterByRestype = _expressions[ this.route.snapshot.url[ 0 ].path ];
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', '!EQ', ' ');
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasDescription', '!EQ', ' ');
    searchParams.showNRows = 500;

    this.route.snapshot.paramMap.get('fassung');

    this.konstTextService
      .getText(searchParams)
      .subscribe(
        konstText => this.text = konstText,
        error => this.errorMsg = <any>error
      );

  }
}
