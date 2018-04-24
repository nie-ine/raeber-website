import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { ImpressumComponent } from './impressum.component';
import { SignaturenComponent } from './signaturen.component';
import { WerklisteSelbstComponent } from './werkliste-selbst.component';
import { WerklisteUnselbstComponent } from './werkliste-unselbst.component';
import { LebensdatenComponent } from './lebensdaten.component';
import { AnleitungComponent } from './anleitung.component';
import { WerkausgabeComponent } from './werkausgabe.component';
import { TextausagabenComponent } from './textausgaben.component';
import { PdfNotizbuecherComponent } from './pdf-notizbuecher.component';
import { PdfSynopsenComponent } from './pdf-synopsen.component';
import { HomepageWithInitTextComponent } from './homepagewithinittext.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'werkausgabe', component: WerkausgabeComponent, canActivate: [TestversionGuard]},
      {path: 'textausgaben', component: TextausagabenComponent, canActivate: [TestversionGuard]},
      {path: 'material/pdf-dateien/notizbuecher', component: PdfNotizbuecherComponent, canActivate: [TestversionGuard]},
      {path: 'anleitung', component: AnleitungComponent, canActivate: [TestversionGuard]},
      {path: 'lebensdaten', component: LebensdatenComponent, canActivate: [TestversionGuard]},
      {path: 'werkliste-selbst', component: WerklisteSelbstComponent, canActivate: [TestversionGuard]},
      {path: 'werkliste-unselbst', component: WerklisteUnselbstComponent, canActivate: [TestversionGuard]},
      {path: 'signaturen', component: SignaturenComponent, canActivate: [TestversionGuard]},
      {path: 'impressum', component: ImpressumComponent, canActivate: [TestversionGuard]},
      {path: 'material/pdf-dateien/synopsen', component: PdfSynopsenComponent, canActivate: [TestversionGuard]},
      {path: 'start', component: HomepageComponent, canActivate: [TestversionGuard]},
      { path: 'init', component: HomepageWithInitTextComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class StatischRoutingModule {
}

export const routingComponents = [
  AnleitungComponent,
  HomepageComponent,
  HomepageWithInitTextComponent,
  ImpressumComponent,
  LebensdatenComponent,
  PdfNotizbuecherComponent,
  PdfSynopsenComponent,
  SignaturenComponent,
  WerkausgabeComponent,
  TextausagabenComponent,
  WerklisteSelbstComponent,
  WerklisteUnselbstComponent
];
