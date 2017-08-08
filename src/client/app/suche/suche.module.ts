/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SucheComponent } from './suche.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'suche', component: SucheComponent }
    ])
  ],
  declarations: [
    SucheComponent
  ],
  exports: [
    SucheComponent
  ]
})
export class SucheModule {
}
