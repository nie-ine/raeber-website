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
import { TextausagabenComponent} from './textausgaben.component';
import { PdfNotizbuecherComponent } from './pdf-notizbuecher.component';
import { PdfSynopsenComponent } from './pdf-synopsen.component';
import { AbgewandtZugewandtNachwortComponent } from './abgewandt-zugewandt-nachwort.component';
import { HomepageWithInitTextComponent } from './homepagewithinittext.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'werkausgabe', component: WerkausgabeComponent },
      { path: 'textausgaben', component: TextausagabenComponent},
      { path: 'material/pdf-dateien/notizbuecher', component: PdfNotizbuecherComponent },
      { path: 'drucke/abgewandt-zugewandt-nachwort', component: AbgewandtZugewandtNachwortComponent },
      { path: 'anleitung', component: AnleitungComponent },
      { path: 'lebensdaten', component: LebensdatenComponent },
      { path: 'werkliste-selbst', component: WerklisteSelbstComponent },
      { path: 'werkliste-unselbst', component: WerklisteUnselbstComponent},
      { path: 'signaturen', component: SignaturenComponent },
      { path: 'impressum', component: ImpressumComponent },
      { path: 'material/pdf-dateien/synopsen', component: PdfSynopsenComponent },
      { path: 'start', component: HomepageComponent },
      { path: 'init', component: HomepageWithInitTextComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class StatischRoutingModule {
}

export const routingComponents = [
  AbgewandtZugewandtNachwortComponent,
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
