/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/8/17.
 */

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdMenuModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdMenuModule
  ],
  exports: [ MdMenuModule ]
})
export class AppMaterialModule {

}
