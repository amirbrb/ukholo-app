<template>
  <div id="register">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img ref="userAvater" class="profile-img" :src="'static/img/icons/icon.png'" alt="">
            <div class="registration-form" v-bind:style="{ display: step == 1 ? null : 'none'}">
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
                <a class="btn btn-lg btn-primary next" @click="next">next</a>
              </div>
            </div>
            <div class="registration-form" v-bind:style="{ display: step == 2 ? null : 'none'}">
              <div class="form-group has-feedback">
                <input name="name" v-model="userDetails.name" 
                  v-validate data-vv-rules="required" :class="{'form-control': true, 'error-input': errors.has('name') }" 
                  placeholder="name">
                <span v-show="errors.has('name')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input name="phone" v-model="userDetails.phone" 
                  v-validate data-vv-rules="required|numeric" type="number" :class="{'form-control': true, 'error-input': errors.has('phone') }" 
                  placeholder="phone number">
                <span v-show="errors.has('phone')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <label class="file-container">
                  <a class="btn btn-default file-loader">
                    <span class="fa fa-upload"></span> avatar
                  </a>
                  <input ref="images" type="file" @change="avatarSelected" multiple/>
                </label>
              </div>
              <div class="form-group text-center">
                <a class="btn btn-lg btn-primary prev" @click="prev">prev</a>
                <a class="btn btn-lg btn-success next" @click="register">done</a>  
                <div ref="errors" id="errors" v-show="hasErrors" class="text-center alert alert-danger"></div>
              </div>
            </div>
          </div>
          <a href="#" v-on:click="showLogin" class="text-center old-account">i have an account</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
import MBBase from '../../MBBase.vue';
export default {
  extends: MBBase,
  name: 'Login',
  components: {
    
  },
  data () {
    return {
      hasErrors: false,
      step: 1,
      isRegistering: false,
      userDetails: {
        mail: "",
        password: "",
        name: "",
        phone: "",
        avatar: null
      }
    }
  },
  methods: {
    next: function(){
      var self = this;
      self.$validator.validateAll({
        email: self.userDetails.mail,
        password: self.userDetails.password
      }).then((result) => {
        if(result){
          self.step += 1;
        }
      });
    },
    prev: function(){
      this.step-=1;
    },
    avatarSelected: function(){
      var self = this;
      var imageInput = self.$refs.images;
      var file = imageInput.files[0];
      var dataUri = window.URL.createObjectURL(file);
      self.$refs.userAvater.src = dataUri;
      self.userDetails.avatar = file;
    },
    register: function (){
      var self = this;
      self.$validator.validateAll({
        name: self.userDetails.name,
        phone: self.userDetails.phone
      }).then((result) => {
        if(result){
          var url = '/login/register';
          const formData = new FormData();
          formData.append('mail', self.userDetails.mail);  
          formData.append('password', self.userDetails.password);  
          formData.append('name', self.userDetails.name);
          formData.append('phoneNumber', self.userDetails.phone);
          formData.append('gcmRegistrationId', window.localStorage.mb_registrationId);
          formData.append('avatar', self.userDetails.avatar);
          formData.append('lat', self.currentLocation.lat);
          formData.append('lng', self.currentLocation.lng);
          
          $.ajax({
              url: url, 
              data: formData, 
              processData: false,
              contentType: false
            }).done(function(response){
              var data = response;
              self.hasErrors = !data.isSuccess;
              if(!data.isSuccess){
                self.$refs.errors.innerHTML = data.data.message;
              }
              else{
                self.$refs.userAvater.src = self.imagesDomain + data.data.userData.avatar;
                localStorage.mb_token = data.data.token;
                setTimeout(function(){
                  self.$emit('registered', data.data.userData, data.data.token)
                }, 200)
              }
            }).fail(function(e){
              self.hasErrors = true;
              console.error(e);
              ///TBD - handle logs
            }
          );
        }
      });
    },
    showLogin: function(){
      this.$emit('showLogin');
    }
  }
}

</script>

<style scoped>

#register{
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%
}

.registration-form
{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.registration-form
{
    margin-bottom: 10px;
}
.registration-form .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.registration-form .form-control:focus
{
    z-index: 2;
}
.registration-form input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

}
.registration-form input[type="password"]
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

.controls{
  margin-top: 15px;
  margin-bottom: 15px;
}

.next, .prev{
  width:100px;
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

#errors{
  margin-top: 10px
}

.old-account
{
    display: block;
    margin-top: 10px;
}

.file-container {
  overflow: hidden;
  position: relative;
  width: 80%;
}

.file-container [type=file] {
  cursor: inherit;
  display: block;
  font-size: 999px;
  filter: alpha(opacity=0);
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: right;
  top: 0;
}

</style>
