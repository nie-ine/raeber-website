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
  placeholder = 'Suche...';

  constructor(private router: Router) {
    router.events.subscribe(changes => {
      this.hideSearchfield = true;
      this.placeholder = 'Suche...';
    });
  }

  sendRequest(values: any) {
    this.router.navigateByUrl('/suche?wort=' + encodeURIComponent(values));
  }


}
