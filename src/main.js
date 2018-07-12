// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './components/App'
import AxiosPlugin from './services//axios.js';
import MomentPlugin from './services//moment.js';
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

import {store} from './store'
import {router} from './router'

Vue.use(Vuetify)
Vue.use(VueSimplemde)
Vue.use(AxiosPlugin);
Vue.use(MomentPlugin);
Vue.config.productionTip = false;

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
    window.vm = new Vue({
      el: '#app',
      template: '<App />',
      components: { App },
      data: {},
      store,
      router: router
  })
}
