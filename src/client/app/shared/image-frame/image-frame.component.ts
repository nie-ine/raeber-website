import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
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

export class ImageFrameComponent implements OnInit {

  @Input() pictureData: any;
  @Input() initWidth: number;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  pictureIdBase: string;

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

  ngOnInit() {
    this.pictureIdBase = this.pictureData.path.split(this.pictureData.nx + ',' + this.pictureData.ny)[0];
    this.width = this.initWidth;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx );
  }

  increaseFrameSize() {
    this.width += 40;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx );
    this.pictureIncreased.emit(null);
  }

  reduceFrameSize() {
    this.width -= 40;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx );
    this.pictureReduced.emit(null);
  }

  resetSize() {
    this.ngOnInit();
  }


}
