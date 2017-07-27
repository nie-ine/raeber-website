import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdCheckboxModule,
  MdSelectModule
} from '@angular/material';

import { SearchForOneResourceComponent } from './searchForOneResource.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonToggleModule,
    MdCardModule,
    RouterModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdCheckboxModule,
    MdSelectModule
  ],
  declarations: [
    SearchForOneResourceComponent
  ],
  exports: [
    SearchForOneResourceComponent
  ]
})
export class SearchForOneResourceModule {
}
