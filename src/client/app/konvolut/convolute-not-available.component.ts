import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-convolute-not-available',
  templateUrl: './convolute-not-available.component.html'
})
export class ConvoluteNotAvailableComponent {

  convoluteTitle: string;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => this.convoluteTitle = data.title
    );
  }

}
