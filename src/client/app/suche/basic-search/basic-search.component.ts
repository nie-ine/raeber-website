import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent {

  hideSearchfield: boolean = true;
  searchfieldText: string = 'Suche...';

  constructor(private router: Router) {
  }

  sendRequest(values: any) {
    console.log(values);
    this.router.navigateByUrl('/suche',);
  }


}
