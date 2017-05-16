/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-02-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 12-05-2017
*/

import { Injectable, EventEmitter } from '@angular/core';
import { GMAP_API_KEY } from './apikey-config';

declare var google;

/*
  Generated class for the GoogleMapService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleMapService extends EventEmitter<any> {

  apiKey:string = GMAP_API_KEY || ''; // add you own API KEY
  mapInitialised:boolean = false;

  constructor(
  ) {
    super()
  }

  /* Google Map loading & Initiallisation */
  loadGoogleMap():void{
     //this.addConnectivityListeners();
     if(typeof google == "undefined" || typeof google.maps == "undefined" ){
       //console.log(document.getElementById('googleMaps'));
       if(navigator.onLine === true){
         //console.log("online, loading map");
         //Load the SDK with the callback
         window['mapInit'] = () => {
           this.initMap();
         }
         let script:HTMLScriptElement = document.createElement("script");
         script.id = "googleMaps";
         script.async = true;
         if(this.apiKey){
           script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
         } else {
           script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
         }
         document.body.appendChild(script);
       }
       else {
         console.log('Error: unable to add Google Map SKD-> Network Status: offline')
       }
     }
     else {
       if(navigator.onLine === true && !this.mapInitialised){
         //console.log("map ready");
         this.initMap();
       }
       else {
         this.disableMap();
       }
     }
  }

  /* Events Connectivity listener for Google Map */
  addConnectivityListeners():void{
     let onOnline = () => {
       setTimeout(()=> {
         if(typeof google == "undefined" || typeof google.maps == "undefined"){
           this.loadGoogleMap();
         }
         else {
           if(!this.mapInitialised){
             this.initMap();
           }
         }
       }, 1000);
     };
     let onOffline = ()=> {
       this.disableMap();
     };
     document.addEventListener('online', _=> onOnline, false);
     document.addEventListener('offline', _=> onOffline, false);
  }

  /* Google Map Core Methodes */
  disableMap():void{
    setTimeout(()=>{
      console.log('google API disable-> ', google)
      this.emit({
        result: false,
        message: 'google Map API disable'
      })
    },100)
  }

  initMap():void {
    console.log('init map')
    this.mapInitialised = true;
    setTimeout(()=>{
      this.emit({
        result: true,
        message: 'google Map API init'
      })
    },100)
  }

}
