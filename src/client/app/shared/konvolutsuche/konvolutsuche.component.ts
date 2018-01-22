import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolutsuche',
  templateUrl: './konvolutsuche.component.html',
  styleUrls: [ 'konvolutsuche.component.css' ]
})
export class KonvolutsucheComponent {
  @Input() konvolutTitle: string;
  @Output() suche = new EventEmitter<FormGroup>();
  @Output() reset = new EventEmitter<FormGroup>();
  @Input() searchTermArray: Array<string>;
  searchForm: FormGroup;
  isConvoluteView: boolean = true;
  fg: any;

  constructor(router: Router) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(),
      page: new FormControl()
    });
    this.isConvoluteView = !router.url.includes('---');
    if (this.isConvoluteView) {
      this.searchForm.valueChanges
        .debounceTime(200)
        .subscribe(suche => this.suche.emit(suche));
    }
  }

  checkIfNotizbuch(konvolutTitle: string) {
    //console.log(konvolutTitle);
    if (konvolutTitle) {
      if (konvolutTitle.search('Notizbuch') !== -1) return true;
      else return false;
    } else return false;
  }

  defineInputValue() {
    if (this.searchTermArray) return this.searchTermArray[ 0 ];
    else return null;
  }

  resetSearch(fg: any) {
    fg.searchTerm = '';
    this.suche.emit(fg);
  }

  checkSearchTermArray() {
    if (this.searchTermArray && this.searchTermArray[ 0 ].length > 2) return true;
    else return false;
  }

}
