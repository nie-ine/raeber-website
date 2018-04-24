/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CachePoem } from '../shared/textgrid/cache-poem';
import { Text, Work } from '../shared/utilities/iris';
import { KnoraResource } from '../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse',
  templateUrl: 'synopse.component.html'
})
export class SynopseComponent implements OnInit, AfterViewChecked {

  synopseTag: string;

  showText: boolean;

  columns: string;
  gridHeight: number = 0;
  workIri: string;
  workTitle: string;
  poemsIri: string[] = [];

  poems: Array<CachePoem>;
  numberOfShownPoems: number;

  results: number;

  filterFirstLastFlag = false;
  showNotebooks = true;
  showManuscripts = true;
  showTyposcripts = true;
  showDuplicates = false;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, router: Router, private cdr: ChangeDetectorRef) {
    this.showText = true;
    this.workIri = router.url.split('/')[ 2 ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.synopseTag = params[ 'synopse' ];
    });

    this.route.params
      .switchMap(() =>
        this.http.get(new KnoraResource(`http://rdfh.ch/kuno-raeber/${this.workIri}`).toString()))
      .map(response => response.json())
      .subscribe((res: any) => {
        this.poemsIri = res.props[ Work.isExpressedIn ].values;
        this.workTitle = res.props[ Text.hasTitle ].values[ 0 ].utf8str;
      });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  setColumns(cols: number) {
    switch (cols) {
      case 1:
        this.columns = '100%';
        break;
      case 2:
        this.columns = '45%';
        break;
      case 3:
        this.columns = '29%';
        break;
    }
  }

  setGridHeight(height: number) {
    this.gridHeight = height;
  }

  updatePoemInformation(poemInformation: Array<CachePoem>) {
    this.poems = poemInformation;
    this.results = this.poems.length;
  }

  setFilterFirstLast() {
    this.filterFirstLastFlag = !this.filterFirstLastFlag;
  }

  toggleShowNotebooks() {
    this.showNotebooks = !this.showNotebooks;
  }

  toggleShowManuscripts() {
    this.showManuscripts = !this.showManuscripts;
  }

  toggleShowTyposcripts() {
    this.showTyposcripts = !this.showTyposcripts;
  }

  toggleShowDuplicates() {
    this.showDuplicates = !this.showDuplicates;
  }

  setNumberOfShownPoems(n: number) {
    this.numberOfShownPoems = n;
  }

  createNumberOfResultString(): string {
    return 'Anzahl Gedichte: ' + ((this.numberOfShownPoems === this.results) ?
      this.results :
      this.numberOfShownPoems + ' (von total ' + this.results + ')');
  }

}
