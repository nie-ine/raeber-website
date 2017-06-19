/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';

import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutComponent } from './konvolut.component';
import {KonvolutSteckbriefComponent} from './konvolut-steckbrief/konvolut-steckbrief.component';
import {MdButtonToggleModule, MdCardModule, MdGridListModule, MdListModule} from '@angular/material';
import {KonvolutGridComponent} from './konvolut-grid/konvolut-grid.component';
import {KonvolutRegisterComponent} from './konvolut-register/konvolut-register.component';

@NgModule({
  imports: [ KonvolutRoutingModule, MdCardModule, MdGridListModule, MdButtonToggleModule, MdListModule ],
  declarations: [ KonvolutComponent,
  KonvolutSteckbriefComponent,
  KonvolutGridComponent,
  KonvolutRegisterComponent],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
