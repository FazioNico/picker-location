/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-02-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-05-2017
*/

import { Injectable, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
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
  markersArray:any[] = [];
  bounds:any;
  map:any;
  infoWindow:any;
  gpsUserMarker:any;
  gmapEnable: boolean = false;

  constructor() {
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
           script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places&callback=mapInit';
         } else {
           script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
         }
         document.body.appendChild(script);
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
    this.mapInitialised = true;
    setTimeout(()=>{
      // console.log('google API init-> ', google)
      this.bounds = new google.maps.LatLngBounds();
      // this.infoWindow = new google.maps.InfoWindow();
      this.emit({
        result: true,
        message: 'google Map API init'
      })
    },100)
  }

  // setup google maps element
  setupMap(coords,mapElement:ElementRef):void{
    this.map = new google.maps.Map(mapElement.nativeElement, {
      center: {lat: coords.lat, lng: coords.lng},
      zoom: 11,
      scrollwheel: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      scaleControl: false
    });
    mapElement.nativeElement.style.height = `${window.innerHeight}px`;
    this.gmapEnable = true;
  }

  // add blue gps marker for user position
  addUserMarker(position):void{
    let pin = {
      path: 'M25.015 2.4c-7.8 0-14.121 6.204-14.121 13.854 0 7.652 14.121 32.746 14.121 32.746s14.122-25.094 14.122-32.746c0-7.65-6.325-13.854-14.122-13.854z',
      fillColor: '#1998f7',
      fillOpacity: 1,
      scale: 1,
      strokeColor: 'gold',
      strokeWeight: 0
    };

    this.markersArray = [];
    this.bounds = new google.maps.LatLngBounds();
    // add blue gps marker
    // let icon:any = new google.maps.MarkerImage('http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png',new google.maps.Size(30, 28),new google.maps.Point(0,0),new google.maps.Point(9, 28));
    this.gpsUserMarker = new google.maps.Marker({position: new google.maps.LatLng(position.lat, position.lng), map: this.map, title: "user-position", icon:pin});
    this.bounds.extend(new google.maps.LatLng(position.lat, position.lng));
    this.markersArray.push(this.gpsUserMarker);
  }

  // add marker to map and in array
  addMarker(item):void{
    // console.log('add marker-> ', item)
    let svg:Function = (color:string):string=> {return `
    <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      overflow="inherit">
        <path
          fill="${color}"
          d="M25.015 2.4c-7.8 0-14.121 6.204-14.121 13.854 0 7.652 14.121 32.746 14.121 32.746s14.122-25.094 14.122-32.746c0-7.65-6.325-13.854-14.122-13.854z"/>
    </svg>`};

    let marker:any;

    if(item.icon){
      let image = {
        url: item.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.coords.lat, item.coords.lng),
        map: this.map,
        title: item._id,
        icon: image,
        animation: google.maps.Animation.DROP,
        category: item.category
      });
    }
    else {
      let color = '#00ccbb';
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.coords.lat, item.coords.lng),
        map: this.map,
        title: item._id,
        animation: google.maps.Animation.DROP,
        category: item.category,
        icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg(color)) },
        //zIndex:10
      });

    }
    // add window box on click
    this.addOpenWindowEnvent(item,marker)

    this.bounds.extend(new google.maps.LatLng(item.coords.lat, item.coords.lng));
  	this.markersArray.push(marker);
    // console.log('addOpenWindowEnvent->', this.markersArray)

    // automatiquement du zoom de la carte afin que celle-ci affiche
    // l’ensemble des markers de la map (methode .fitBounds() de google Map API v3)
    this.map.fitBounds(this.bounds);
  }

  addOpenWindowEnvent(item, marker:any){
    let contentString:string = `
      <div>
        <p><b>${item._id}</b></p>
        <hr/>
        <p>${item.description}</p>
      </div>`;
    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    // this.infoWindow.setContent(contentString);
    google.maps.event.addListener(marker, 'click', ()=> {
      infoWindow.open(this.map, marker);
      // this.infoWindow.open(this.map, marker);
    });
  }

  updateUserMarkerPos(position:any):void{
    let newLatLng = new google.maps.LatLng(position.lat, position.lng);
    this.gpsUserMarker.setPosition(newLatLng);
  }

  clearMarkerArray(filter:string|null):void{
    let newBounds = new google.maps.LatLngBounds();
    if (filter === null){
      this.markersArray.map(marker => {
          marker.setMap(this.map)
          newBounds.extend(marker.getPosition());
      })
    }
    else {
      this.markersArray.map(marker => {
        if(marker.title != 'user-position'){
          //console.log(marker, filter)
          if(marker.category != filter){
            marker.setMap(null)
          }
          else {
            marker.setMap(this.map)
            newBounds.extend(marker.getPosition());
          }
        }
        else {
          newBounds.extend(marker.getPosition());
        }
      })
    }
    this.map.fitBounds(newBounds);
  }
}
