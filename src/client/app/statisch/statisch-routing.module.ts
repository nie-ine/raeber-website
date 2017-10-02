import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { ImpressumComponent } from './impressum.component';
import { SignaturenComponent } from './signaturen.component';
import { WerklisteComponent } from './werkliste.component';
import { LebensdatenComponent } from './lebensdaten.component';
import { AnleitungComponent } from './anleitung.component';
import { WerkausgabeComponent } from './werkausgabe.component';
import { PdfNotizbuecherComponent } from './pdf-notizbuecher.component';
import { PdfSynopsenComponent } from './pdf-synopsen.component';
import { AbgewandtZugewandtNachwortComponent } from './abgewandt-zugewandt-nachwort.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'werkausgabe', component: WerkausgabeComponent },
      { path: 'material/pdf-dateien/notizbuecher', component: PdfNotizbuecherComponent },
      { path: 'drucke/abgewandt-zugewandt-nachwort', component: AbgewandtZugewandtNachwortComponent },
      { path: 'anleitung', component: AnleitungComponent },
      { path: 'lebensdaten', component: LebensdatenComponent },
      { path: 'werkliste', component: WerklisteComponent },
      { path: 'signaturen', component: SignaturenComponent },
      { path: 'impressum', component: ImpressumComponent },
      { path: 'material/pdf-dateien/synopsen', component: PdfSynopsenComponent },
      { path: 'start', component: HomepageComponent }
    ])
  ],
  exports: [RouterModule]
})
export class StatischRoutingModule {
}

export const routingComponents = [
  AbgewandtZugewandtNachwortComponent,
  AnleitungComponent,
  HomepageComponent,
  ImpressumComponent,
  LebensdatenComponent,
  PdfNotizbuecherComponent,
  PdfSynopsenComponent,
  SignaturenComponent,
  WerkausgabeComponent,
  WerklisteComponent
];
