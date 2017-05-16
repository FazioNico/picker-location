/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-05-2017
 */

 import { Action } from "@ngrx/store";
 import { MainActions } from '../actions/mainActions';

 export interface Category {
     _id: string;
     title: string;
     color: string;
     coords: string;
     user_id: string;
 }
 export interface ICategoriesState extends Array<Category>{}

 export const intitialState:ICategoriesState = []

 export function reducer (state:ICategoriesState = intitialState, action:Action):ICategoriesState {
     //console.log('ARRAY DATAS REDUCER-> ', action);
     switch (action.type) {
       case MainActions.GET_CATEGORIES_ARRAY: {
         return Object.assign([], state)
       }
       case MainActions.GET_CATEGORIES_ARRAY_SUCCESS: {
         return Object.assign([], state, action.payload )
       }

       case MainActions.LOGOUT_SUCCESS: {
         return Object.assign({}, intitialState)
       }
       default: {
         return <ICategoriesState>state;
       }
     }
 };
