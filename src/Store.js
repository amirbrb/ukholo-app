import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userData: {},
    currentLocation: {},
    notifications: []
  },
  actions: {
  	GetStartupData: function(commit, requestData) {
  		var self = this;
		var url = '/login/relogin';
  		var data = {
    		mail: requestData.userName,
        	password: requestData.password,
        	gcmRegistrationId: window.localStorage.mb_registrationId,
        	lat: requestData.currentLocation.lat,
        	lng: requestData.currentLocation.lng
      	};

      	$.post(url, data, function(response){
        	if(response.isSuccess){
          		window.localStorage.mb_token = response.data.token;
      			self.state.userData = response.data.userData;
      			self.state.notifications = response.data.notifications;
        	}
      	}).fail(function(e){
        	
      	});
  	}
  },
  mutations: {
  	SetLocation: function(commit, currentLocation){
  		this.state.currentLocation = currentLocation;
  	}
  }
})
