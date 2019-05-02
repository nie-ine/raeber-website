import { Config } from '../config/env.config';
import { Human, KnoraBase, KunoRaeber, KunoRaeberGUI, Text, Work , TextEditing} from './iris';

type OntologyProps
  = Human
  | KunoRaeber
  | KunoRaeberGUI
  | KnoraBase
  | Text
  | Work
  | TextEditing;

type Compop = (prop: OntologyProps, val?: string) => string;

export const equals: Compop =
  (prop: OntologyProps, val: string) => `property_id=${encodeURIComponent(prop)}&compop=EQ&searchval=${encodeURIComponent(val)}`;
export const exists: Compop =
  (prop: OntologyProps) => `property_id=${encodeURIComponent(prop)}&compop=EXISTS&searchval=`;
export const like: Compop =
  (prop: OntologyProps, val: string) => `property_id=${encodeURIComponent(prop)}&compop=LIKE&searchval=${encodeURIComponent(val)}`;
export const notEquals: Compop =
  (prop: OntologyProps, val: string) => `property_id=${encodeURIComponent(prop)}&compop=!EQ&searchval=${encodeURIComponent(val)}`;


export abstract class KnoraRequest {
  protected abstract _endpoint: string;

  public abstract toString(): string;
}

export class KnoraResource extends KnoraRequest {
  protected _endpoint = `${Config.API}/resources/`;
  private readonly _iri: string;

  constructor(id: string) {
    super();
    this._iri = this._endpoint + encodeURIComponent(id);
  }

  toString(): string {
    return this._iri;
  }
}

export class PropertyListsQuery extends KnoraRequest {
  protected _endpoint = `${Config.API}/propertylists/`;
  private _iri: string;

  constructor(id: string) {
    super();
    this._iri = this._endpoint + encodeURIComponent(id);
    return this;
  }

  toString(): string {
    return this._iri;
  }
}

export class GraphDataQuery extends KnoraRequest {
  protected _endpoint = `${Config.API}/graphdata/`;
  private readonly _iri: string;
  private _depth = '1';

  constructor(id: string) {
    super();
    this._iri = this._endpoint + encodeURIComponent(id);
    return this;
  }

  depth(level: number) {
    this._depth = level.toString();
    return this;
  }

  toString(): string {
    return this._iri + '?depth=' + this._depth;
  }
}

export abstract class KnoraQuery extends KnoraRequest {
  protected _endpoint = `${Config.API}/search/`;
  protected abstract _searchtype: string;
  protected _filterByRestype: string;
  protected _filterByProject: string;
  protected _showNRows: string;
  protected _startAt: string;

  public abstract toString(): string;

  filterByRestype(v: OntologyProps) {
    this._filterByRestype = encodeURIComponent(v);
    return this;
  }

  filterByProject(v: string) {
    this._filterByProject = encodeURIComponent(v);
    return this;
  }

  showNRows(v: number) {
    this._showNRows = v.toString();
    return this;
  }

  startAt(v: number) {
    this._startAt = v.toString();
    return this;
  }

}

export class FulltextSearch extends KnoraQuery {

  protected _searchstring: string = '';
  protected _searchtype = 'fulltext';

  searchstring(v: string) {
    this._searchstring = encodeURIComponent(v);
    return this;
  }

  public toString() {
    return this._endpoint + this._searchstring +
      '?searchtype=' + this._searchtype +
      (this._filterByRestype ? `&filter_by_restype=${this._filterByRestype}` : '') +
      (this._filterByProject ? `&filter_by_project=${this._filterByProject}` : '') +
      (this._showNRows ? `&show_nrows=${this._showNRows}` : '') +
      (this._startAt ? `&start_at=${this._startAt}` : '');
  }
}

export class ExtendedSearch extends KnoraQuery {

  protected _searchtype = 'extended';
  protected _filterByOwner: string;
  protected _property: string = '';

  filterByOwner(v: string) {
    this._filterByOwner = v;
    return this;
  }

  property(k: OntologyProps, predicate: Compop, v?: string) {
    this._property += (`&${predicate(k, v)}`);
    return this;
  }

  public toString() {
    return this._endpoint +
      '?searchtype=' + this._searchtype +
      (this._filterByRestype ? `&filter_by_restype=${this._filterByRestype}` : '') +
      (this._filterByProject ? `&filter_by_project=${this._filterByProject}` : '') +
      (this._filterByOwner ? `&filter_by_owner=${this._filterByOwner}` : '') +
      this._property +
      (this._showNRows ? `&show_nrows=${this._showNRows}` : '') +
      (this._startAt ? `&start_at=${this._startAt}` : '');
  }

}
