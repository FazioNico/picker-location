/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-05-2017
*/

import * as express from 'express';
import { categoriesController }  from "../../mongodb/categories/category.controller";
import { log } from '../../log';

var router = express.Router();

export class CategoriesRoutes {

    private _CategoriesController: any;

    constructor () {
        this._CategoriesController = categoriesController;
    }

    routes() {
        let controller = this._CategoriesController;
        router.get('/categories', log, controller.getCategories)
        router.get('/categories/:id', log, controller.getCategory)
        router.post('/categories', log, controller.addCategory )
        router.put('/categories/:id', log, controller.updateCategory )
        router.delete('/categories/:id', log, controller.deleteCategory )

        return router;
    }

}
