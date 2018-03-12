<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="mb-navbar-header">
        <i class="fa fa-bell-o" :counter="$store.getters.notificationsCounter > 10 ? '10+' : $store.getters.notificationsCounter" aria-hidden="true"></i>
        <label>
          <router-link :to="'/'" class="mb-navbar-brand">Ukholo</router-link>
          <p> someone to trust </p>
        </label>
        <img class="mb-navbar-logo" :src="'/static/img/icons/icon.png'"/>
        <a id="toggle" @click="toggleSettings" :class="{'on' : navbarIsOpen}"><span></span></a>
      </div>
    </div>
  </nav>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase,
    data() {
      return {
        
      }
    },
    props: [],
    methods:{
      toggleSettings() {
        var self = this;
        if(!self.navbarIsOpen){
          self.$router.push('/settings');
        }
        else{
          self.$router.back();
        }
      }
    },
    computed: {
      navbarIsOpen(){
        return this.$route.fullPath.indexOf('settings') > 0;
      } 
    }
  }
</script>
<style scoped>
  .navbar{
    height: 80px;
    padding-top: 10px;
  }

  .mb-navbar-header{
    width: 100%;
    text-align: center;
  }

  .mb-navbar-logo{
    height: 40px;    
    position: absolute;
    top: 20px;
  }

  .mb-navbar-brand{
    color: #777;
    font-size: 26px;
  }

  .navbar-close{
    height: 15px;
  }

  /* Important styles */
  #toggle {
    display: block;
    width: 28px;
    height: 30px;
    position: absolute;
    right: 25px;
    top: 40px;
    cursor: pointer;
  }

  #toggle span:after,
  #toggle span:before {
    content: "";
    position: absolute;
    left: 0;
    top: -9px;
  }
  #toggle span:after{
    top: 9px;
  }
  #toggle span {
    position: relative;
    display: block;
  }

  #toggle span,
  #toggle span:after,
  #toggle span:before {
    width: 100%;
    height: 5px;
    background-color: #888;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 2px;
  }

  /* on activation */
  #toggle.on span {
    background-color: transparent;
  }
  #toggle.on span:before {
    transform: rotate(45deg) translate(5px, 5px);
  }
  #toggle.on span:after {
    transform: rotate(-45deg) translate(7px, -8px);
  }
  #toggle.on + #menu {
    opacity: 1;
    visibility: visible;
  }

  .fa-bell-o{
    position: absolute;
    font-size: 40px;
    left: 20px;
    top: 22px;
  }
  .fa-bell-o:after {
    position: absolute;
    content:attr(counter);
    top: 18px;
    right: 3px;    
    height: 20px;
    min-width: 20px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 16px;
    font-size: 15px;    
    line-height: 20px;
    text-align: center;
    background: red;
    color: white;
  }
</style>
