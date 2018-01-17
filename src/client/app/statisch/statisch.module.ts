/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdIconModule } from '@angular/material';

import { routingComponents, StatischRoutingModule } from './statisch-routing.module';
import { InitKommentarComponent } from './initkommentar.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdIconModule,
    StatischRoutingModule
  ],
  declarations: [
    routingComponents,
    InitKommentarComponent
  ],
  entryComponents: [
    InitKommentarComponent
  ],
  exports: [
    routingComponents,
    InitKommentarComponent
  ]
})
export class StatischModule {
}
