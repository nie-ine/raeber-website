/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse',
  templateUrl: 'synopse.component.html'
})
export class SynopseComponent implements OnInit {

  poemsInSynopse: Array<any> = [];
  nHits: number;
  synopseTag: string;

  showText: boolean;

  columns: string;
  gridHeight: number = 0;
  workIri: string;

  results: number;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, router: Router) {
    this.showText = true;
    this.workIri = router.url.split('/')[ 2 ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.synopseTag = params[ 'synopse' ];
    });

    let searchParamsPrefix = 'http://knora.nie-ine.ch/v1/resources/';
    let searchParamsWork = searchParamsPrefix + encodeURIComponent('http://rdfh.ch/kuno-raeber/' + this.workIri);
    let poemsIri: string[] = [];

    this.route.params
      .switchMap((params: Params) =>
        this.http.get(searchParamsWork))
      .map(response => response.json())
      .subscribe((res: any) => {
        poemsIri = res.props[ 'http://www.knora.org/ontology/work#isExpressedIn' ].values;
        this.results = poemsIri.length;
        poemsIri.forEach(poemIri => {
          console.log(searchParamsPrefix + encodeURIComponent(poemIri));
          this.route.params
            .switchMap((params: Params) =>
              this.http.get(searchParamsPrefix + encodeURIComponent(poemIri)))
            .map(response => response.json())
            .subscribe((res: any) => {
              // FIXME: res should probably be transformed in a form more suitable for textgrid
              this.poemsInSynopse.push(res);
            });
        });
      });
  }

  setColumns(cols: number) {
    switch (cols) {
      case 1:
        this.columns = '93%';
        break;
      case 2:
        this.columns = '43%';
        break;
      case 3:
        this.columns = '26%';
        break;
    }
  }

  setGridHeight(height: number) {
    this.gridHeight = height;
  }

}
