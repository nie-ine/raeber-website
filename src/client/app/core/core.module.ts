/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/20/17.
 */

import { NgModule } from '@angular/core';

import { KopfzeileComponent } from './kopfzeile.component';
import { NavigationsleisteComponent } from './navigationsleiste.component';
import { CommonModule } from '@angular/common';
import { HaupttextComponent } from './haupttext.component';
import { PageNotFoundComponent } from './404.component';
import { KonvolutModule } from '../konvolut/konvolut.module';
import { FassungModule } from '../fassung/fassung.module';
import { RegisterModule } from '../register/register.module';
import { StatischModule } from '../statisch/statisch.module';
import { SucheModule } from '../suche/suche.module';
import { SynopseModule } from '../synopse/synopse.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';
import { CoreRoutingModule, routingComponents } from './core-routing.module';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdGridListModule,
    MdIconModule,
    MdDialogModule,
    MdMenuModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule, MdToolbarModule,
    MdProgressBarModule,
    CommonModule,
    // Order of imports is important!
    StatischModule,
    KonvolutModule,
    RegisterModule,
    SucheModule,
    SynopseModule,
    FassungModule,
    MdInputModule,
    NgbModule.forRoot(),
    CoreRoutingModule
  ],
  declarations: [
    KopfzeileComponent,
    HaupttextComponent,
    NavigationsleisteComponent,
    PageNotFoundComponent,
    ScrollToTopComponent,
  ],
  providers: [
    TestversionGuard
  ],
  exports: [
    KopfzeileComponent,
    HaupttextComponent,
    ScrollToTopComponent
  ]
})
export class CoreModule {
}
