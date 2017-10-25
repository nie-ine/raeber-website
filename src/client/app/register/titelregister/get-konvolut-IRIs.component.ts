import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

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

  private sub: any;
  constructor(http: Http) {
    this.http = http;
  }

  ngOnChanges() {
    if (this.konvolutTitelText) {
      console.log('KonvolutTitel:' + this.konvolutTitelText);
      console.log(globalSearchVariableService.API_URL +
        '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=' +
        this.konvolutTitelText);
      this.http.get(globalSearchVariableService.API_URL +
        '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=' +
        this.konvolutTitelText)
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            console.log(data);
             if(data.subjects[ 0 ]!== undefined) {
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
