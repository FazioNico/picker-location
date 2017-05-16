/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   02-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-05-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuNavComponent } from './menu-nav';

@NgModule({
  declarations: [
    MenuNavComponent,
  ],
  imports: [
    IonicPageModule.forChild(MenuNavComponent),
  ],
  exports: [
    MenuNavComponent
  ]
})
export class MenuNavModule {}
