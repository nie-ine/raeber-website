/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FassungComponent } from './fassung.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/abgewandt-zugewandt/:konvolut/item/:id', component: FassungComponent },
      { path: 'drucke/:konvolut/item/:id', component: FassungComponent },
      { path: 'manuskripte/:konvolut/item/:id', component: FassungComponent },
      { path: 'notizbuecher/notizbuch-divers/:konvolut/item/:id', component: FassungComponent },
      { path: 'notizbuecher/:konvolut/item/:id', component: FassungComponent },
      { path: 'typoskripte/typoskripte-sammlungen/:konvolut/item/:id', component: FassungComponent },
      { path: 'typoskripte/:konvolut/item/:id', component: FassungComponent },
      { path: 'material/:konvolut/item/:id', component: FassungComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class FassungRoutingModule {
}
