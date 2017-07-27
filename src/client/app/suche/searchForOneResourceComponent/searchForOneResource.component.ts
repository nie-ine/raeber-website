import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-search-for-one-resource',
  templateUrl: 'searchForOneResource.component.html',
  styleUrls: [ 'searchForOneResource.component.css' ]
})
export class SearchForOneResourceComponent implements OnInit {

  arraySize: number;
  array = [1];
  @Input() nthResourceSearch: number;

  ngOnInit() {
    console.log('This is resource Search nr: ' + this.nthResourceSearch);
  }

  increaseArrayElement() {
    this.arraySize = this.array[this.array.length - 1 ];
    this.arraySize += 1;
    this.array.push(this.arraySize);
    console.log('ResourceSearch: ' + this.nthResourceSearch + 'Constraint: ' + this.arraySize);
  }


}
