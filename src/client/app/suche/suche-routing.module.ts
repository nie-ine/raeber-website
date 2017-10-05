import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SucheComponent } from './suche.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'suche', component: SucheComponent },
      { path: 'suche/:queryParameters', component: SucheComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class SucheRoutingModule {
}
