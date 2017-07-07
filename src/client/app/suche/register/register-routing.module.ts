/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'register/:id', component: RegisterComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class RegisterRoutingModule {
}
