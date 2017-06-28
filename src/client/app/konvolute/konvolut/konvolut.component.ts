/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html'
})
export class KonvolutComponent implements OnInit {

  poems: Array<any>;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

  constructor(private http:Http, private route: ActivatedRoute, private router: Router,) {
  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[0].path;

    this.route.params
      .switchMap((params: Params) => this.http.get('http://172.23.135.247:3333/v1/search/?searchtype=extended&filter_by_restype=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23Convolute&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasTitle&compop=!EQ&searchval=%20&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasDescription&compop=!EQ&searchval=%20&show_nrows=500'))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.poems = res);

    this.konvolut_type = this.route.snapshot.url[0].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params['id'];
    });

    console.log('search/schlaf?searchtype=fulltext');
  }

  // for testings
  searchForDoctor(fulltextQuery: string) {
    this.http.get('http://172.23.135.247:3333/v1/search/' + fulltextQuery + '?searchtype=fulltext')
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log('/search/' + fulltextQuery + '?searchtype=fulltext');
  }

  // for testings
  freeSearch() {
    this.http.get('http://172.23.135.247:3333/v1/search/' + this.searchQuery)
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log('/search/' + this.searchQuery);
  }
}
