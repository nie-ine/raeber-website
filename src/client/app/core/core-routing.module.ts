import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from '../statisch/homepage.component';
import { ImpressumComponent } from '../statisch/impressum.component';
import { SignaturenComponent } from '../statisch/signaturen.component';
import { WerklisteComponent } from '../statisch/werkliste.component';
import { LebensdatenComponent } from '../statisch/lebensdaten.component';
import { AnleitungComponent } from '../statisch/anleitung.component';
import { WerkausgabeComponent } from '../statisch/werkausgabe.component';
import { SucheComponent } from '../suche/suche.component';
import { PdfNotizbuecherComponent } from '../statisch/pdf-notizbuecher.component';
import { PdfSynopsenComponent } from '../statisch/pdf-synopsen.component';
import { RegisterComponent } from '../suche/register/register.component';
import { KonvolutModule } from '../konvolute/konvolut/konvolut.module';
import { FassungModule } from '../konvolute/fassung/fassung.module';
import { RegisterModule } from '../suche/register/register.module';
import { PageNotFoundComponent } from './404.component';

@NgModule({
  imports: [
    KonvolutModule,
    FassungModule,
    RegisterModule,
    RouterModule.forRoot([
      { path: 'werkausgabe', component: WerkausgabeComponent },
      { path: 'material/pdf-dateien/notizbuecher', component: PdfNotizbuecherComponent },
      { path: 'anleitung', component: AnleitungComponent },
      { path: 'lebensdaten', component: LebensdatenComponent },
      { path: 'werkliste', component: WerklisteComponent },
      { path: 'signaturen', component: SignaturenComponent },
      { path: 'impressum', component: ImpressumComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'suche', component: SucheComponent },
      { path: 'material/pdf-dateien/synopsen', component: PdfSynopsenComponent },
      { path: 'start', component: HomepageComponent },
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class CoreRoutingModule {
}

export const routingComponents = [
  AnleitungComponent,
  HomepageComponent,
  ImpressumComponent,
  LebensdatenComponent,
  PageNotFoundComponent,
  PdfNotizbuecherComponent,
  PdfSynopsenComponent,
  SignaturenComponent,
  SucheComponent,
  WerkausgabeComponent,
  WerklisteComponent
];

