/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import * as mongoose from 'mongoose';
import { Item, IItemModel } from './item.model';

import {Authentication} from '../../authentication';

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const itemController = {
	getItems : (req,res) => {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
    		Item
          .find({ user_id : _uid.toString() })
          .exec((err, docs:IItemModel[]) => {
      			if(err) return console.log(err);
      			res.json(docs);
      		})
      }
      else {
        res.json([]);
      }
    })
	},
	getItem : (req,res) => {
		Item.findById(toObjectId(req.params.id), (err, doc:IItemModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	deleteItem : (req,res) => {
		Item.findByIdAndRemove(toObjectId(req.params.id),  (err, doc:IItemModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	addItem : (req,res) =>{
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
        let newItem = req.body
        newItem.user_id = _uid;
    		(new Item(<IItemModel>newItem)).save((err, doc:IItemModel) => {
    			if(err) return console.log(err);
    			res.json(doc);
    		})
      }
      else {
        return console.log('error add item');
      }
    })
	},
	updateItem : (req,res) => {
		let updateItem = <IItemModel>req.body;
		delete updateItem._id;
		Item.update({_id: toObjectId(req.params.id)}, updateItem, (err, doc:IItemModel)=>{
			if(err) return console.log(err);

      updateItem._id = req.params.id;
      let response = {
        result:true,
        response: updateItem
      };
			res.json(response);
		})
	},

}
