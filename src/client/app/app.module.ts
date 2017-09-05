import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule {
}
