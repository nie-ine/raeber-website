import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'rae-app',
  template: `
    <header id="rt-top-surround">
      <rae-kopfzeile></rae-kopfzeile>
    </header>
    <main id='rt-mainbody-surround'>
      <rae-haupttext></rae-haupttext>
      <rae-scroll-to-top></rae-scroll-to-top>
    </main>
  `,
  styles: [
      `:host {
      flex: 1 1 100%;
      display: flex;
      flex-flow: column;
    }`
  ]
})
export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
