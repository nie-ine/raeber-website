import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolutsuche',
  templateUrl: './konvolutsuche.component.html'
})
export class KonvolutsucheComponent {
  @Output() suche = new EventEmitter<FormGroup>();
  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(),
      page: new FormControl()
    });
    this.searchForm.valueChanges
      .debounceTime(500)
      .subscribe(suche => this.suche.emit(suche));
  }
}
