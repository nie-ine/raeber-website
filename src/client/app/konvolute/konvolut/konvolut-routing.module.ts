/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonvolutComponent } from './konvolut.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/:id', component: KonvolutComponent },
      { path: 'manuskripte/:id', component: KonvolutComponent },
      { path: 'notizbuecher/:id', component: KonvolutComponent },
      { path: 'typoskripte/:id', component: KonvolutComponent },
      { path: 'test', component: KonvolutComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class KonvolutRoutingModule {
}
