import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import { Config } from '../../shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'from-konvolut-iri-to-poem-iris',
  templateUrl: 'fromKonvolutIRIToPoemIRIs.component.html'
})
export class FromKonvolutIRIToPoemIRIsComponent implements OnChanges {
  @Input() konvolutIRI: string;
  @Output() sendPoemIRIsBack: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>
  i: number;
  poemIRIArray: Array<any>;

  constructor(private http: Http) {

  }
  ngOnChanges() {
    console.log('Get PoemIRIArray ' + this.konvolutIRI);
    this.poemIRIArray = [];
    this.performQuery(this.konvolutIRI);

  }
  performQuery(queryPart: string) {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/graphdata/' +
      encodeURIComponent(queryPart)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          for(this.i = 0; this.i < data.nodes.length; this.i ++) {
            if(
              data.nodes[this.i].resourceClassIri.split('#')[1] === 'HandwrittenPoem' ||
              data.nodes[this.i].resourceClassIri.split('#')[1] === 'PublicationPoem'
            ) {
              this.poemIRIArray[this.poemIRIArray.length]=data.nodes[this.i].resourceIri;
              console.log(data.nodes[this.i].resourceClassIri.split('#')[1];
              console.log(data.nodes[this.i];
            }
          }
          this.sendPoemIRIsBack.emit(this.poemIRIArray);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
}
