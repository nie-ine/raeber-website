/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';

import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutComponent } from './konvolut.component';
import {KonvolutSteckbriefComponent} from "./konvolut-steckbrief/konvolut-steckbrief.component";
import {MdCardModule} from "@angular/material";

@NgModule({
  imports: [ KonvolutRoutingModule, MdCardModule ],
  declarations: [ KonvolutComponent,
  KonvolutSteckbriefComponent],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
