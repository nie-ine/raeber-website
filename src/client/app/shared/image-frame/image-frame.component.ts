import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-image-frame',
  templateUrl: 'image-frame.component.html',
  styleUrls: [ 'image-frame.component.css' ]
})

export class ImageFrameComponent implements OnInit {

  @Input() images_in_grid: Array<any>;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  myImages: Array<any>;
  zoomfactor = 5;
  heightAndWidth = 100;
  height = 200;
  width = 200;
  overflow = 'auto';
  resize = 'both';
  px = 'px';

  ausgeklappt: boolean = true;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
  }

  searchForDoctor() {
    return this.http.get('http://test-02.salsah.org/api/search/?searchtype=extended&property_id%5B%5D=439&compop%5B%5D=!EQ&searchval%5B%5D=&show_nrows=25&' +
      'start_at=0&progvalfile=prog_63047.salsah&filter_by_restype=100')
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          //console.log(JSON.stringify(data.subjects, null, 4));
          return data.subjects;
        }
      )
      .subscribe(response => this.myImages = response);
  }

  increaseSize() {
    if (this.zoomfactor > 2) {
      this.zoomfactor -= 1;
    } else {
      window.alert('Picture reached maximum quality');
    }
  }


  reduceSize() {
    if (this.zoomfactor < 5) {
      this.zoomfactor += 1;
    } else {
      window.alert('Picture reached minimum quality');
    }
  }

  increaseFrameSize() {
    this.height += 200;
    this.width += 200;
    this.pictureIncreased.emit(null);
  }

  reduceFrameSize() {
    this.height -= 200;
    this.width -= 200;
    this.pictureReduced.emit(null);
  }

  resetSize() {
    this.height = 200;
    this.width = 200;
    this.zoomfactor = 5;
  }


}
