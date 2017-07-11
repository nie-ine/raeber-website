/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/10/17.
 */

import { Component, OnInit } from '@angular/core';
import { FassungKonstTextService } from './fassung-konst-text.service';
import { ActivatedRoute } from '@angular/router';

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
    const _params = {
      'searchtype': 'extended',
      'filter_by_resttype': 'http://www.knora.org/ontology/text#Convolute',
      'property_id': 'http://www.knora.org/ontology/text#hasTitle',
      'compop': '!EQ',
      'searchval': ' ',
      'property_id': 'http://www.knora.org/ontology/text#hasDescription',
      'compop': '!EQ',
      'searchval': ' ',
      'show_nrows': 500
    };
    this.route.snapshot.paramMap.get('fassung');

    this.konstTextService
      .getText(_params)
      .subscribe(
        konstText => this.text = konstText,
        error => this.errorMsg = <any>error
      );

  }
}
