import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolutsuche',
  templateUrl: './konvolutsuche.component.html'
})
export class KonvolutsucheComponent {
  @Input() konvolutTitle: string;
  @Output() suche = new EventEmitter<FormGroup>();
  @Input() searchTermArray: Array<string>;
  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(),
      page: new FormControl()
    });
    this.searchForm.valueChanges
      //.debounceTime(500)
      .subscribe(suche => this.suche.emit(suche));
  }

  checkIfNotizbuch(konvolutTitle: string) {
    //console.log(konvolutTitle);
    if(konvolutTitle) {
      if(konvolutTitle.search('Notizbuch') !== -1) return true;
      else return false;
    } else return false;
  }

  defineInputValue() {
    if(this.searchTermArray) return this.searchTermArray[0];
    else return null;
  }

}
