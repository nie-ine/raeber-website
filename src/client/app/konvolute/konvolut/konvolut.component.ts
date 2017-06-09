/**
 * Created by retobaumgartner on 06.06.17.
 */
import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html',
  styleUrls: ['konvolut.component.css']
})
export class KonvolutComponent implements OnInit {

  selectedView: string = 'list';

  result: Array<Object>;// = [{'title':'Baum'},{'title':'Einleitung'}];

  viewOptions = [
    {
      name: 'list',
      title: 'List',
      isDisabled: false,
      icon: 'view_headline'
    },
    {
      name: 'grid',
      title: 'Grid',
      isDisabled: false,
      icon: 'view_module'
    }
  ];

  cols: number = 3;
  resource: string = undefined;

  constructor(http: Http) {
    http.get('http://test-02.salsah.org/api/resources/2659076')
      .map(res => res.json())
      .subscribe(poems => this.result = poems);
  }

  ngOnInit() {

  }

  openResource($event) {
    this.resource = $event.id;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
