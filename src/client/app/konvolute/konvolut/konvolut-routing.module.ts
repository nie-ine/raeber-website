/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonvolutComponent } from './konvolut.component';
import { SuperKonvolutComponent } from './super-konvolut.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/abgewandt-zugewandt', component: SuperKonvolutComponent },
      { path: 'drucke/abgewandt-zugewandt/:id', component: KonvolutComponent },
      { path: 'drucke/:id', component: KonvolutComponent },
      { path: 'manuskripte/:id', component: KonvolutComponent },
      { path: 'notizbuecher/notizbuch-divers/:id', component: KonvolutComponent },
      { path: 'notizbuecher/:id', component: KonvolutComponent },
      { path: 'typoskripte/typoskripte-sammlungen/:id', component: KonvolutComponent },
      { path: 'typoskripte/:id', component: KonvolutComponent },
      { path: 'material/:id', component: KonvolutComponent },
      { path: 'test', component: KonvolutComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class KonvolutRoutingModule {
}
