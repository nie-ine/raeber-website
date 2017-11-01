/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import '../operators';

@Component({
  moduleId: module.id,
  selector: 'rae-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  // title = 'Titelregister';

  selectedTab: string;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.selectedTab = params[ 'zeitraum' ];
    });

    // console.log('Titelregister ' + this.selectedTab);
  }


}
