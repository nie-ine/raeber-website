/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Text } from '../utilities/iris';
import { KnoraResource } from '../utilities/knora-api-params';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'rae-diplomatischer-text',
  templateUrl: 'diplomatischer-text.component.html',
  styleUrls: [ 'diplomatischer-text.component.css' ]
})
export class DimplomatischerTextComponent implements OnInit, DoCheck, OnChanges {

  @Input() gewaehlteSchicht: string;
  @Input() textIRI: string;
  @Input() textIsMovable: boolean;
  @Input() showStufe1: boolean;
  @Input() showStufe2: boolean;

  @Output() gewaehlteSchichtChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() textIsMovableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showStufe1Change: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showStufe2Change: EventEmitter<boolean> = new EventEmitter<boolean>();


  farbeNeutral = '#6e6e6e';
  farbeMarkierung = '#d00501';
  farbeEinfuegung = '#007FFF';
  farbeZeilennummer = '#FF0000';
  farbeLetzte = '#F00000';
  farbeErste = '#800000';

  text: string;

  // collection of elements
  blocktilgungElements = document.getElementsByClassName('blocktilgung') as HTMLCollectionOf<HTMLElement>;
  einfuegungElements = document.getElementsByClassName('einfuegung') as HTMLCollectionOf<HTMLElement>;
  einfuegung_gestrElements = document.getElementsByClassName('einfuegung_gestr') as HTMLCollectionOf<HTMLElement>;
  einfuegung_gestr_typoElements = document.getElementsByClassName('einfuegung_gestr_typo') as HTMLCollectionOf<HTMLElement>;
  einfuegung_typoElements = document.getElementsByClassName('einfuegung_typo') as HTMLCollectionOf<HTMLElement>;
  grundschichtElements = document.getElementsByClassName('schicht1') as HTMLCollectionOf<HTMLElement>;
  herausgeberElements = document.getElementsByClassName('herausgeber') as HTMLCollectionOf<HTMLElement>;
  markierungElements = document.getElementsByClassName('markierung') as HTMLCollectionOf<HTMLElement>;
  streichungElements = document.getElementsByClassName('streichung') as HTMLCollectionOf<HTMLElement>;
  streichung_doppelElement = document.getElementsByClassName('streichung_doppel') as HTMLCollectionOf<HTMLElement>;
  streichung_typoElements = document.getElementsByClassName('streichung_typo') as HTMLCollectionOf<HTMLElement>;
  transkriptionElements = document.getElementsByClassName('transkription') as HTMLCollectionOf<HTMLElement>;
  ueberschriebenElements = document.getElementsByClassName('ueberschrieben') as HTMLCollectionOf<HTMLElement>;
  unsicher_gestrElements = document.getElementsByClassName('unsicher_gestr') as HTMLCollectionOf<HTMLElement>;
  zeileElements = document.getElementsByClassName('zeile') as HTMLCollectionOf<HTMLElement>;

  private sub: any;

  constructor(private http: Http) {}

  ngOnInit() {
    this.updateSchichten();
  }

  ngOnChanges() {
    if (this.textIRI) {
      this.sub = this.http.get(new KnoraResource(this.textIRI).toString())
        .map(response => response.json())
        .subscribe(res => {
          this.text = res.props[ Text.hasContent ].values[ 0 ].utf8str;
          this.updateSchichten();
          if (this.text.match('schicht1')) {
            this.showStufe1 = true;
            this.showStufe1Change.emit(this.showStufe1);
          }
          if (this.text.match('einfuegung')) {
            this.showStufe2 = true;
            this.showStufe2Change.emit(this.showStufe2);
          }
        });
    }
  }

  ngDoCheck() {
    this.updateSchichten();
  }

  updateSchichten() {
    switch (this.gewaehlteSchicht) {
      case 'schicht0':
        this.zeigeSchicht0();
        break;
      case 'schicht1':
        this.zeigeSchicht1();
        break;
      case 'schicht2':
        this.zeigeSchicht2();
        break;
      case 'schicht3':
        this.zeigeSchicht3();
        break;
      default:
        this.zeigeSchicht0();
        break;
    }
  }

  zeigeSchicht0() {
    // faerbe alles in der Grundfarbe ein ausser Zeilennummern und Markierungen

    for (let i = 0; i < this.transkriptionElements.length; i++) {
      this.transkriptionElements[ i ].style.color = this.farbeNeutral;

      let children = this.transkriptionElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.zeileElements.length; i++) {
      this.zeileElements[ i ].style.color = this.farbeZeilennummer;
    }

    for (let i = 0; i < this.markierungElements.length; i++) {
      this.markierungElements[ i ].style.color = this.farbeMarkierung;
    }

    for (let i = 0; i < this.herausgeberElements.length; i++) {
      this.herausgeberElements[ i ].style.color = this.farbeMarkierung;
    }

    for (let i = 0; i < this.streichung_typoElements.length; i++) {
      this.streichung_typoElements[ i ].style.color = this.farbeNeutral;

      let children = this.streichung_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }
  }

