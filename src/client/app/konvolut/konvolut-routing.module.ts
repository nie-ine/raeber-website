/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonvolutComponent } from './konvolut.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/:konvolut', component: KonvolutComponent },
      { path: 'manuskripte/:konvolut', component: KonvolutComponent },
      { path: 'notizbuecher/notizbuch-divers/:konvolut', component: KonvolutComponent },
      { path: 'notizbuecher/:konvolut', component: KonvolutComponent },
      { path: 'typoskripte/typoskripte-sammlungen/:konvolut', component: KonvolutComponent },
      { path: 'typoskripte/:konvolut', component: KonvolutComponent },
      { path: 'material/:konvolut', component: KonvolutComponent }
    ])
  ],
  exports: [RouterModule]
})
export class KonvolutRoutingModule {
}
