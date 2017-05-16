/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   11-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 12-05-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GmapComponent } from './gmap';
import { GoogleMapService } from '../../providers/google-map-service/google-map-service';

@NgModule({
  declarations: [
    GmapComponent,
  ],
  imports: [
    IonicPageModule.forChild(GmapComponent),
  ],
  providers: [
    GoogleMapService
  ],
  exports: [
    GmapComponent
  ]
})
export class GmapModule {}