  zeigeSchicht1() {
    // faerbe alles in der Grundfarbe ein ausser die Grundschicht

    for (let i = 0; i < this.transkriptionElements.length; i++) {
      this.transkriptionElements[ i ].style.color = this.farbeNeutral;

      let children = this.transkriptionElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.grundschichtElements.length; i++) {
      this.grundschichtElements[ i ].setAttribute('style', 'font-weight:normal');
      this.grundschichtElements[ i ].style.color = this.farbeErste;

      let children = this.grundschichtElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].setAttribute('style', 'font-weight:normal');
        children[ j ].style.color = this.farbeErste;
      }
    }
  }

  zeigeSchicht2() {
    // faerbe alle Einfuegungen blau ein

    for (let i = 0; i < this.transkriptionElements.length; i++) {
      this.transkriptionElements[ i ].style.color = this.farbeNeutral;

      let children = this.transkriptionElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.einfuegungElements.length; i++) {
      this.einfuegungElements[ i ].style.color = this.farbeEinfuegung;

      let children = this.einfuegungElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeEinfuegung;
      }
    }

    for (let i = 0; i < this.einfuegung_typoElements.length; i++) {
      this.einfuegung_typoElements[ i ].style.color = this.farbeEinfuegung;

      let children = this.einfuegung_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeEinfuegung;
      }
    }

    for (let i = 0; i < this.einfuegung_gestr_typoElements.length; i++) {
      this.einfuegung_gestr_typoElements[ i ].style.color = this.farbeEinfuegung;

      let children = this.einfuegung_gestr_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeEinfuegung;
      }
    }

    for (let i = 0; i < this.streichung_typoElements.length; i++) {
      this.streichung_typoElements[ i ].style.color = this.farbeNeutral;

      let children = this.streichung_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.einfuegung_gestrElements.length; i++) {
      this.einfuegung_gestrElements[ i ].style.color = this.farbeEinfuegung;

      let children = this.einfuegung_gestrElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeEinfuegung;
      }
    }

    for (let i = 0; i < this.markierungElements.length; i++) {
      this.markierungElements[ i ].style.color = this.farbeMarkierung;
    }

    for (let i = 0; i < this.zeileElements.length; i++) {
      this.zeileElements[ i ].style.color = this.farbeZeilennummer;
    }
  }

  zeigeSchicht3() {
    // faerbe alles, das nicht gestrichen wurde, in der Farbe der Enfassung ein

    for (let i = 0; i < this.transkriptionElements.length; i++) {
      this.transkriptionElements[ i ].style.color = this.farbeLetzte;

      let children = this.transkriptionElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeLetzte;
      }
    }

    for (let i = 0; i < this.einfuegung_gestrElements.length; i++) {
      this.einfuegung_gestrElements[ i ].style.color = this.farbeNeutral;

      let children = this.einfuegung_gestrElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.einfuegung_gestr_typoElements.length; i++) {
      this.einfuegung_gestr_typoElements[ i ].style.color = this.farbeNeutral;

      let children = this.einfuegung_gestr_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.unsicher_gestrElements.length; i++) {
      this.unsicher_gestrElements[ i ].style.color = this.farbeNeutral;
    }

    for (let i = 0; i < this.streichungElements.length; i++) {
      this.streichungElements[ i ].style.color = this.farbeNeutral;

      let children = this.streichungElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.streichung_typoElements.length; i++) {
      this.streichung_typoElements[ i ].style.color = this.farbeNeutral;

      let children = this.streichung_typoElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }

    for (let i = 0; i < this.ueberschriebenElements.length; i++) {
      this.ueberschriebenElements[ i ].style.color = this.farbeNeutral;
    }

    for (let i = 0; i < this.streichung_doppelElement.length; i++) {
      this.streichung_doppelElement[ i ].style.color = this.farbeNeutral;
    }

    for (let i = 0; i < this.blocktilgungElements.length; i++) {
      this.blocktilgungElements[ i ].style.color = this.farbeNeutral;

      let children = this.blocktilgungElements[ i ].getElementsByTagName('*') as HTMLCollectionOf<HTMLElement>;
      for (let j = 0; j < children.length; j++) {
        children[ j ].style.color = this.farbeNeutral;
      }
    }
  }

  toggleDraggable() {
    this.textIsMovable = !this.textIsMovable;
    this.textIsMovableChange.emit(this.textIsMovable);

    if (this.textIsMovable) {
      $('.rae-diplomatic').draggable({ disabled: false, cursor: 'move' });
    } else {
      $('.rae-diplomatic').draggable({ disabled: true, cursor: 'auto' });
    }
    /*$('.umschrift').toggle(function() {
     jQuery(".umschrift").draggable({disabled:false,cursor:"move"}).css( {cursor:"move"});
     },
     function() {
     jQuery(".umschrift").draggable({disabled: true}).css( {cursor:"auto"});
     });*/
  }

}
