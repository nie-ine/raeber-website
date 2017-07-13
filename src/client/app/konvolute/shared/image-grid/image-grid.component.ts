import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-image-grid',
  templateUrl: 'image-grid.component.html'
})

export class ImageGridComponent implements OnInit {

  @Input() images_in_grid: Array<any>;

  myImages: Array<any>;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[0].path;
    }

  searchForDoctor() {
    return this.http.get('http://test-02.salsah.org/api/search/?searchtype=extended&property_id%5B%5D=439&compop%5B%5D=!EQ&searchval%5B%5D=&show_nrows=25&start_at=0&progvalfile=prog_63047.salsah&filter_by_restype=100')
      .map(
        (response: Response) => {
          const data = response.json();
          console.log(data);
          //console.log(JSON.stringify(data.subjects, null, 4));
          var i = 0;
          var len = data.subjects.length;
          for (; i < len;) {
            //console.log(data.subjects[i].obj_id);
            i++;
          }
          return data.subjects;
      }
      )
      .subscribe(response => this.myImages = response);
  }




}
