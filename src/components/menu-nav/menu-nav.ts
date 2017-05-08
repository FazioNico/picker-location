/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   02-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 08-05-2017
 */

import { Component} from '@angular/core';
import { Events } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { ICategoriesState } from '../../store/reducers/categoriesReducer';

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
export class MenuNavComponent{

  public categoriesArray:Observable<ICategoriesState>;

  constructor(
    public events: Events,
    private store: Store<any>
  ) {
    this.categoriesArray = this.store.select((state:AppStateI) => state.categoriesArray)
  }

  selectFilter(filterBy:string):void {
    /**
     * Publish Ionic custom Events
     * View doc:http://ionicframework.com/docs/api/util/Events/
     */
    //console.log('Filter selected')
    this.events.publish('filter:select', filterBy);
  }
}
