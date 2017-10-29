/**
 * Created by Roberta Padlina (roberta.padlina@unibas.ch) on 28.10.2017.
 */

import { Directive, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Directive({
  selector: '[backtotop]'
})

export class BackToTopButtonDirective {

  navIsFixed: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('CIAO');
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

}
