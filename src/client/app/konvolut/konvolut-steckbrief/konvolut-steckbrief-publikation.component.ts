/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { equals, ExtendedSearch, KnoraResource } from '../../shared/utilities/knora-api-params';
import { ActivatedRoute } from '@angular/router';
import { Text, Work } from '../../shared/utilities/iris';


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
        this.sub = this.http.get(new KnoraResource(this.konvolutIRI[ i ]).toString())
          .map(response => response.json()).subscribe(res => {
            this.publications[ i ][ 'title' ] = res.props[ Text.hasConvoluteTitle ].values[ 0 ].utf8str;
            this.publications[ i ][ 'alias' ] = res.props[ Text.hasAlias ].values[ 0 ].utf8str;
          });
      } catch (TypeError) {
        this.publications[ i ][ 'title' ] = null;
        this.publications[ i ][ 'alias' ] = null;
      }

      try {
        const searchParams = new ExtendedSearch()
          .property(Work.isPublishedIn, equals, this.konvolutIRI[ i ])
          .showNRows(500)
          .toString();

        this.route.params
          .switchMap(() =>
            this.http.get(searchParams))
          .map(response => response.json())
          .subscribe((res: any) => {
            this.publications[ i ][ 'size' ] = res.subjects.length;
          });
      } catch (TypeError) {
        this.publications[ i ][ 'size' ] = null;
      }
    }
  }
}
