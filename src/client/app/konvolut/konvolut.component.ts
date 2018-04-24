/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { DynamicPaging } from '../shared/textgrid/paging.service';
import { ExtendedSearch } from '../shared/utilities/knora-request';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { KonvolutHilfeComponent } from './konvolut-hilfe/konvolut-hilfe.component';
import { CachePoem } from '../shared/textgrid/cache-poem';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html'
})
export class KonvolutComponent implements OnInit {
  konvolut_id: string;
  konvolutTitle: string;
  konvolutBild: string;
  IRI: string;
  output: Subscription;
  poems: Array<CachePoem>;
  responseArray: Array<any>;
  searchContext: boolean = false;
  searchResultsNo: number;
  searchTermArray: Array<string>;
  columns: string;
  rahmen: boolean = true;
  showText: boolean = true;
  gridHeight: number = 0;
  poemIRIArray: Array<any>;
  konvolutType: string;
  resetPoems: string;
  konvolutView = true;

  viewMode: string;
  konvolut_type: string;

  searching = true;

  private sub: any;

  private _esearch = new ExtendedSearch();

  static removeHtml(content: string) {
    if (content !== undefined) {
      return content.replace(/<[^>]+>/g, '');
    } else {
      return undefined;
    }
  }

  constructor(private http: Http, private route: ActivatedRoute, private dp: DynamicPaging, public dialog: MdDialog) {
    this.viewMode = 'grid';

  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'konvolut' ];
      setTimeout(() => {
        if (this.route.snapshot.queryParams[ 'wort' ] !== 'null' && this.route.snapshot.queryParams[ 'wort' ] !== undefined) {
          this.searchTermArray = [];
          this.searchTermArray[ 0 ] = this.route.snapshot.queryParams[ 'wort' ];
        }
        if (this.route.snapshot.queryParams[ 'page' ] !== 'null' && this.route.snapshot.queryParams[ 'page' ] !== undefined) {
          this.searchTermArray[ 1 ] = this.route.snapshot.queryParams[ 'page' ];
        }
      }, 3000);

    });
  }


  loadMore() {
    this.dp.loadText(this._esearch).subscribe(
      konstText => this.poems = this.poems.concat(konstText)
    );
  }

  updateKonvolutTitle(konvolutTitle: string) {
    this.konvolutTitle = konvolutTitle;
  }

  updateKonvolutIRI(konvolutIRI: string) {
    this.IRI = konvolutIRI;
  }

  updateKonvolutBild(konvolutBild: string) {
    this.konvolutBild = konvolutBild;
  }

  /**
   * Reset textgrid layout
   * @param {FormGroup} fg Layout parameters
   */
  setTextgridLayout(fg: any) {
    this.setColumns(fg.colsSetter);
    this.rahmen = fg.frameToggler;
    this.showText = fg.textToggler;
  }

  /**
   * Start search in convolute and enter search result mode
   * @param {FormGroup} fg Search parameters
   */
  searchInConvolute(fg: any) {
    this.searchTermArray = [];
    this.searchResultsNo = 0;
    this.searchTermArray[ 0 ] = fg.searchTerm;
    this.searchTermArray[ 1 ] = fg.page;
  }

  /**
   * Quit search mode
   * @param {boolean} flag Quit search mode
   */
  quitSearchMode(flag: boolean) {
    if (flag) {
      // TODO: Proceed to quit search mode
    }
  }

  setColumns(cols: number) {
    switch (cols) {
      case 1:
        this.columns = '100%';
        break;
      case 2:
        this.columns = '45%';
        break;
      case 3:
        this.columns = '29%';
        break;
    }
  }

  setGridHeight(height: number) {
    this.gridHeight = height;
  }

  updatePoemInformation(poemInformation: Array<CachePoem>) {
    this.poems = [];
    for (let i = 0; i < poemInformation.length; i++) {
      let poem = new CachePoem();
      poem.poemTitle = poemInformation[ i ].poemTitle;
      poem.poemCreationDate = poemInformation[ i ].poemCreationDate;
      poem.poemText = poemInformation[ i ].poemText;
      poem.poemIRI = poemInformation[ i ].poemIRI;
      poem.convoluteTitle = poemInformation[ i ].convoluteTitle;
      //poem[ 5 ] = poemInformation[ i ][ 5 ];
      //poem[ 6 ] = poemInformation[ i ][ 6 ];
      //poem[ 7 ] = poemInformation[ i ][ 7 ];
      poem.seqnum = poemInformation[ i ].seqnum;
      poem.synopsisIRI = poemInformation[ i ].synopsisIRI;
      poem.dateIndex = poemInformation[ i ].dateIndex;
      poem.alphabeticIndex = poemInformation[ i ].alphabeticIndex;
      poem.synopsisTitle = poemInformation[ i ].synopsisTitle;
      poem.onPage = poemInformation[ i ].onPage;
      poem.isFinalVersion = poemInformation[ i ].isFinalVersion;
      //poem[ 15 ] = poemInformation[ i ][ 15 ];

      this.poems[ poemInformation[ i ].seqnum - 1 ] = poem;
    }
  }

  createPoemIRIList(poemIRIList: Array<any>) {
    this.poemIRIArray = poemIRIList;
  }

  updateKonvolutType(konvolutType: string) {
    this.konvolutType = konvolutType;
  }

  deletePoemsInCache() {
    this.resetPoems = 'reset';
  }

  showHelp(): void {
    this.dialog.open(KonvolutHilfeComponent, {
      width: '500px'
    });
  }

  searchingStatus(event: boolean) {
    this.searching = event;
  }
}
