/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routingComponents, StatischRoutingModule } from './statisch-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StatischRoutingModule
  ],
  declarations: [
    routingComponents
  ],
  exports: [
    routingComponents
  ]
})
export class StatischModule {
}
