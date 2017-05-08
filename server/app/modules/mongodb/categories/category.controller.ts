/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-05-2017
*/

import * as mongoose from 'mongoose';
import { Category, ICategoryModel } from './category.model';
import { Item, IItemModel } from '../items/item.model';

import {Authentication} from '../../authentication';

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const categoriesController = {
	getCategories : (req,res) => {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
    		Category
          .find({ user_id : _uid.toString() })
          .exec((err, docs:ICategoryModel[]) => {
      			if(err) return console.log(err);
      			res.json(docs);
      		})
      }
      else {
        res.json([]);
      }
    })
	},
	getCategory : (req,res) => {
		Category.findById(toObjectId(req.params.id), (err, doc:ICategoryModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	deleteCategory : (req,res) => {
		Category.findByIdAndRemove(toObjectId(req.params.id),  (err, doc:ICategoryModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	addCategory : (req,res) =>{
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
        let newCategory = req.body.cat
        let newItem = req.body.item

        newCategory.user_id = _uid;
    		(new Category(<ICategoryModel>newCategory)).save((err, docCat:ICategoryModel) => {
    			if(err) return console.log(err);
          // No error-> save Item category
          newItem.category = docCat._id;
      		(new Item(<IItemModel>newItem)).save((err, docItem:IItemModel) => {
      			if(err) return console.log(err);
            // return docItem result success
      			//res.json(docItem);
            res.json(docItem);
      		})
    			//res.json(docCat);
    		})
      }
      else {
        return console.log('error add item');
      }
    })
	},
	updateCategory : (req,res) => {
		let updateCategory = <ICategoryModel>req.body;
		delete updateCategory._id;
		Category.update({_id: toObjectId(req.params.id)}, updateCategory, (err, doc:ICategoryModel)=>{
			if(err) return console.log(err);

      updateCategory._id = req.params.id;
      let response = {
        result:true,
        response: updateCategory
      };
			res.json(response);
		})
	},

}
