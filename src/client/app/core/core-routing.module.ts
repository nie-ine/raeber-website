import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpressumComponent } from '../statisch/impressum.component';
import { SignaturenComponent } from '../statisch/signaturen.component';
import { WerklisteSelbstComponent } from '../statisch/werkliste-selbst.component';
import { WerklisteUnselbstComponent } from '../statisch/werkliste-unselbst.component';
import { LebensdatenComponent } from '../statisch/lebensdaten.component';
import { AnleitungComponent } from '../statisch/anleitung.component';
import { WerkausgabeComponent } from '../statisch/werkausgabe.component';
import { TextausagabenComponent } from '../statisch/textausgaben.component';
import { SucheModule } from '../suche/suche.module';
import { PdfNotizbuecherComponent } from '../statisch/pdf-notizbuecher.component';
import { PdfSynopsenComponent } from '../statisch/pdf-synopsen.component';
import { PageNotFoundComponent } from './404.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    SucheModule,
    RouterModule.forRoot([
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
      {path: '', redirectTo: '/start', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent, canActivate: [TestversionGuard]}
    ])
  ],
  exports: [ RouterModule ]
})
export class CoreRoutingModule {
}
