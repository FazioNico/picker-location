/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-05-2017
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { Store, Action } from '@ngrx/store'

import { MainActions } from '../../store/actions/mainActions';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'LoginPage',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public loginBtn:boolean = true;
  public userForm:any;
  public loader:any;
  public errorMessage:any;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController,
    private store: Store<any>,
    private mainActions: MainActions
  ) {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });
  }


  onLogin():void{
    //this.submitted = true;
    if (this.userForm.valid) {
      this.store.dispatch(<Action>this.mainActions.login(this.userForm));
    }
  }
  onSignup():void{
    if (this.userForm.valid) {
      this.store.dispatch(<Action>this.mainActions.create_user(this.userForm));
    }
  }

  toggleBtn():void{
    this.loginBtn = !this.loginBtn
  }

  /* ErrorHandler Methode */
  showError(text:string,hideLoading:boolean=true):void {
    if (hideLoading === true){
      setTimeout(() => {
        this.loader.dismiss();
      });
    }
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
