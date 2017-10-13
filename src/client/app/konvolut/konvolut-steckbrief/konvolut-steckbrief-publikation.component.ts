/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { ExtendedSearch, KnoraProperty } from '../../shared/utilities/knora-api-params';
import { ActivatedRoute, Params } from '@angular/router';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-publikation',
  templateUrl: 'konvolut-steckbrief-publikation.component.html'
})
export class KonvolutSteckbriefPublikationComponent implements OnChanges {

  @Input() konvolutIRI: string;

  publications: Array<any>;
  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute) {}

  ngOnChanges() {
    this.publications = [];

    for (let i = 0; i < this.konvolutIRI.length; i++) {
      this.publications.push({ 'title': '', 'size': '', 'alias': '' });

      try {
        this.sub = this.http.get(globalSearchVariableService.API_URL
          + '/resources/' + encodeURIComponent(this.konvolutIRI[ i ]))
          .map(response => response.json()).subscribe(res => {
            this.publications[ i ][ 'title' ] = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ].utf8str;
            this.publications[ i ][ 'alias' ] = res.props[ 'http://www.knora.org/ontology/text#hasAlias' ].values[ 0 ].utf8str;
          });
      } catch (TypeError) {
        this.publications[ i ][ 'title' ] = null;
        this.publications[ i ][ 'alias' ] = null;
      }

      try {
        let searchParams = new ExtendedSearch();
        searchParams.property = new KnoraProperty('http://www.knora.org/ontology/work#isPublishedIn', 'EQ', this.konvolutIRI[ i ]);
        searchParams.showNRows = 500;

        this.route.params
          .switchMap((params: Params) =>
            this.http.get(searchParams.toString()))
          .map(response => response.json())
          .subscribe((res: any) => {
            this.publications[ i ][ 'size' ] = res.subjects.length;
            console.log(res);
          });
      } catch (TypeError) {
        this.publications[ i ][ 'size' ] = null;
      }
    }
  }
}
