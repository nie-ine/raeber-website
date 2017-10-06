import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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

export class ImageFrameComponent {

  @Input() pictureID: string;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  zoomfactor = 5;
  heightAndWidth = 100;
  height = 200;
  width = 200;
  overflow = 'auto';
  resize = 'both';
  px = 'px';

  ausgeklappt: boolean = true;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
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
