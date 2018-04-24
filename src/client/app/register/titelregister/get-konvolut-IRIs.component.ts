import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { equals, ExtendedSearch } from '../../shared/utilities/knora-api-params';
import { Text } from '../../shared/utilities/iris';

@Component({
  moduleId: module.id,
  selector: 'get-konvolut-iris',
  template: ''
})
export class GetKonvolutIRIsComponent implements OnChanges {

  @Input() konvolutTitelText: string;
  @Output() sendKonvolutIRIBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutTypeBack: EventEmitter<any> = new EventEmitter<any>();

  responseArray: Array<any>;

  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  ngOnChanges() {
    if (this.konvolutTitelText) {
      this.http.get(
        new ExtendedSearch()
          .property(Text.hasConvoluteTitle, equals, this.konvolutTitelText)
          .toString())
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            if (data.subjects[ 0 ] !== undefined) {
              this.sendKonvolutIRIBack.emit(data.subjects[ 0 ].obj_id);
              this.sendKonvolutTypeBack.emit(data.subjects[ 0 ].iconlabel);
            }
            return data.resourcetypes;
          }
        )
        .subscribe(response => this.responseArray = response, error => console.log('Error: ', error));
    }
  }
}
