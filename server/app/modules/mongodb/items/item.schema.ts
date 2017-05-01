/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import * as mongoose from 'mongoose';

export const itemSchema = new mongoose.Schema({
  	description: { type: String, required: true  },
    coords: {
      lat: { type: Number },
      lng: { type: Number }
    },
    user_id: { type: String, required: true  },
    category: { type: String, required: true  },
    datetime: { type: Number, default: Date.now() },
});
