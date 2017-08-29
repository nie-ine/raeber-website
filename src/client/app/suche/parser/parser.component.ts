import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rae-parser',
  templateUrl: 'parser.component.html',
  styleUrls: [ 'parser.component.css' ]
})

export class ParserComponent implements OnChanges {

  @Input() inputSearchStringToBeParsed: string;

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.vocabulary);
    console.log('String to parse: ' + this.inputSearchStringToBeParsed);
  }
}
