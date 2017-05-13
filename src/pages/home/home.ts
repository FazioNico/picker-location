/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 12-05-2017
*/

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events, ModalController, Modal } from 'ionic-angular';
// NgRx Store
import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
// Store tools
import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';
import { ICategoriesState } from '../../store/reducers/categoriesReducer';
// Observable Services
import { GeolocationService } from '../../providers/geolocation-service/geolocation-service';
// declare google to prevent type error
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userPosition:{lat:number, lng:number} = {lat:46.1040100, lng:6.1616500}
  public storeInfo:Observable<AppStateI>;
  public storeDatas:Observable<any>;
  public storeCategories:Observable<ICategoriesState>;
  public categories: ICategoriesState = [];

  @ViewChild('map') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    private store: Store<any>,
    private mainActions: MainActions,
    private _geoLocatService: GeolocationService,
    public events: Events,
    public modalCtrl: ModalController
  ) {
    //this.loadGoogleSDK();

    // Dispatch Store Action
    this.store.dispatch(<Action>this.mainActions.get_categories_array('/categories'));
    this.store.dispatch(<Action>this.mainActions.get_data_array('/items'));
    // Select Store State
    this.storeInfo = this.store.select((state:AppStateI) => state )
    this.storeDatas = this.storeInfo.map((state:AppStateI) => state.dataArray.dataArray )
    this.storeCategories = this.storeInfo.map((state:AppStateI) => state.categoriesArray )
    // map each item with the correct category finded in storeCategories.state
    this.storeCategories.subscribe((state:ICategoriesState) => {
      this.categories = state
    })
    this.storeDatas = this.storeDatas.map(
      state => state.map(
        item => Object.assign({}, item, {category: this.categories.filter(cat => cat._id === item.category)[0]})
      )
    )
    // Load Native Geolocation plugin
    this.startGeolocation();
    /**
    * Catch Ionic custom Events from MenuSide
    * View doc:http://ionicframework.com/docs/api/util/Events/
    */
    this.events.subscribe('filter:select', (filter) => {
      this.filterCategoriesMarkerArray(filter)
      //this.store.dispatch(<Action>this.mainActions.datasFilterBy(filter));
    });
  }

  /**
  * Bof Event Methode
  */
  presentModal():void {
    let modal:Modal = this.modalCtrl.create('ItemModal', {coords: this.userPosition});
    modal.present();
  }

  onLogout():void{
    this.store.dispatch(<Action>this.mainActions.logout());
  }

  onInfoWindow(item){
    console.log('onInfoWindow-> ', item)
    let modal:Modal = this.modalCtrl.create('ItemModal', {coords: this.userPosition, item});
    modal.present();
  }
  /**
  * Bof SearchBar & menu side filter methode
  */
  onSearch(filter:any):void{
    console.log('filter search-> ', filter)
    if(filter=== null){
      this.storeDatas = this.storeInfo
                              .map((state:AppStateI) => state.dataArray.dataArray )
                              .map(state=> state.map(
                                  item => Object.assign({}, item, {category: this.categories.filter(cat => cat._id === item.category)[0]})
                                )
                              )
    }
    else {
      this.storeDatas = this.storeInfo
                              .map((state:AppStateI) => state.dataArray.dataArray )
                              .map(state => state.filter(
                                  item=> (item.description)?item.description.toLowerCase().indexOf(filter.toLowerCase()) > 0:null
                                ).map(
                                  item => Object.assign({}, item, {category: this.categories.filter(cat => cat._id === item.category)[0]})
                                )
                              );
    }
  }

  filterCategoriesMarkerArray(filter:string|null):void{
    console.log('filter cat')
    this.storeDatas = this.storeInfo
                          .map((state:AppStateI) => state.dataArray.dataArray )
                          .map(state=> state.filter(item => {
                              if(item.category){
                                if(filter != null && item.category=== filter){
                                  return item
                                }
                                if(filter === null){
                                  return item
                                }
                              }
                            }).map(
                              item => Object.assign({}, item, {category: this.categories.filter(cat => cat._id === item.category)[0]})
                            )
                          );
  }

  /**
  * Bof Geolocation Methode
  */
  startGeolocation():void{
    this._geoLocatService.startGeolocation()
    this._geoLocatService.subscribe(
      data => {
        this.geolocationResult(data)
      },
      err => {
        this.geolocationResult(err)
      }
    );
  }

  // Geolocation onSuccess: Get the current location
  geolocationResult(data):void {
    console.log('geolocationResult',data);
    if(!data.position) {
      //console.log("Error onGeolocation")
      return
    }
    // asign user location
    this.userPosition = data.position;
  }
  /**
  * Eof Geolocation Methode
  */
}
