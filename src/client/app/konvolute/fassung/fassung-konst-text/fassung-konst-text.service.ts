/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/10/17.
 */

import { Injectable } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../shared/config/env.config';

@Injectable()
export class FassungKonstTextService {

  private _knoraUrl = Config.API;

  private static _extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private static _handleError(error: Response | any) {
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

  private static _constrQueryString(params: { [key: string]: string }): string {
    let encParams: string = '?';
    for (let k in params) {
      encParams += k + '=' + encodeURIComponent(params[ k ]) + '&';
    }
    return encParams;
  }

  constructor(private http: Http, private jsonp: Jsonp) {
  }


  getText(params: { [key: string]: string }): Observable<Array<any>> {
    return this.http
      .get(this._knoraUrl + FassungKonstTextService._constrQueryString(params))
      //.map(response => <string[]> response.json()[1])
      //.map(FassungKonstTextService._extractData)
      //.catch(FassungKonstTextService._handleError);
      .map(response => response.json().subjects);
    //.subscribe((res: Array<any>) => this.poems = res);
  }

}
