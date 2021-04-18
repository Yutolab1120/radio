'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import * as Firebase from 'firebase/app';

import home from './compo/home.vue';
import setting from './compo/setting.vue';
import broadcast from './compo/broadcast.vue';
import radio from './compo/broacastclient.vue';

let firebaseConfig = {
  apiKey: "AIzaSyCAILJTCCoGeBwYo_7CY5McAgThUWQAS-E",
  authDomain: "radio-trentrash.firebaseapp.com",
  projectId: "radio-trentrash",
  storageBucket: "radio-trentrash.appspot.com",
  messagingSenderId: "97874970519",
  appId: "1:97874970519:web:b6f24dc28ea5f1058826d2"
};

Firebase.initializeApp(firebaseConfig);

Vue.use(Router);

const routes = [
  {path: '/', component:home},
  {path: '/setting', component:setting},
  {path: '/start/:id', component:broadcast},
  {path:'/radio/:id', component:radio}
];

const router = new Router({
  routes:routes,
  mode:'history'
});

new Vue({
  el:'#app',
  router:router
});
