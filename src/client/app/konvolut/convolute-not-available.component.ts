import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-convolute-not-available',
  template: `
    <div style="text-align:center; margin-top:65px;">
      <h3>Konvolut <b>{{ convoluteTitle }}</b> ist noch nicht verfügbar</h3>
    </div>
  `
})
export class ConvoluteNotAvailableComponent {

  convoluteTitle: string;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => this.convoluteTitle = data.title
    );
  }

}
