/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-05-2017
 */

import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';

import { GoogleMapService } from '../../providers/google-map-service/google-map-service';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy{

  public user:any;
  public userPosition:Object = {lat:46.2040100, lng:6.1616500}
  public storeInfo:Observable<AppStateI>;
  public storeDatas:Observable<any>;
  public categories: string[] = [];

  @ViewChild('map') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    private store: Store<any>,
    private mainActions: MainActions,
    private _googleMapService: GoogleMapService,
    public events: Events
  ) {
    this.loadGoogleSDK();
    this.store.dispatch(<Action>this.mainActions.get_data_array('/items'));
    this.storeInfo = this.store.select((state:AppStateI) => state.currentUser )
    this.storeDatas = this.store.select((state:AppStateI) => state.dataArray.dataArray )

    /**
     * Catch Ionic custom Events
     * View doc:http://ionicframework.com/docs/api/util/Events/
     */
    this.events.subscribe('filter:select', (filter) => {
      //console.log('filterBy', filter);
      this._googleMapService.clearMarkerArray(filter);
      //this.store.dispatch(<Action>this.mainActions.datasFilterBy(filter));
    });
  }

  goPage(page:string){
    this.navCtrl.push('ItemsPage')
  }

  onLogout():void{
    this.store.dispatch(<Action>this.mainActions.logout());
  }

  /* Bof - googleMap Methode */
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
    console.log('loadGoogleMapData')
    // check if map is alerady loaded and in case update user position
    // with updateUserMarkerPos(this.userLocation.position)
    // else load & set all Gmap data
    if(this._googleMapService.gmapEnable === false){
      console.log('create user position on map-> ', this._googleMapService.gmapEnable)
      this._googleMapService.setupMap(userPosition,this.mapElement); // TODO need native geoposition ready
      this._googleMapService.addUserMarker(userPosition) // add blue gps marker for user position
    }
    else {
      console.log('update user position-> ', this._googleMapService.gmapEnable)
      this._googleMapService.updateUserMarkerPos(userPosition)
    }
    //console.log('add all places position-> ', this._googleMapService.gmapEnable)
    this.storeDatas.subscribe(arrayItem => {
      arrayItem.map(item => {
        // add Google Map Marker
        this._googleMapService.addMarker(item);
        // implement array of all categories
        (this.categories.indexOf(item.category)<=-1)? this.categories = [...this.categories, item.category]: null;
      })
      console.log(this.categories);
      this.events.publish('categories:created', this.categories);
    })
  }

  ionViewWillLeave(){
  console.log('ionViewWillLeave')
  }
  ngOnDestroy(){
    console.log('destroy')
    // if(this._googleMapService) this._googleMapService.complete()
  }
}
