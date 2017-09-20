import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent {

  hideSearchfield: boolean = true;
  searchfieldText: string = 'Suche...';

  sendRequest(values: any) {
    console.log(values);
  }


}
