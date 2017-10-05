import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-trefferleiste',
  templateUrl: './konvolut-trefferleiste.component.html',
  styleUrls: [ './konvolut-trefferleiste.component.css' ]
})
export class KonvolutTrefferleisteComponent {
  @Input() results: number;
  @Input() searchTerm: string;
  @Output() reset = new EventEmitter<boolean>();

  quitSearchMode() {
    this.reset.emit(true);
  }
}
