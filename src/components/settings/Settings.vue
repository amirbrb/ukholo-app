<template>
  <div class="settings">
    <ul class="nav nav-tabs">
      <li class="active">
        <a data-toggle="tab" href="#profile" @click="selectedSettingsType = 1"><i class="fa fa-user-circle" aria-hidden="true"></i></i></a>
      </li>
      <li>
        <a data-toggle="tab" href="#userTools" @click="selectedSettingsType = 2"><i class="fa fa-heart" aria-hidden="true"></i></i></a>
      </li>
      <li>
        <a data-toggle="tab" href="#userEvents" @click="selectedSettingsType = 3"><i class="fa fa-list" aria-hidden="true"></i></i></a>
      </li>
    </ul>
    <div class="tab-content">
      <div id="profile" 
        :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 1, 'active' : selectedSettingsType === 1}" v-if="selectedSettingsType === 1">
        <Profile :userId="$parent.userData.userId" v-if="selectedSettingsType === 1" v-on:logout="logout"></Profile>
      </div>
    </div>
    <div class="tab-content">
      <div id="userTools" 
        :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 2, 'active' : selectedSettingsType === 2}" v-if="selectedSettingsType === 2">
        <UserTools :userId="$parent.userData.userId" :selectedTools="$parent.userData.tools"></UserTools>
      </div>
    </div>
    <div class="tab-content">
      <div id="userEvents" 
        :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 3, 'active' : selectedSettingsType === 3}" v-if="selectedSettingsType === 3">
        <UserEvents :userId="$parent.userData.userId"></UserEvents>
      </div>
    </div>
  </div>
</template>

<script>
  import About from './About'
  import Profile from './Profile'
  import UserEvents from './UserEvents'
  import UserTools from './UserTools'
  import MBBase from '../../MBBase';
  import SettingsType from '../../enums/SettingsType.js'
  window.SettingsType = SettingsType
  export default {
    extends: MBBase,
    components: {
      About, 
      Profile,
      SettingsType,
      UserEvents,
      UserTools
    },
    methods: {
      logout(){
        window.localStorage.removeItem('mb_usercookie');
        window.localStorage.removeItem('mb_passwordcookie');
        window.localStorage.removeItem('mb_loginType');
        window.localStorage.removeItem('mb_registrationId');
        window.localStorage.removeItem('mb_token');
        
        var self = this;
        self.$store.commit('setUserData', null);
        self.$parent.isLoginForm = true;
        self.$router.replace('/');
      }
    },
    created(){
      this.SettingsType = SettingsType;
    },
    data(){
      return {
        selectedSettingsType: 1
      }
    }
  }
</script>
<style scoped>
	.settings{
    margin: 5px 5px 5px 5px;
		width: 97%;
    overflow-y:auto;
	}
</style>
