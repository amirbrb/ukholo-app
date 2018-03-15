import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import LoginType from './enums/loginType'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    initilized: false,
    userData: null,
    currentLocation: {},
    notifications: [],
    userTools: []
  },
  actions: {
    getStartUpData: function(commit, location){
      var self = this;

      var url, data;
      var loginTypeEnum = window.localStorage.mb_loginType;
      var usernameCookie = window.localStorage.mb_usercookie;
      var passwordCookie = window.localStorage.mb_passcookie;

      if(loginTypeEnum == LoginType.mail && usernameCookie && passwordCookie){
        url= "/login/relogin"
        data = {
          mail: usernameCookie,
          password: passwordCookie,
          gcmRegistrationId: window.localStorage.mb_registrationId,
          lat: location.lat,
          lng: location.lng
        };
      }
      else{
        url="/login/getStartupData";
        data = {
          lat: location.lat,
          lng: location.lng
        };
      }

      $.post(url, data, function(response){
        if(response.isSuccess){
          if(response.data.userData){
            window.localStorage.mb_token = response.data.token;
            self.commit('setUserData', response.data.userData);
            self.state.notifications = response.data.notifications || [];
          }

          self.state.userTools = response.data.startupData.userTools;
        }

        self.state.initilized = true;
      }).fail(function(err){
        console.log(err);
        self.state.initilized = true;
      }); 
    }
  },
  getters: {
    isInitialized: state => {
      return state.initilized;
    }, 
    isLoggedIn: state => {
      return state.userData != null;
    },
    notificationsCounter: state => {
      return state.notifications.length;
    }
  },
  mutations: {
  	setLocation: function(commit, currentLocation){
  		this.state.currentLocation = {
        lat: parseFloat(currentLocation.lat.toString()),
        lng: parseFloat(currentLocation.lng.toString())
      };
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
