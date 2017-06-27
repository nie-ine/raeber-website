/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: ['registerspalte.component.css']
})
export class RegisterspalteComponent {

  rsEntry: Array<any>;

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
      .subscribe((res: Array<any>) => this.rsEntry = res);

    this.konvolut_type = this.route.snapshot.url[0].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params['id'];
    });
  }

  sortAlphabetically() {
    var sortedArray: Array<any> = this.rsEntry.sort((n1,n2) => {
      const k1 = n1.value[2].toLowerCase().replace(/ä/gi, 'a').replace(/ö/gi, 'o').replace(/ü/gi, 'u');
      const k2 = n2.value[2].toLowerCase().replace(/ä/gi, 'a').replace(/ö/gi, 'o').replace(/ü/gi, 'u');
      if (k1 > k2) {
        return 1;
      }

      if (k1 < k2) {
        return -1;
      }

      return 0;
    });

    this.rsEntry = sortedArray;
  }

  sortChronologically() {

  }
}
