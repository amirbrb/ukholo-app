<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img ref="userAvater" class="profile-img" :src="'static/img/icons/icon.png'" alt="">
            <div class="form-signin">
              <div class="form-group has-feedback">
                <input name="email" v-model="userDetails.mail" type="email" 
                  v-validate data-vv-rules="required|email" :class="{'form-control': true, 'error-input': errors.has('email') }" 
                  placeholder="email">
                <span v-show="errors.has('email')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input name="password" v-model="userDetails.password" 
                  v-validate data-vv-rules="required" :class="{'form-control': true, 'error-input': errors.has('password') }" type="password"
                  placeholder="password">
                <span v-show="errors.has('password')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group text-center controls">
                <a class="btn btn-lg btn-primary" v-on:click="login">login</a>
              </div>
              <div class="form-group text-center controls checkbox checkbox-circle checkbox-success">
                <input ref="letMeStay" id="checkbox3" type="checkbox">
                <label for="checkbox3">
                    i wanna stay
                </label>
                <div ref="errors" id="errors" v-show="hasErrors" class="text-center alert alert-danger"></div>
              </div>
            </div>
          </div>
          <a href="#" v-on:click="showRegistration" class="text-center new-account">i am new here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LoginType from '../../enums/loginType'
import $ from 'jquery'

import MBBase from '../../MBBase.vue';
export default {
  extends: MBBase,
  name: 'Login',
  components: {},
  data () {
    return {
      hasErrors: false,
      userDetails: {
        mail: window.localStorage.mb_usercookie,
        password: ""
      }
    }
  },
  methods: {    
    login: function(){
      var self = this;
      self.$validator.validateAll({
        email: self.userDetails.mail,
        password: self.userDetails.password
      }).then((result) => {
        if(result){
          var url = '/login/login';
          var data = {
            mail: self.userDetails.mail,
            password: self.userDetails.password,
            gcmRegistrationId: window.localStorage.mb_registrationId,
            lat: self.currentLocation.lat,
            lng: self.currentLocation.lng
          };

          $.post(url, data, function(response){
            var data = response;
            self.hasErrors = !data.isSuccess;
            if(!data.isSuccess){
              self.$refs.errors.innerHTML = data.data.message;
            }
            else{
              if(self.$refs.letMeStay.checked){
                window.localStorage.mb_usercookie = self.userDetails.mail;
                window.localStorage.mb_passcookie = self.userDetails.password;
                window.localStorage.mb_loginType = LoginType.mail;
              }
              self.$refs.userAvater.src = self.imagesDomain + data.data.userData.avatar;
              localStorage.mb_token = data.data.token;
              setTimeout(function(){
                self.$emit('loggedIn', data.data.userData, data.data.token);
              }, 200)
            }
          }).fail(function(e){
            self.hasErrors = true;
            self.$refs.errors.innerHTML = 'an error occured, please try again';
            //TBD: handle error
          }); 
        }
      });
    },
    showRegistration: function(){
      this.$emit('showRegistration');
    }
  }
}

</script>

<style scoped>

#login{
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%
}

.form-signin
{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

}
.form-signin input[type="password"]
{
    margin-top: 5px;
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    padding: 25px 0px 0px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 5px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.controls{
  margin-top: 10px;
}

.btn{
  width:100px;
}

.new-account
{
    display: block;
    margin-top: 10px;
}

#errors{
  margin-top: 10px;
}

</style>
