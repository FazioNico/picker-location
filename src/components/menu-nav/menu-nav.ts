/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   02-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-05-2017
 */

import { Component} from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the MenuNav component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'menu-nav',
  templateUrl: 'menu-nav.html'
})
export class MenuNavComponent {

  categories:string[] = [];

  constructor(public events: Events) {
    this.events.subscribe('categories:created', (categories) => {
      //console.log('categories:created', categories);
      this.categories = categories
    });
  }

  selectFilter(filterBy) {
    /**
     * Publish Ionic custom Events
     * View doc:http://ionicframework.com/docs/api/util/Events/
     */
    //console.log('Filter selected')
    this.events.publish('filter:select', filterBy);
  }

}
