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
import { ExtendedSearch, KnoraProperty } from '../shared/utilities/knora-api-params';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html'
})
export class KonvolutComponent implements OnInit {
  konvolut_id: string;
  konvolutTitle: string;
  konvolutBild: string;
  IRI: string;
  output: Subscription;
  poems: Array<any>;
  responseArray: Array<any>;
  searchContext: boolean = false;
  searchResultsNo: number;
  searchTerm: string;
  columns: string;
  rahmen: boolean = true;
  showText: boolean = true;

  viewMode: string;
  konvolut_type: string;

  private data: Observable<Array<number>>;
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

  updateKonvolutTitle(konvolutTitle: string) {
    this.konvolutTitle = konvolutTitle;
    console.log('Konvolut - Titel: ' + this.konvolutTitle);
  }

  updateKonvolutIRI(konvolutIRI: string) {
    this.IRI = konvolutIRI;
    console.log('IRI: ' + this.IRI);
  }

  updateKonvolutBild(konvolutBild: string) {
    this.konvolutBild = konvolutBild;
    console.log('Konvolutbild: ' + this.konvolutBild);
  }

  /**
   * Reset textgrid layout
   * @param {FormGroup} fg Layout parameters
   */
  setTextgridLayout(fg: FormGroup) {
    this.setColumns(fg.colsSetter);
    this.rahmen = fg.frameToggler;
    this.showText = fg.textToggler;
  }

  /**
   * Start search in convolute and enter search result mode
   * @param {FormGroup} fg Search parameters
   */
  searchInConvolute(fg: FormGroup) {
    // TODO: Implement real search query
    this.searchResultsNo = 0; // TODO: Variable takes number of search results
    this.searchTerm = ''; // TODO: Variable takes search term
  }

  /**
   * Quit search mode
   * @param {boolean} flag Quit search mode
   */
  quitSearchMode(flag: boolean) {
    if (flag) {
      // TODO: Proceed to quit search mode
    }
  }

  setColumns(cols: string) {
    switch (cols) {
      case '1':
        this.columns = '93%';
        break;
      case '2':
        this.columns = '43%';
        break;
      case '3':
        this.columns = '26%';
        break;
    }
  }

}
