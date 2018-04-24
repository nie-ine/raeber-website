import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { KunoRaeber } from '../utilities/iris';
import { GraphDataQuery } from '../utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'from-konvolut-iri-to-poem-iris',
  template: ``
})
export class FromKonvolutIRIToPoemIRIsComponent implements OnChanges {
  @Input() konvolutIRI: string;
  @Input() konvolutType: string;
  @Output() sendPoemIRIsBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() signalizeThatNoRequestDefined: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>;
  i: number;
  poemIRIArray: Array<any>;
  rightProperty: string;

  constructor(private http: Http) {

  }


  ngOnChanges() {
    console.log('Get PoemIRIArray ' + this.konvolutIRI);
    this.poemIRIArray = [];
    if (this.konvolutIRI !== undefined) {
      this.performQuery(this.konvolutIRI);
    } else {
      this.signalizeThatNoRequestDefined.emit(undefined);
    }
    this.getRightProperty(this.konvolutType);
  }

  performQuery(queryPart: string) {
    return this.http.get(new GraphDataQuery(queryPart).depth(2).toString())
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          for (this.i = 0; this.i < data.nodes.length; this.i++) {
            if (
              data.nodes[ this.i ].resourceClassIri === this.rightProperty
            ) {
              this.poemIRIArray[ this.poemIRIArray.length ] = data.nodes[ this.i ].resourceIri;
              //console.log(data.nodes[this.i].resourceClassIri.split('#')[1]);
              //console.log(data.nodes[ this.i ].resourceClassLabel);
            }
          }
          this.sendPoemIRIsBack.emit(this.poemIRIArray);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response, error => console.log('Error: ', error));
  }

  getRightProperty(konvolutType: string) {
    console.log(konvolutType);
    if (konvolutType === 'poem notebook') {
      this.rightProperty = KunoRaeber.PoemNote;
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem manuscript convolute') {
      this.rightProperty = KunoRaeber.HandwrittenPoem;
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem typescript convolute') {
      this.rightProperty = KunoRaeber.TypewrittenPoem;
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poem typescript convolute with image') {
      this.rightProperty = KunoRaeber.TypewrittenPoem;
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'printed poem book publication') {
      this.rightProperty = KunoRaeber.PublicationPoem;
      console.log('Right Property: ' + this.rightProperty);
    } else if (konvolutType === 'poly-author publication convolute') {
      this.rightProperty = KunoRaeber.PublicationPoem;
      console.log('Right Property: ' + this.rightProperty);
    }
  }
}
