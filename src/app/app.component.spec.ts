/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   16-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-05-2017
 */

 import { async, TestBed, ComponentFixture } from '@angular/core/testing';
 import { IonicModule } from 'ionic-angular';

 import { StatusBar } from '@ionic-native/status-bar';
 import { SplashScreen } from '@ionic-native/splash-screen';

 import {} from 'jasmine';

 import { MyApp } from './app.component';

 import { MenuNavModule } from "../components/menu-nav/menu-nav.module";
 import { SearchBarModule } from "../components/search-bar/search-bar.module";
 import { GmapModule } from "../components/gmap/gmap.module";

 import { NgRxStoreModule } from "../store/store.module";
 import { MainActions } from '../store/actions/mainActions';
 import * as fromAuthCheck from '../store/reducers/authCheckedReducer';

 // Import Root Providers
 import { GeolocationService } from '../providers/geolocation-service/geolocation-service';
 import { Geolocation } from '@ionic-native/geolocation';

 describe('MyApp Component', () => {

   let component:MyApp;
   let fixture: ComponentFixture<MyApp>;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       declarations: [MyApp],
       imports: [
         IonicModule.forRoot(MyApp),
         NgRxStoreModule,
         MenuNavModule,
         SearchBarModule,
         GmapModule
       ],
       providers: [
         StatusBar,
         SplashScreen,
         Geolocation,
         GeolocationService
       ]
     })
   }));

   beforeEach(() => {
     fixture = TestBed.createComponent(MyApp);
     component = fixture.componentInstance;
   });

   it ('should be created', () => {
     expect(fixture).toBeTruthy();
 		 expect(component).toBeTruthy();
     expect(component instanceof MyApp).toBe(true);
   });

   it ('should app initialise with a root page of LoginPage', () => {
    component.ngOnInit();
    expect(component['rootPage']).toBe('LoginPage');
   });

   /**
    * NgRx Testing Reducer: AuthCheck
    * Inspiration from: http://redux.js.org/docs/recipes/WritingTests.html
    */
   it('should return correct state when user is not autenticate', () => {
       const state = { authChecked: false };
       const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_NO_USER});
       const expected = state;
       expect(actual).toEqual(expected);
   });

   it('should return correct state when user is autenticate', () => {
       const state = { authChecked: true };
       const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_SUCCESS});
       const expected = state;
       expect(actual).toEqual(expected);
   });

   it('should return correct state when check autentication failed', () => {
       const state = { authChecked: false };
       const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_FAILED});
       const expected = state;
       expect(actual).toEqual(expected);
   });

   it('should return correct state when user login success', () => {
       const state = { authChecked: true, currentCreds: 'TOKEN_MOCKUP' };
       const actual = fromAuthCheck.reducer(state, {type: MainActions.LOGIN_SUCCESS,payload: {token:'TOKEN_MOCKUP'} });
       const expected = state;
       expect(actual).toEqual(expected);
   });

   it('should return correct state when user logout success', () => {
       const state = { authChecked: false };
       const actual = fromAuthCheck.reducer(state, {type: MainActions.TOKEN_DELETE });
       const expected = state;
       expect(actual).toEqual(expected);
   });
 });
