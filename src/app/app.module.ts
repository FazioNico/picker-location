/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 12-05-2017
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Import Environment Variables Module
import { EnvironmentsModule } from "./environment/environment.module";

// Import ngrx Tools
import { NgRxStoreModule } from "../store/store.module";

// import App & RootPage & components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuNavModule } from "../components/menu-nav/menu-nav.module";
import { SearchBarModule } from "../components/search-bar/search-bar.module";
import { GmapModule } from "../components/gmap/gmap.module";

// Import Root Providers
import { GeolocationService } from '../providers/geolocation-service/geolocation-service';
import { Geolocation } from '@ionic-native/geolocation';


const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, ionicAppConfig),
    NgRxStoreModule,
    EnvironmentsModule,
    MenuNavModule,
    SearchBarModule,
    GmapModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GeolocationService
  ]
})
export class AppModule {}
