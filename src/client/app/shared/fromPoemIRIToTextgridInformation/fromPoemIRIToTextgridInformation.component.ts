import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'from-poem-iri-to-textgrid-information',
  templateUrl: 'fromPoemIRIToTextgridInformation.component.html'
})
export class FromPoemIRIToTextgridInformationComponent implements OnChanges {
  @Input() poemIRIArray: Array<any>;
  @Output() sendPoemInformationBack: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>;
  i: number;
  poemInformation: Array<any>;

  constructor(private http: Http) {

  }
  ngOnChanges() {
    console.log('Get Information for this poem IRI: ');
    console.log("in fromPoem... " + this.poemIRIArray);
    this.poemInformation = [];
    for(this.i=0; this.i < this.poemIRIArray.length; this.i++) {
      console.log('get information for this poem:');
      this.getTitleAndDate(this.poemIRIArray[this.i],this.i);
      this.poemInformation[this.i] = [];
    }
    this.sendPoemInformationBack.emit(this.poemInformation);
  }
  getTitleAndDate(IRI: string, i: number) {
    console.log('get Title and Date' + IRI);
    this.performQuery(IRI, i);
  }
  performQuery(queryPart: string, i: number) {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(queryPart)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          this.poemInformation[i][0] = data.props['http://www.knora.org/ontology/text#hasTitle'].values[0].utf8str;
          console.log(this.poemInformation[i][0]);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
}
