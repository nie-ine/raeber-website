import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SucheComponent } from './suche.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'suche', component: SucheComponent, canActivate: [TestversionGuard]},
      {path: 'suche/:queryParameters', component: SucheComponent, canActivate: [TestversionGuard]},
      {path: 'resetSuche', component: SucheComponent, canActivate: [TestversionGuard]}
    ])
  ],
  exports: [ RouterModule ]
})
export class SucheRoutingModule {
}
