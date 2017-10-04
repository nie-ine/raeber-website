import { NgModule } from '@angular/core';
import { MdButtonModule, MdInputModule, MdSelectModule, MdSliderModule, MdSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { DarstellungsoptionenComponent } from './darstellungsoptionen.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdInputModule,
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
