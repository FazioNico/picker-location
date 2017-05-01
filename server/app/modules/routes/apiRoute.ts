/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import * as express from 'express';
import { ItemsRoutes }  from "../api/items/itemsRoutes";
import { UsersRoutes }  from "../api/users/users.routes";

const app = express();

export class APIRoutes {

    routes() {
        app.use("/", new ItemsRoutes().routes())
        app.use("/", new UsersRoutes().routes());
        return app;
    }

}
