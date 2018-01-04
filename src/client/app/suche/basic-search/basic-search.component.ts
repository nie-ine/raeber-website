import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent {

  hideSearchfield: boolean = true;
  placeholder = 'Suche...';

  constructor(private router: Router, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => console.log(params));
    router.events.subscribe(changes => {
      this.hideSearchfield = true;
      this.placeholder = 'Suche...';
    });
  }

  sendRequest(values: any) {
    this.createLinkToSearch();
    this.router.navigateByUrl(this.createLinkToSearch() + '?wort=' + encodeURIComponent(values));
  }

  createLinkToSearch(): string {
    //console.log((this.route as any)._routerState.snapshot.url.split('?')[0]);
    // if(this.route._routerState.snapshot.url === '/suche') {
    if (
      (this.route as any)._routerState.snapshot.url.split('?')[0] === '/suche' ) {
      //console.log('Erster Fall');
      return 'resetSuche';
    } else {
      //console.log('Zweiter Fall');
      return 'suche';
    }
  }


}
