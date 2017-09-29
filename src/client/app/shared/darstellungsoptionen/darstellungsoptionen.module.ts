import { NgModule } from '@angular/core';
import { MdButtonModule, MdSelectModule, MdSliderModule, MdSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { DarstellungsoptionenComponent } from './darstellungsoptionen.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule,
    ReactiveFormsModule
  ],
  declarations: [ DarstellungsoptionenComponent ],
  exports: [ DarstellungsoptionenComponent ]

})
export class DarstellungsoptionenModule {
}
