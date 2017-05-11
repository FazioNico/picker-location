/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   10-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-05-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBarComponent } from './search-bar';

@NgModule({
  declarations: [
    SearchBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(SearchBarComponent),
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule {}
