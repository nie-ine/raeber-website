/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FassungComponent } from './fassung.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: ':konvolut/:fassung', component: FassungComponent, canActivate: [TestversionGuard]}
    ])
  ],
  exports: [ RouterModule ]
})
export class FassungRoutingModule {
}
