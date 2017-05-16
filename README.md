#  Picker Location
work in process...

## Overview
Picker Location allows you to place GPS markers on a map to easily find them later.

This multiplatform application using Google Map, Native Geolocation Cordova pluging and working with NgRx Reactive Programming.

## Get Started

### Installation
- `$ nvm use 7`
- `$ npm install`

### Start
- `$ npm run start:dev` to start in dev mode
- `$ npm run start:prod` to start in prod mode (you have to config your production environments variable)

### Build
First add selected platform: `$ ionic platform add browser|ios|android` (one by one). Then you can build each platform with ionic CLI `$ ionic build browser|ios|android --prod`

And we have the following npm run script ready to use:
- `$ npm run build:browser` to build app browser version
- `$ npm run build:browser --prod` to build app browser version in Angular Prod mode

If you want, you can add your own build run script.

### Deploy
- `$ npm run deploy:server` to deploy server side on heroku
- `$ npm run deploy:client` to deploy client side on GitHub gh-pages

### Documentations
- `$ npm run docs`

open `./docs/index.html` to read documentation

## Server REST API Endpoints
````
ITEMS Endpoints

  path: http://localhost:8080/items
  autenticate: false
  methode: $_GET / $_POST

  path: http://localhost:8080/items/:id
  autenticate: false
  methode: $_GET / $_POST / $_DELETE

  ITEMS Endpoints

  path: http://localhost:8080/categories
  autenticate: false
  methode: $_GET / $_POST

  path: http://localhost:8080/categories/:id
  autenticate: false
  methode: $_GET / $_POST / $_DELETE

AUTH Endpoints

  path: http://localhost:8080/auth
  autenticate: false
  methode: $_POST

  path: http://localhost:8080/isauth
  autenticate: false/true
  methode: $_GET

  path: http://localhost:8080/signup
  autenticate: false
  methode: $_POST


USERS Endpoints

  path: http://localhost:8080/users
  autenticate: true
  methode: $_GET


  path: http://localhost:8080/users/:id
  autenticate: true
  methode: $_GET

````

## Documentation
App Documentations is generate by typeDoc. Use the following cmd to generate documentation
- `$ npm run docs` will generate Angular Application documentation and open the index doc in browser.

Heroku docs:
- get started doc for NodeJS
[https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git)
- how to use Heroku with NodeJS & Git [https://devcenter.heroku.com/articles/getting-started-with-nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
