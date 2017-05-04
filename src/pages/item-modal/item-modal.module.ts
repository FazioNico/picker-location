/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-05-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemModal } from './item-modal';

@NgModule({
  declarations: [
    ItemModal,
  ],
  imports: [
    IonicPageModule.forChild(ItemModal),
  ],
  exports: [
    ItemModal
  ]
})
export class ItemModalModule {}
