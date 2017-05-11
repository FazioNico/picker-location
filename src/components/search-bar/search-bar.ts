/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   10-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-05-2017
 */

import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Searchbar } from 'ionic-angular';

/**
 * Generated class for the SearchBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pickL-search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

  @ViewChild('searchbar') searchbar:Searchbar;
  @Output() emitSearch: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
  /**
   * Bof SearchBare methode
   */
  focus(e:any):void{
    let el:any  = e.target;
    //console.log('check->', el.classList.value)
    if([...el.classList.value].indexOf('button-inner') >-1){
        //this.searchbar._searchbarInput.nativeElement.blur()
        this.closeSearch(e)
        return
    }
    if([...el.classList.value].indexOf('searchbar-search-icon') >-1){
        this.openSearch()
        return
    }
    if([...el.classList.value].indexOf('searchbar-input') <= -1){
      return
    }
    // if(!el.value){
    //   this.openSearch()
    // }
  }

  openSearch():void{
    //console.log('openSearch transform')
    let input:Element = this.searchbar._searchbarInput.nativeElement;
    this.searchbar.getElementRef().nativeElement.firstChild.classList.add('focus')
    this.searchbar.setElementClass('focus', true)
    input.classList.add('focus')
  }

  closeSearch(e:any):void{
    //console.log('closeSearch transform')
    let input:Element = this.searchbar._searchbarInput.nativeElement;
    this.searchbar.getElementRef().nativeElement.firstChild.classList.remove('focus')
    this.searchbar.setElementClass('focus', false)
    this.searchbar.setValue('')
    this.searchbar.inputBlurred(e)
    //input.blur()
    input.classList.remove('focus')
  }

  onSearch(event:any):void{
    this.emitSearch.emit(event.target.value || null)
  }

}
