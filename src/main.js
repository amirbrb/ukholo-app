// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import HelpCaseView from './components/help/HelpCaseView'
import ChatBox from './components/help/ChatBox'
import MainView from './components/misc/MainView'
import Settings from './components/settings/Settings'
import Profile from './components/settings/Profile'
import ImageView from './components/misc/ImageView';
import EventForm from './components/misc/EventForm';
import $ from 'jquery'
import moment from 'moment';
import ApplicationConfiguration from './config/applicationConfiguration'
import { store } from './Store.js';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VeeValidate);
Vue.config.productionTip = false;

window.moment = moment;

const routes = [
  { path: '/', component: MainView },
  { path: '/help/event', component: EventForm },
	{ path: '/events/:id', component: HelpCaseView },
  { path: '/events/edit/:id', component: HelpCaseView, props: { isSelfEdit: true } },
  { path: '/events/chat/:id', component: ChatBox },
  { path: '/image/:id', component: ImageView },
  { path: '/users/:id/details/', component: Profile, props: { isReadOnly: true } },
	{ path: '/settings', component: Settings }
];

const router = new VueRouter({ routes });

window.onerror = function(message, file, line, column, error) {
  
}

window.addEventListener('native.keyboardshow', function(e){
  
});

document.addEventListener('deviceready', function(){
  /* eslint-disable no-undef */
  /* eslint-disable valid-typeof */

  var pushIsDefined = typeof PushNotification !== "undefined";
  if(pushIsDefined){
    var push = PushNotification.init({
      "android": {
        "senderID": "878990424337"
      },
      "ios": {
        "sound": true,
        "vibration": true,
        "badge": true,
        "categories": {},
        "windows": {}
      }
    });

    push.on('registration', function(data) {
      window.localStorage.mb_registrationId = data.registrationId;
    });

    push.on('notification', function(data) {
      window.vm.notifications.push(data);
    });

    push.on('error', function(e) {
      alert(e.message);
    });
  }
  
  init();  
}, false);

window.setTimeout(function() {
    var e = document.createEvent('Events'); 
    e.initEvent("deviceready", true, false); 
    document.dispatchEvent(e);
}, 100);

function init(){  
  const baseUrl = ApplicationConfiguration.baseDomain;
  $.ajaxSetup({
      beforeSend: function(xhr, options) {
        options.url = baseUrl + options.url;
        xhr.setRequestHeader("mb_token", localStorage.mb_token);
      },
      complete: function(a, b, c){
        console.log(a.responseJSON)
      },
      global: false,
      type: "POST"
  });

  window.vm = new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    store,
    router: router
  })
}
