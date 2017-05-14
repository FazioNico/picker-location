/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   11-05-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-05-2017
*/

import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output } from '@angular/core';
import { AlertController } from 'ionic-angular';
// Observable Services
import { GoogleMapService } from '../../providers/google-map-service/google-map-service';

import { svg } from './marker-svg';
import { GMAP_STYLE } from '../../providers/google-map-service/gmap_style';

declare var google;
/**
* Generated class for the Gmap component.
*
* See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
* for more info on Angular Components.
*/
@Component({
  selector: 'pickL-gmap',
  templateUrl: 'gmap.html'
})
export class GmapComponent implements OnInit, OnChanges{

  public gMap:any
  public gpsUserMarker:any
  public mapEnabeld:boolean = false;
  public bounds:any;
  public markersArray: any[] = [];

  @Input() datasInput: any[] = []
  @Input() userPosition: {lat:number, lng:number} = {lat:46.1040100, lng:6.1616500};
  @Output() emitInfoWindow: EventEmitter<any> = new EventEmitter();
  @ViewChild('map') mapElement: ElementRef;

  constructor(
    private _googleMapService: GoogleMapService,
    private alertCtrl:AlertController
  ) {
    this.loadGoogleSDK();
  }

  ngOnInit(){
    console.log('ngOnInit datasInput->', this.datasInput)
    this.datasInput.map(item => this.addMarker(item))
    console.log('ngOnInit markersArray->', this.markersArray)
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges->', changes)
    if(changes.datasInput && this.mapEnabeld){
      // console.log('change Datas->', this.datasInput, changes.datasInput.currentValue)
      this.clearMarkerArray()
      this.loadMarkersPosition()
    }
    if(changes.userPosition && this.mapEnabeld){
       //console.log('change userPosition->', changes, this.userPosition)
       this.updateUserMarkerPosition()
    }
  }

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
        if(this.userPosition && this._googleMapService.mapInitialised === true){
          // Controle Google Map
          if(this.mapEnabeld === false){
            this.loadGmap()
            this.loadUserMarkerPosition()
            this.loadMarkersPosition()
          }
          else {
            this.updateUserMarkerPosition()
          }
        }
      },
      err => {
        this.mapEnabeld = false
        console.log('error with google map sdk -> ', err);
      }
    )
  }

  loadGmap():void{
    this.gMap = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.userPosition,
      zoom: 13,
      scrollwheel: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      scaleControl: false,
      styles: GMAP_STYLE
    });
    this.mapElement.nativeElement.style.height = `${window.innerHeight}px`;
    this.mapEnabeld = true;
    this.bounds = new google.maps.LatLngBounds();
    console.log('loadGmap', this.mapEnabeld)
  }

  loadUserMarkerPosition():void{
    let pin = {
      path: 'M1,12a11,11 0 1,0 22,0a11,11 0 1,0 -22,0',
      fillColor: '#1998f7',
      fillOpacity: 1,
      scale: 1,
      strokeColor: '#1998f7',
      strokeWeight: 0
    };
    this.bounds = new google.maps.LatLngBounds();
    // add blue gps marker
    // let icon:any = new google.maps.MarkerImage('http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png',new google.maps.Size(30, 28),new google.maps.Point(0,0),new google.maps.Point(9, 28));
    this.gpsUserMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.userPosition.lat, this.userPosition.lng),
      map: this.gMap,
      title: "user-position",
      icon:pin}
    );
    this.bounds.extend(new google.maps.LatLng(this.userPosition.lat, this.userPosition.lng));
    // Add effect transition on user marker svg
    window.setInterval(()=> {
      var icon = this.gpsUserMarker.icon;
      (icon.strokeWeight === 0)? icon.strokeWeight = 3 : icon.strokeWeight = 0
      this.gpsUserMarker.setIcon(icon)
    }, 1000);
  }

  updateUserMarkerPosition():void{
    let newLatLng = new google.maps.LatLng(this.userPosition.lat, this.userPosition.lng);
    this.gpsUserMarker.setPosition(newLatLng);
    this.bounds.extend(newLatLng);
    this.gMap.fitBounds(this.bounds);
  }

  loadMarkersPosition():void{
    this.datasInput.map(item => this.addMarker(item))
    console.log('loadMarkersPosition-> ',this.markersArray)
  }

  addMarker(item):void{
    //console.log(item)
    let color = (item.category)? item.category.color : '#00ccbb';
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(item.coords.lat, item.coords.lng),
      map: this.gMap,
      title: item._id,
      // animation: google.maps.Animation.DROP,
      category: item.category,
      description: item.description,
      icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg(color)) },
      //zIndex:10
    })
    // add window box on click
    this.addOpenWindowEnvent(item,marker)
    this.bounds.extend(new google.maps.LatLng(item.coords.lat, item.coords.lng));
  	this.markersArray.push(marker);

    this.gMap.fitBounds(this.bounds);
  }

  addOpenWindowEnvent(item,marker):void{
    let contentString:string = `
      <div>
        <p>${item.description}</p>
      </div>`;
    google.maps.event.addListener(marker, 'click', ()=> {
      let alert = this.alertCtrl.create({
        title: (marker.category)? marker.category.title || 'Marker' : 'Marker',
        subTitle: contentString,
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Edit',
            handler: () => {
              console.log('Edit clicked', item);
              this.emitInfoWindow.emit(item)
            }
          }
        ]
      });
      alert.present();
    });
  }

  clearMarkerArray():void{
    this.markersArray = this.markersArray.filter(item=> {
      if(item.title != 'user-position'){
        item.setMap(null);
        return null
      }
      else {
        return item
      }
    })
    //console.log(this.markersArray);
  }

}
