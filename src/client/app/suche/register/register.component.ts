/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  selectedTab: string;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.selectedTab = params[ 'id' ];
    });

    console.log('search/schlaf?searchtype=fulltext');
  }




}
