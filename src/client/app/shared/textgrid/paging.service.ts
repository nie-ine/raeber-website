import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { KnoraQuery } from '../utilities/knora-api-params';

@Injectable()
export class DynamicPaging {
  private _offset = 0;
  private _size = 20;

  constructor(private http: Http) {
  }

  get size(): number {
    return this._size;
  }

  set size(v: number) {
    this._size = v;
  }

  loadText(req: KnoraQuery): Observable<Array<any>> {
    req
      .showNRows(this._size)
      .startAt(this._offset);
    this._offset = this._offset + this._size;
    return this.getText(req);
  }

  getText(params: KnoraQuery): Observable<Array<any>> {
    return this.http
      .get(params.toString())
      .map(response => response.json().subjects);
  }

}
