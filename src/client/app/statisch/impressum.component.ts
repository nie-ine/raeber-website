/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component } from '@angular/core';
import { Config } from '../shared/config/env.config';

@Component({
  moduleId: module.id,
  selector: 'rae-impressum',
  templateUrl: 'impressum.component.html'
})
export class ImpressumComponent {
  title = 'Impressum';
  releaseurl = Config.RELEASEURL;
  releaseversion = Config.RELEASEVERSION;
}
