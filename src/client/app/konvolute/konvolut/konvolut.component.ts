/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html'
})
export class KonvolutComponent implements OnInit {

  poems: Array<any>;

  // for testings
  searchQuery: string = '';

  constructor(private http:Http) {
    // TODO to replace with dynamical requests
    this.http.get('http://test-02.salsah.org/api/search/?searchtype=extended&filter_by_restype=nie-ine:doctor&property_id=nie-ine:hasName')
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
  }

  ngOnInit() {
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
