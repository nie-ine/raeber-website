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
  countRequests: number;
  poemInformation: Array<any>;

  constructor(private http: Http) {

  }
  ngOnChanges() {
    //console.log('Get Information for this poem IRI: ');
    console.log('PoemIRIArray: ');
    console.log(this.poemIRIArray);
    this.poemInformation = [];
    this.countRequests = 0;
    if(this.poemIRIArray !== undefined && this.poemIRIArray.length !== 0) {
      console.log('here');
      for(this.i=0; this.i < this.poemIRIArray.length; this.i++) {
        this.getTitleAndDate(this.poemIRIArray[this.i],this.i);
        this.poemInformation[this.i] = [];
      }
    } else {
      console.log('Konvolut found but no Poems found');
      this.sendPoemInformationBack.emit(this.poemInformation);
    }
  }
  getTitleAndDate(IRI: string, i: number) {
    //console.log('get Title and Date' + IRI);
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
          //console.log(data);
          this.poemInformation[i][0] = data.props['http://www.knora.org/ontology/text#hasTitle'].values[0].utf8str;
          this.poemInformation[i][1] = data.props['http://www.knora.org/ontology/human#hasCreationDate'].values[0].dateval1;
          this.poemInformation[i][3] = queryPart;
          this.poemInformation[i][4] = data.props['http://www.knora.org/ontology/knora-base#seqnum'].values[0];
          this.poemInformation[i][5] = [];
          for (let j = 0; j < data.incoming.length; j++ ) {
            if (data.incoming[ j ].ext_res_id.pid === 'http://www.knora.org/ontology/work#isExpressedIn') {
              this.poemInformation[i][5][j] = data.incoming[ j ].ext_res_id.id;
            }
          }
          //console.log(this.poemInformation[i][0]);
          //console.log(this.poemInformation[i][1]);
          this.performTextQuery(data.props['http://www.knora.org/ontology/kuno-raeber#hasEdition'].values[0], i);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
  performTextQuery(IRI: string, i: number) {
    //console.log('get Text: ' + IRI);
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(IRI)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          this.poemInformation[i][2] = data.props['http://www.knora.org/ontology/text#hasContent'].values[0].utf8str;
          //console.log(this.poemInformation[i][2]);
          this.countRequests += 1;
          if (this.countRequests = this.poemIRIArray.length) {
            this.sendPoemInformationBack.emit(this.poemInformation);
          }
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
}
