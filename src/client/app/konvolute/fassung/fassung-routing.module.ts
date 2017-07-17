/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FassungComponent } from './fassung.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/abgewandt-zugewandt/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'drucke/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'manuskripte/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'notizbuecher/notizbuch-divers/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'notizbuecher/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'typoskripte/typoskripte-sammlungen/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'typoskripte/:konvolut/item/:fassung', component: FassungComponent },
      { path: 'material/:konvolut/item/:fassung', component: FassungComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class FassungRoutingModule {
}
