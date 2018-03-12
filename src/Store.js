import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userData: null,
    currentLocation: {},
    notifications: [],
  },
  actions: {
  	getLoginData: function(commit, requestData) {
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
		        self.commit('setLocation', response.data.userData.currentLocation);
      			self.state.notifications = response.data.notifications || [];
        	}
      	}).fail(function(e){
        	
      	});
  	}
  },
  getters: {
    isLoggedIn: state => {
      return state.userData != null;
    },
    notificationsCounter: state => {
      return state.notifications.length;
    }
  },
  mutations: {
  	setLocation: function(commit, currentLocation){
  		this.state.currentLocation = currentLocation;
  	},
    setUserData: function(commit, userData){
      this.state.userData = userData;
    },
    saveUserProfile: function(commit, profile){
      this.state.userData.profile = profile;
    },
    saveUserTools: function(commit, tools){
      this.state.userData.tools = tools;
    },
    saveUserPreferences: function(commit, preferences){
      this.state.userData.preferences = preferences;
    }
  }
})
