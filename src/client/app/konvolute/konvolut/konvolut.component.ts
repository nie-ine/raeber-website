/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
      .switchMap((params: Params) => this.http.get('http://172.23.135.247:3333/v1/search/schlaf?searchtype=fulltext'))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.poems = res);

    this.konvolut_type = this.route.snapshot.url[0].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params['id'];

      // In a real app: dispatch action to load the details here.
    });
/*
    // TODO to replace with dynamical requests
    this.http.get('http://test-02.salsah.org/api/search/?searchtype=extended&filter_by_restype=nie-ine:doctor&property_id=nie-ine:hasName')
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);*/
  }

  // for testings
  searchForDoctor(drName: string) {
    this.http.get('http://test-02.salsah.org/api/search/?searchtype=extended&property_id=nie-ine:hasName&compop=EQ&searchval=' + drName)
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log('/search/?searchtype=extended&property_id=nie-ine:hasName&compop=EQ&searchval' + drName);
  }

  // for testings
  freeSearch() {
    this.http.get('http://test-02.salsah.org/api/search/' + this.searchQuery)
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log('/search/' + this.searchQuery);
  }
}
