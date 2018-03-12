<template>
  <div id="app">
    <transition name="fade">
      <Login v-on:loggedIn="userAuthenticated" v-on:showRegistration="showRegistration" v-if="!isLoggedIn && isLoginForm"></Login>
    </transition>
    <transition name="fade">
      <Register v-on:registered="userAuthenticated" v-on:showLogin="showLogin" v-if="!isLoggedIn && isRegistrationForm"></Register>
    </transition>
    <div class="data-viewer" v-if="isLoggedIn">
      <HeaderNavbar :notifications="notifications"></HeaderNavbar>
      <div class="view-router">
        <StateControl></StateControl>
        <EventControl v-if="isLoggedIn" :location="userData.preferences.sosControlLocation" 
          v-on:eventControlLocationChanged="eventControlLocationChanged"
          v-on:contextMenu="eventControlContextMenu">
        </EventControl>
        <EventContextMenu v-on:hideContextMenu="eventControlContextMenu" 
          :location="getEventControlLocation" :class="{'hidden': !isShowingContextMenu}">
        </EventContextMenu>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import ViewType from './enums/viewType'
import MBBase from './MBBase.vue';
import Login from './components/login/Login.vue';
import Register from './components/login/Register.vue';
import MainView from './components/misc/MainView.vue';
import HeaderNavbar from './components/misc/HeaderNavbar.vue';
import StateControl from './components/misc/StateControl.vue';
import EventControl from './components/misc/EventControl.vue';
import EventContextMenu from './components/misc/EventContextMenu.vue';
import LoginType from './enums/loginType'

export default {
  extends: MBBase,
  name: 'app',
  components: {
    Login,
    Register,
    MainView,
    HeaderNavbar,
    StateControl,
    EventControl,
    EventContextMenu
  },
  props: [],
  data () {
    return {
      isLoading: false,
      isLoginForm: true,
      isRegistrationForm: false,
      isShowingHelp: false,
      isShowingContextMenu: false
    }
  },
  computed:{
    getEventControlLocation(){
      return this.userData.preferences.sosControlLocation;
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn;
    }
  },
  created () {
    window.ViewType = ViewType;
    var self = this;
    if(navigator.geolocation){
      var geoLocationOptions = {
          enableHighAccuracy: true
      };

      var geoLoctionSuccess = function(position) {
          var coords = position.coords;
          var currentLocation = {
            lat: coords.latitude,
            lng: coords.longitude
          };

          self.$store.commit('setLocation', currentLocation);
          var usernameCookie = window.localStorage.mb_usercookie;
          var passwordCookie = window.localStorage.mb_passcookie;
          if(usernameCookie && passwordCookie){
            var loginTypeEnum = window.localStorage.mb_loginType;
          if(loginTypeEnum == LoginType.mail){
              self.$store.dispatch('getLoginData', {userName: usernameCookie, password: passwordCookie, currentLocation: currentLocation})
          }
        }
      };
      navigator.geolocation.getCurrentPosition(geoLoctionSuccess, console.log, geoLocationOptions);
    }

    self.watchGeolocation();
  },
  methods: {
    watchGeolocation() {
      var self = this;
      if (navigator.geolocation) {
        var watchOptions = {
          enableHighAccuracy: false,
          maximumAge: 0
        };

        navigator.geolocation.watchPosition(function(position){
          var coords = position.coords;
          self.$store.commit('setLocation', {lat: coords.latitude, lng: coords.longitude});
        }, function(err){
          console.log(err); //TBD - add proper logging
        }, watchOptions);
      }
    },
    userAuthenticated (userData, token){
      var self = this;
      self.$store.commit('setUserData', userData);
      localStorage.mb_token = token;
      self.isLoginForm = false;
      self.isRegistrationForm = false;
    },
    showRegistration (){
      var self = this;
      self.isLoginForm = false;
      self.isRegistrationForm = true;
    },
    showLogin (){
      var self = this;
      self.isLoginForm = true;
      self.isRegistrationForm = false;
    },
    eventControlLocationChanged (location){
      var self = this;
      self.userData.preferences.sosControlLocation = location;
      this.userSettingsChanged(self.userData.preferences, self.userData.userId);
    },
    eventControlContextMenu(show){
      this.isShowingContextMenu = show;
    }
  }
};

</script>

<style>

.fade-enter-active, .fade-leave-active {
  -webkit-transition: opacity 1.5s ease-in;
  transition: opacity 1.5s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-long-enter-active, .fade-long-leave-active {
  -webkit-transition: width 5s ease-out;
  transition: opacity 5s ease-out;
}

.fade-long-enter, .fade-long-leave-to {
  opacity: 0;
}

.fade-short-enter-active, .fade-short-leave-active {
  -webkit-transition: opacity 1s ease-out;
  transition: opacity 1s ease-out;
}

.fade-short-enter, .fade-short-leave-to {
  opacity: 0;
}

.main-view{
  width: 100%;
}

.data-container{
  height: 70vh; 
}

.view-router{
  position: absolute;;
  top: 80px;
  width: 100%;
}

</style>
