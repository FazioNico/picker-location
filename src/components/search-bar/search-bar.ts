/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   10-05-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-05-2017
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
    // console.log('test-> ', this.searchbar.getElementRef().nativeElement.classList.contains('focus'))
    if(!this.searchbar.getElementRef().nativeElement.classList.contains('focus')){
      //console.log('focused->', el)
      this.openSearch()
      return
    }
    //console.log('already focused', el)
    if(el.classList.contains('button-inner')){
      console.log('unfocused', el)
      this.closeSearch(e)
    }
    return
    //return ;
    // if([...el.classList[0]].indexOf('button-inner') >-1){
    //     //this.searchbar._searchbarInput.nativeElement.blur()
    //     this.closeSearch(e)
    //     return
    // }
    // if([...el.classList[0]].indexOf('searchbar-search-icon') >-1){
    //     this.openSearch()
    //     return
    // }
    // if([...el.classList[0]].indexOf('searchbar-input') <= -1){
    //   this.openSearch()
    // }

    // if(!el.value){
    //   this.openSearch()
    // }
  }

  openSearch():void{
    console.log('openSearch transform', this.searchbar.getElementRef())
    console.log('openSearch transform', this.searchbar)
    let input:Element = this.searchbar._searchbarInput.nativeElement;
    this.searchbar.getElementRef().nativeElement.firstChild.classList.add('focus')
    //this.searchbar.getElementRef().nativeElement.firstChild.setAttribute( "class", "focus" )
    this.searchbar.setElementClass('focus', true)
    input.classList.add('focus')
    // input.setAttribute( "class", "focus" )
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
