/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SynopseComponent } from './synopse.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'synopsen', component: SynopseComponent }
    ])
  ],
  declarations: [
    SynopseComponent
  ],
  exports: [
    SynopseComponent
  ]
})
export class SynopseModule {
}
