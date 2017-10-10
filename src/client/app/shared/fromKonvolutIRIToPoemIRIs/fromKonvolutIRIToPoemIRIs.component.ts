import { Component, Input, Output, OnChanges, EventEmitter, OnInit } from '@angular/core';
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
  @Input() konvolutType: string;
  @Output() sendPoemIRIsBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() signalizeThatNoRequestDefined: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>
  i: number;
  poemIRIArray: Array<any>;
  rightProperty: string;

  constructor(private http: Http) {

  }



  ngOnChanges() {
    console.log('Get PoemIRIArray ' + this.konvolutIRI);
    this.poemIRIArray = [];
    if(this.konvolutIRI !== undefined) {
      this.performQuery(this.konvolutIRI);
    } else {
      this.signalizeThatNoRequestDefined.emit(undefined);
    }
    this.getRightProperty(this.konvolutType);
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
              data.nodes[this.i].resourceClassIri === this.rightProperty
            ) {
              this.poemIRIArray[this.poemIRIArray.length]=data.nodes[this.i].resourceIri;
              console.log(data.nodes[this.i].resourceClassIri.split('#')[1]);
              console.log(data.nodes[this.i].resourceClassLabel);
            }
          }
          this.sendPoemIRIsBack.emit(this.poemIRIArray);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
  getRightProperty(konvolutType: string) {
    console.log(konvolutType);
    if (konvolutType === 'poem notebook') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PoemNote';
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem manuscript convolute') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#HandwrittenPoem';
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem typescript convolute') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#TypewrittenPoem';
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem typescript convolute with image') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#TypewrittenPoem';
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'printed poem book publication') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PublicationPoem';
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poly-author publication convolute') {
      this.rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PublicationPoem';
      console.log('Right Property: ' + this.rightProperty);
    }
  }
}
