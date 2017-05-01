/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import * as mongoose from 'mongoose';
// Import Schemas
import { itemSchema } from './item.schema';

export interface IItemModel extends mongoose.Document {
  description: string;
  coords: {};
  user_id:string;
  category: string;
  datetime: Date;
}

// Define & export Mongoose Model with Interface
export const Item = mongoose.model<IItemModel>('items', itemSchema);
