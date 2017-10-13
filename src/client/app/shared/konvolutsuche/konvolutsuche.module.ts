import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';

import { KonvolutsucheComponent } from './konvolutsuche.component';

@NgModule({
  imports: [
    MdInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    KonvolutsucheComponent
  ],
  exports: [
    KonvolutsucheComponent
  ]
})
export class KonvolutsucheModule {
}
