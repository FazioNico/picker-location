/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   03-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 04-05-2017
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Searchbar } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';

/**
 * Generated class for the ItemModal component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
 @IonicPage({
   name: 'ItemModal',
   segment: 'item-modal'
 })
@Component({
  selector: 'item-modal',
  templateUrl: 'item-modal.html'
})
export class ItemModal {

  uid:string;
  form: FormGroup;
  //searchCategoryValue:string;
  coords:any;
  category:string;
  categories: string[];
  isVisible:boolean = false;
  selectedColor:string;
  public storeInfo:Observable<AppStateI>;
  @ViewChild('searchbar') searchbar:Searchbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    private store: Store<any>,
    private mainActions: MainActions
  ) {
    this.coords = this.navParams.get('coords')
    this.categories = this.navParams.get('categories')
    // this.category = this.categories[0]
    this.storeInfo = this.store.select((state:any) => state.currentUser )
    this.storeInfo.subscribe((state:any)=>{
      console.log('sub state->', state.currentUser._id)
      if(state.currentUser){
        this.uid = state.currentUser._id
      }
    })
    this.form = fb.group({
        description: ['', Validators.minLength(2)],
        category: ['', Validators.required],
      });
  }

  autoComplet():void{
    // Reset items back to all of the items
    this.categories = this.navParams.get('categories')
    // set val to the value of the searchbar
    let val:string = this.form.value.category;
    (val.length>1 )? this.isVisible = true : this.isVisible = false;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.categories = this.categories.filter((item) => {
        return(item.toLowerCase().indexOf(val.toLowerCase()) > -1)
      });
      (this.categories.length<=0)? this.isVisible = false : null;
    }
  }

  toogleSearch(item){
    //console.log(item, this.searchbar._value)
    this.isVisible = !this.isVisible
    this.form.value.category = item
    this.searchbar._value = item
    this.searchbar.setFocus()
  }

  save():void{
    console.log('save', this.form.value)
    let newItem = this.form.value;
    newItem.coords = {lat: this.coords.position.lat,lng: this.coords.position.lng};
    newItem.datetime = Date.now();
    newItem.user_id = this.uid;
    delete newItem.lat;
    delete newItem.lng;
    console.log('save ready->', newItem)
    // then send the todo ready to DatasService
    this.store.dispatch(<Action>this.mainActions.create_data( { path: '/items', params: newItem} ));
    this.dismiss()
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    console.log(this.category)
    this.viewCtrl.dismiss(data);
  }
}
