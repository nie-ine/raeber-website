/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FassungComponent } from './fassung.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: ':konvolut/:fassung', component: FassungComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class FassungRoutingModule {
}
