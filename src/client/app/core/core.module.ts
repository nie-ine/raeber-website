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
import { MdInputModule } from '@angular/material';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [
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
    /*    RouterModule.forRoot([
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
     ])*/
  ],
  declarations: [
    KopfzeileComponent,
    HaupttextComponent,
    NavigationsleisteComponent,
    PageNotFoundComponent
  ],
  exports: [
    KopfzeileComponent,
    HaupttextComponent,
  ]
})
export class CoreModule {
}
