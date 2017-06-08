/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';

import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutComponent } from './konvolut.component';

@NgModule({
  imports: [ KonvolutRoutingModule ],
  declarations: [ KonvolutComponent ],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
