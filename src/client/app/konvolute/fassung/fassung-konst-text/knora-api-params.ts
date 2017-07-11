import { Config } from '../../../shared/config/env.config';
/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/11/17.
 */

export interface KnoraAPIParams {
  _host: string;
  _searchtype: string;
  _filterByRestype: string;
  _filterByProject: string;
  _showNRows: number;
  _startAt: number;
  createURI: () => string;
}

export class PropertyParams {

  public createURI = 'property_id=' + encodeURIComponent(this._propertyId) +
    '&compop=' + encodeURIComponent(this._compop) +
    '&searchval=' + encodeURIComponent(this._searchval);

  private _propertyId: string;
  private _compop: string;
  private _searchval: string;

  constructor(readonly propertyId: string, readonly compop: string, readonly searchval: string) {
    this._propertyId = propertyId;
    this._compop = compop;
    this._searchval = searchval;
  }

}

export class FulltextSearch implements KnoraAPIParams {
  set searchstring(v: string) {
    this._searchstring = v;
  }

  set searchtype(v: string) {
    this._searchtype = v;
  }

  set filterByRestype(v: string) {
    this._filterByRestype = v;
  }

  set filterByProject(v: string) {
    this._filterByProject = v;
  }

  set showNRows(v: number) {
    this._showNRows = v;
  }

  set startAt(v: number) {
    this._startAt = v;
  }

  private _host = Config.API;
  private _searchstring: string = '';
  private _searchtype = 'fulltext';
  private _filterByRestype: string = '';
  private _filterByProject: string = '';
  private _showNRows: number = 0;
  private _startAt: number = 0;

  public createURI() {
    return this._host + this._searchstring +
      '?searchtype=' + this._searchtype +
      (this._filterByRestype.length > 0 ? '&filter_by_restype=' + encodeURIComponent(this._filterByRestype) : '') +
      (this._filterByProject.length > 0 ? '&filter_by_project=' + encodeURIComponent(this._filterByProject) : '') +
      (this._showNRows > 0 ? '&show_nrows=' + encodeURIComponent(this._showNRows.toString()) : '') +
      (this._startAt > 0 ? '&start_at=' + encodeURIComponent(this._startAt.toString()) : '');
  }
}

export class ExtendedSearch implements KnoraAPIParams {

  set filterByRestype(v: string) {
    this._filterByRestype = v;
  }

  set filterByProject(v: string) {
    this._filterByProject = v;
  }

  set filterByOwner(v: string) {
    this._filterByOwner = v;
  }

  set property(v: PropertyParams) {
    this._property.push(v);
  }

  set showNRows(v: number) {
    this._showNRows = v;
  }

  set startAt(v: number) {
    this._startAt = v;
  }

  private _host = Config.API;
  private _searchtype = 'extended';
  private _filterByRestype: string = '';
  private _filterByProject: string = '';
  private _filterByOwner: string = '';
  private _property: Array<PropertyParams> = [];
  private _showNRows: number = 0;
  private _startAt: number = 0;

  public createURI() {
    let propString: string = '';
    if (this._property.length > 0) {
      for (let e of this._property) {
        propString += '&';
        propString += encodeURIComponent(e.createURI);
      }
    }
    return this._host +
      '?searchtype=' + this._searchtype +
      (this._filterByRestype.length > 0 ? '&filter_by_restype=' + encodeURIComponent(this._filterByRestype) : '') +
      (this._filterByProject.length > 0 ? '&filter_by_project=' + encodeURIComponent(this._filterByProject) : '') +
      (this._filterByOwner.length > 0 ? '&filter_by_owner=' + encodeURIComponent(this._filterByOwner) : '') +
      propString +
      (this._showNRows > 0 ? '&show_nrows=' + encodeURIComponent(this._showNRows.toString()) : '') +
      (this._startAt > 0 ? '&start_at=' + encodeURIComponent(this._startAt.toString()) : '');
  }

}
