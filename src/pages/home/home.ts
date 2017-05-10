/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-05-2017
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
import { GoogleMapService } from '../../providers/google-map-service/google-map-service';
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
    private _googleMapService: GoogleMapService,
    private _geoLocatService: GeolocationService,
    public events: Events,
    public modalCtrl: ModalController
  ) {
    this.loadGoogleSDK();
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
     * Catch Ionic custom Events
     * View doc:http://ionicframework.com/docs/api/util/Events/
     */
    this.events.subscribe('filter:select', (filter) => {
      // console.log('filterBy', filter);
      this._googleMapService.clearMarkerArray(filter);
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

  /**
   * Bof SearchBar methode
   */
  onSearch(event:any):void{
    this._googleMapService.filterSearch(event.target.value || null)
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
      //this.log.push("Error onGeolocation")
      return
    }
    // asign user location to display
    this.userPosition = data.position;
    if(google){
      this.loadGoogleMapData(this.userPosition)
    }
  }
  /**
   * Eof Geolocation Methode
   */


  /**
   * Bof Google Map Methode
   */
  loadGoogleSDK():void{
    this._googleMapService.loadGoogleMap()
    this._googleMapService.subscribe(
      data => {
        if(!data.result){
          console.log('error with google map sdk -> ', data);
          // this.log.push("Error with google map sdk");
          return;
        }
        console.log('google map sdk ready-> ', data, google);
        //let myLat = this._geolocationService.myLat
        //let myLng = this._geolocationService.myLng
        if(this.userPosition){
          this.loadGoogleMapData(this.userPosition);
        }
      },
      err => {
        console.log('error with google map sdk -> ', err);
        //this.log.push("Error with google map sdk");
      }
    )
  }

  loadGoogleMapData(userPosition):void{
    console.log('loadGoogleMapData', this._googleMapService.gmapEnable)
    // check if map is alerady loaded and in case update user position
    // with updateUserMarkerPos(this.userLocation.position)
    // else load & set all Gmap data
    if(this._googleMapService.gmapEnable === false){
      console.log('create user & element position on map-> ', this._googleMapService.gmapEnable)
      this._googleMapService.setupMap(userPosition,this.mapElement); // need native geoposition ready
      this._googleMapService.addUserMarker(userPosition) // add blue gps marker for user position
      //console.log('add all places position-> ', this._googleMapService.gmapEnable)
      this.storeDatas.subscribe(arrayItem => {
        arrayItem.map(item => {
          // add Google Map Marker
          this._googleMapService.addMarker(item);
        })
      })
    }
    else {
      //console.log('update user position-> ', this._googleMapService.gmapEnable, userPosition)
      this._googleMapService.updateUserMarkerPos(userPosition)
    }
  }


}
