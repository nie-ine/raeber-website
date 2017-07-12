/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/12/17.
 */

import { Injectable } from '@angular/core';
import { KnoraAPIParams } from './knora-api-params';
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

  loadMore(req: KnoraAPIParams): Observable<Array<any>> {
    req.showNRows = this._size;
    req.startAt = this._offset;
    this._offset = this._offset + this._size;
    return this.getText(req);
  }

  getText(params: KnoraAPIParams): Observable<Array<any>> {
    return this.http
      .get(params.createURI())
      //.map(response => <string[]> response.json()[1])
      //.map(FassungKonstTextService._extractData)
      //.catch(FassungKonstTextService._handleError);
      .map(response => response.json().subjects);
    //.subscribe((res: Array<any>) => this.poems = res);
  }

}
