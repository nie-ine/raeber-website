/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { DynamicPaging } from '../shared/textgrid/paging.service';
import { ExtendedSearch, FulltextSearch, KnoraProperty } from '../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html',
  styleUrls: ['konvolut.component.css']
})
export class KonvolutComponent implements OnInit {

  poems: Array<any>;

  viewMode: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

  private _esearch = new ExtendedSearch();

  constructor(private http: Http, private route: ActivatedRoute, private dp: DynamicPaging) {
    this.viewMode = 'grid';

    window.onscroll = () => {
      let windowHeight = 'innerHeight' in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      let body = document.body, html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight,
        body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
      let windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.loadMore();
      }
    };
  }

  ngOnInit() {
    this._esearch.filterByRestype = 'http://www.knora.org/ontology/text#Convolute';
    this._esearch.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', '!EQ', ' ');
    this._esearch.property = new KnoraProperty('http://www.knora.org/ontology/text#hasDescription', '!EQ', ' ');
    this.dp.size = 10;
    this.dp.loadText(this._esearch).subscribe(
      konstText => this.poems = konstText
    );

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'konvolut' ];
    });
  }

  loadMore() {
    this.dp.loadText(this._esearch).subscribe(
      konstText => this.poems = this.poems.concat(konstText)
    );
  }
}
