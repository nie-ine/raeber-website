/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-diplomatischer-text',
  templateUrl: 'diplomatischer-text.component.html',
  styleUrls: [ 'diplomatischer-text.component.css' ]
})
export class DimplomatischerTextComponent implements OnInit, DoCheck {

  @Input() page: any;
  @Input() gewaehlteSchicht: string;
  @Output() gewaehlteSchichtChange: EventEmitter<string> = new EventEmitter<string>();


  farbeNeutral = '#6e6e6e';
  farbeMarkierung = '#d00501';
  farbeEinfuegung = '#007FFF';
  farbeZeilennummer = '#FF0000';
  farbeLetzte = '#F00000';
  farbeErste = '#800000';

  textIsMovable: boolean = false;
  // TODO: herausfinden wie das geht

  text: string = '<div class="transkription"><p>Baum</p><p><span class="einfuegung">Durch die Zweige </span><span class="einfuegung_gestr">schaut es</span><br /><span class="streichung grundschicht">Durch die Zweige</span> 				</p> 				<span class="weiss">schauten die Augen</span><span class="einfuegung_gestr">hervor</span><br /> 				<span class="streichung"><span class="grundschicht">schau<span class="ueberschrieben">en</span></span><span class="einfuegung_gestr ersetzung">t </span><span class="grundschicht">die Augen <span class="ueberschrieben">hervor</span></span> </span><span class="ersetzung streichung einfuegung_gestr">voller</span><span class="grundschicht">,</span><br /><span class="weiss">schauten die</span><span class="streichung einfuegung">Trauer hervor.</span> 				<p class="grundschicht"> 					<span class="streichung">voller Trauer,</span> 				</p> 				<p> 					<span class="einfuegung">schaut es hervor und senkt</span><br /><span class="streichung grundschicht">aber das Licht</span> 				</p> 				<span class="streichung grundschicht">auf den Blättern</span>&nbsp;<span class="einfuegung_gestr">schwarz und tr</span><br /><span class="weiss">auf den Blät&nbsp; tern </span><span class="einfuegung">langsam die Lider,</span> 				<p> 					<span class="streichung grundschicht">ist wie ein Lächeln.</span><span class="einfuegung"> schwarz,&nbsp;voller&nbsp;Trauer</span> 				</p> 				<p> 					<span class="streichung">Durch die Zweige schaut es,&nbsp;</span><span class="einfuegung_gestr">die Wimpern<br /></span><span class="weiss">Durch die Zweige schaut es,&nbsp;</span><span class="einfuegung_gestr">hervor</span> 				</p> 				<p> 					<span class="streichung">die Wimp </span> 				</p> 				<p> 					<span class="streichung">[langsam senkend hervor </span> 				</p> 				<p> 					<span class="streichung">schwarz hervor und senkt</span> 				</p> 				<p> 					<span class="streichung">langsam die]</span> 				</p> 				<p> 					<span class="streichung">hervor und senkt</span>&nbsp;<span class="streichung">schaut es </span> 				</p> 				<p> 					<span class="streichung grundschicht">schwarz hervor und senkt</span> 				</p> 				<p> 					<span class="streichung grundschicht">langsam die Wimpern.</span><br /><span class="weiss">langsam voller Trauer die</span><span class="einfuegung_gestr">Lider</span>.<br /><span class="weiss">langsam</span><span class="streichung">voller Trauer die Wimpern</span>. // 				</p> 			</div>';
// TODO: dynamisieren

  ngOnInit() {
    this.updateSchichten();
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

    for (let entry of document.getElementsByClassName('transkription')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('zeile')) { entry.style.color = this.farbeZeilennummer; }
    for (let entry of document.getElementsByClassName('markierung')) { entry.style.color = this.farbeMarkierung; }
    for (let entry of document.getElementsByClassName('herausgeber')) { entry.style.color = this.farbeMarkierung; }

    for (let entry of document.getElementsByClassName('streichung_typo')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }
  }

  zeigeSchicht1() {
    // faerbe alles in der Grundfarbe ein ausser die Grundschicht

    for (let entry of document.getElementsByClassName('transkription')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('grundschicht')) {
      entry.setAttribute('style', 'font-weight:normal');
      entry.style.color = this.farbeErste;
      for (let child of entry.getElementsByTagName('*')) {
        child.setAttribute('style', 'font-weight:normal');
        child.style.color = this.farbeErste;
      }
    }
  }

  zeigeSchicht2() {
    // faerbe alle Einfuegungen blau ein

    for (let entry of document.getElementsByClassName('transkription')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung')) {
      entry.style.color = this.farbeEinfuegung;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeEinfuegung;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung_typo')) {
      entry.style.color = this.farbeEinfuegung;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeEinfuegung;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung_gestr_typo')) {
      entry.style.color = this.farbeEinfuegung;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeEinfuegung;
      }
    }

    for (let entry of document.getElementsByClassName('streichung_typo')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung_gestr')) {
      entry.style.color = this.farbeEinfuegung;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeEinfuegung;
      }
    }

    for (let entry of document.getElementsByClassName('markierung')) { entry.style.color = this.farbeMarkierung; }
    for (let entry of document.getElementsByClassName('zeile')) { entry.style.color = this.farbeZeilennummer; }

  }

  zeigeSchicht3() {
    // faerbe alles, das nicht gestrichen wurde, in der Farbe der Enfassung ein

    for (let entry of document.getElementsByClassName('transkription')) {
      entry.style.color = this.farbeLetzte;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeLetzte;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung_gestr')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('einfuegung_gestr_typo')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('unsicher_gestr')) { entry.style.color = this.farbeNeutral; }

    for (let entry of document.getElementsByClassName('streichung')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('streichung_typo')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }

    for (let entry of document.getElementsByClassName('ueberschrieben')) { entry.style.color = this.farbeNeutral; }
    for (let entry of document.getElementsByClassName('streichung_doppel')) { entry.style.color = this.farbeNeutral; }

    for (let entry of document.getElementsByClassName('blocktilgung')) {
      entry.style.color = this.farbeNeutral;
      for (let child of entry.getElementsByTagName('*')) {
        child.style.color = this.farbeNeutral;
      }
    }
  }
}
