/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/12/17.
 */

import { Injectable } from '@angular/core';
import { KnoraRequest } from './knora-api-params';
import { Observable } from 'rxjs/Observable';
import { Http, Jsonp } from '@angular/http';

@Injectable()
export class DynamicPaging {
  private _offset = 0;
  private _size = 20;

  constructor(private http: Http, private jsonp: Jsonp) {
  }

  set size(v: number) {
    this._size = v;
  }

  get size(): number {
    return this._size;
  }

  loadText(req: KnoraRequest): Observable<Array<any>> {
    req.showNRows = this._size;
    req.startAt = this._offset;
    this._offset = this._offset + this._size;
    return this.getText(req);
  }

  getText(params: KnoraRequest): Observable<Array<any>> {
    return this.http
      .get(params.toString())
      .map(response => response.json().subjects);
  }

}
