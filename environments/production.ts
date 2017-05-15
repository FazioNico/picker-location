/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-05-2017
 */

 import { IEnvironment } from "./env-model";

 export const prodVariables:IEnvironment = {
   environmentName: 'Production Environment',
   ionicEnvName: 'prod',

   // TODO: Change wuth your own prod environment variable
   // Front-end
   apiEndpoint: 'http://localhost:8080',

   // Back-end
   dbHost: 'mongodb://picker_location:wCuLXZ8NYX@ds127321.mlab.com:27321',
   dbName: 'picker_location'
 };
