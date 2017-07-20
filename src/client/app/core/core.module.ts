/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/20/17.
 */

import { NgModule } from '@angular/core';

import { FusszeileComponent } from './fusszeile.component';
import { KopfzeileComponent } from './kopfzeile.component';
import { NavigationsleisteComponent } from './navigationsleiste.component';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule, routingComponents } from './core-routing.module';
import { HaupttextComponent } from './haupttext.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    FusszeileComponent,
    KopfzeileComponent,
    HaupttextComponent,
    NavigationsleisteComponent,
    routingComponents
  ],
  exports: [
    KopfzeileComponent,
    HaupttextComponent,
    FusszeileComponent
  ]
})
export class CoreModule {
}
