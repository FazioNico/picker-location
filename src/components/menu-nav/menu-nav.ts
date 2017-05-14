/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   02-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-05-2017
 */

import { Component} from '@angular/core';
import { MenuController, Events, AlertController } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';
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
  public authChecked:Observable<boolean>;

  constructor(
    public menuCtrl: MenuController,
    public events: Events,
    private store: Store<any>,
    private mainActions: MainActions,
    private alertCtrl: AlertController
  ) {
    this.categoriesArray = this.store.select((state:AppStateI) => state.categoriesArray)
    this.authChecked = this.store.select((state:AppStateI) => state.authCheck.authChecked)
  }

  selectFilter(filterBy:string):void {
    /**
     * Publish Ionic custom Events
     * View doc:http://ionicframework.com/docs/api/util/Events/
     */
    //console.log('Filter selected')
    this.events.publish('filter:select', filterBy);
  }

  onLogout(){
    let alert = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Do you want to log out ?',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
            this.menuCtrl.close();
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.menuCtrl.close();
            this.logoutUser()
          }
        }
      ]
    });
    alert.present();
    return Observable.create((observer) => {
      observer.next({ type: 'ERROR_DISPLAYED' })
    })
  }

  logoutUser():void{
    console.log('logoutUser->')
    this.store.dispatch(<Action>this.mainActions.logout());
  }
}
