/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';

import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutComponent } from './konvolut.component';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import {
  MdButtonToggleModule, MdCardModule, MdGridListModule, MdIconModule, MdListModule
} from '@angular/material';
import { KonvolutGridComponent } from './konvolut-grid/konvolut-grid.component';
import { KonvolutRegisterComponent } from './konvolut-register/konvolut-register.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ KonvolutRoutingModule, MdCardModule, MdGridListModule, MdButtonToggleModule, MdListModule , MdIconModule, BrowserModule ],
  declarations: [ KonvolutComponent,
    KonvolutSteckbriefComponent,
    KonvolutGridComponent,
    KonvolutRegisterComponent],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
