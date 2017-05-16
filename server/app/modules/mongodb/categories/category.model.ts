/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-05-2017
*/

import * as mongoose from 'mongoose';
// Import Schemas
import { categorySchema } from './category.schema';

export interface ICategoryModel extends mongoose.Document {
  title: string;
  color: string;
  coords: string;
  user_id:string;
}

// Define & export Mongoose Model with Interface
export const Category = mongoose.model<ICategoryModel>('categories', categorySchema);
