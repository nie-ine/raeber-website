/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FassungComponent } from './fassung.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'drucke/:konvolut/:fassung', component: FassungComponent },
      { path: 'manuskripte/:konvolut/:fassung', component: FassungComponent },
      { path: 'notizbuecher/:konvolut/:fassung', component: FassungComponent },
      { path: 'typoskripte/:konvolut/:fassung', component: FassungComponent },
      { path: 'material/:konvolut/:fassung', component: FassungComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class FassungRoutingModule {
}
