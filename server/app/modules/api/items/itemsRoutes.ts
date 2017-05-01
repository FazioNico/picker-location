/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import * as express from 'express';
import { itemController }  from "../../mongodb/items/items.controller";
import { log } from '../../log';

var router = express.Router();

export class ItemsRoutes {

    private _ItemsController: any;

    constructor () {
        this._ItemsController = itemController;
    }

    routes() {
        var controller = this._ItemsController;
        router.get('/items', log, controller.getItems)
        router.get('/items/:id', log, controller.getItem)
        router.post('/items', log, controller.addItem )
        router.put('/items/:id', log, controller.updateItem )
        router.delete('/items/:id', log, controller.deleteItem )

        return router;
    }

}
