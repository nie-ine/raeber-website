import { Config } from '../config/env.config';

/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/11/17.
 */

/**
 * Base abstract class for configuring a request to Knora API
 */
export abstract class KnoraRequest {
  protected _host = Config.API;
  protected abstract _searchtype: string;
  protected abstract _filterByRestype: string;
  protected abstract _filterByProject: string;
  protected abstract _showNRows: number;
  protected abstract _startAt: number;

  /**
   * Serialises string
   */
  public abstract toString(): string;

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

  set host(v: string) {
    this._host = v;
  }
}

/**
 * Helper class for defining a property triple as requested by Knora API
 */
export class KnoraProperty {

  private _propertyId: string;
  private _compop: string;
  private _searchval: string;

  /**
   * Serialises property
   * @returns {string} Formatted string
   */
  public toString() {
    return 'property_id=' + encodeURIComponent(this._propertyId) +
      '&compop=' + encodeURIComponent(this._compop) +
      '&searchval=' + encodeURIComponent(this._searchval);
  }

  constructor(readonly propertyId: string, readonly compop: string, readonly searchval: string) {
    this._propertyId = propertyId;
    this._compop = compop;
    this._searchval = searchval;
  }

}

/**
 * Helper class for configuring a fulltext search request to Knora API
 */
export class FulltextSearch extends KnoraRequest {
  set searchstring(v: string) {
    this._searchstring = v;
  }

  protected _searchstring: string = '';
  protected _searchtype = 'fulltext';
  protected _filterByRestype: string = '';
  protected _filterByProject: string = '';
  protected _showNRows: number = 0;
  protected _startAt: number = 0;

  /**
   * Serialises request
   * @returns {string} Formatted string
   */
  public toString() {
    return this._host + this._searchstring +
      '?searchtype=' + this._searchtype +
      (this._filterByRestype.length > 0 ? '&filter_by_restype=' + encodeURIComponent(this._filterByRestype) : '') +
      (this._filterByProject.length > 0 ? '&filter_by_project=' + encodeURIComponent(this._filterByProject) : '') +
      (this._showNRows > 0 ? '&show_nrows=' + encodeURIComponent(this._showNRows.toString()) : '') +
      (this._startAt > 0 ? '&start_at=' + encodeURIComponent(this._startAt.toString()) : '');
  }
}

/**
 * Helper class configuring an extended search request to Knora API.
 */
export class ExtendedSearch extends KnoraRequest {

  set filterByOwner(v: string) {
    this._filterByOwner = v;
  }

  set property(v: KnoraProperty) {
    this._property.push(v);
  }

  protected _searchtype = 'extended';
  protected _filterByRestype: string = '';
  protected _filterByProject: string = '';
  protected _filterByOwner: string = '';
  protected _property: Array<KnoraProperty> = [];
  protected _showNRows: number = 0;
  protected _startAt: number = 0;

  /**
   * Serialises request
   * @returns {string} Formatted string
   */
  public toString() {
    let propString: string = '';
    if (this._property.length > 0) {
      for (let e of this._property) {
        propString += '&';
        propString += e.toString();
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
