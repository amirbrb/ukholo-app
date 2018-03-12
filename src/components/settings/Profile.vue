<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img v-if="settings.avatar" ref="avatarPresent" :src="imagesDomain + settings.avatar" class="user-avatar"/>
        <input ref="userAvatar" type="file" accept="image/*" capture="capture" @change="avatarSelected" :disabled="isReadOnly" />
      </label>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="name">name:</label>
          <div class="col-xs-8 text-left">
            <input v-if="!isReadOnly" class="form-control ok-form-control" id="name" @blur="saveSettings" placeholder="name" v-model="settings.name" name="name">
            <label class="data" v-if="isReadOnly">{{settings.name}}</label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">phone:</label>
          <div class="col-xs-8 text-left">
            <input v-if="!isReadOnly" type="number" class="form-control ok-form-control" @blur="saveSettings" id="phone" placeholder="phone" v-model="settings.phoneNumber" :readonly="isReadOnly" name="phone">
            <label class="data" v-if="isReadOnly"><a :href="'tel:' + settings.phoneNumber">{{settings.phoneNumber}}</a></label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="mail">mail:</label>
          <div class="col-xs-8 text-left">
            <input v-if="!isReadOnly" type="mail" class="form-control ok-form-control" id="mail" @blur="saveSettings" placeholder="e-mail" v-model="settings.mail" :readonly="isReadOnly" name="mail">
            <label class="data" v-if="isReadOnly"><a :href="'mailto:' + settings.mail">{{settings.mail}}</a></label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">more details:</label>
          <div class="col-xs-8 text-left">
            <textarea v-if="!isReadOnly" v-model="settings.description" :readonly="isReadOnly" @blur="saveSettings" class="form-control"></textarea> 
            <label class="data" v-if="isReadOnly">{{settings.description}}</label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">gender:</label>
          <div class="col-xs-8 text-left">
            <label>
              <i :class="{fa:true, 'fa-male': true, selected: settings.gender == 1}" @click="saveSettings" aria-hidden="true">
                <input v-if="!isReadOnly" class="hidden" type="radio" name="gender"  value="1" :disabled="isReadOnly" v-model="settings.gender">
              </i>
            </label>
            <label>
              <i :class="{fa:true, 'fa-female': true, selected: settings.gender == 2}" @click="saveSettings" aria-hidden="true">
                <input v-if="!isReadOnly" class="hidden" type="radio" name="gender" value="2" :disabled="isReadOnly" v-model="settings.gender">
              </i>
            </label>
            <label>
              <i :class="{fa:true, 'fa-question-circle-o': true, selected: settings.gender == 3}" @click="saveSettings" aria-hidden="true">
                <input v-if="!isReadOnly" class="hidden" type="radio" name="gender" value="3" :disabled="isReadOnly" v-model="settings.gender">
              </i>
            </label>
          </div>
        </div>
      </form>
    </div>
    <div class="save-settings" v-if="!isReadOnly">
      <a class="btn btn-md btn-danger" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  import StateControl from '../misc/StateControl';
  import $ from 'jquery'
  export default {
    extends: MBBase,
    components: {
      StateControl
    },
    props: ['userId', 'isReadOnly'],
    data () {
      return {
        settings: {
          avatar: null,
          name: '',
          phoneNumber: '',
          description: '',
          gender: 3,
          goodAt: [],
          notificationSettings: {
            alertDistance: 5,
            showMeOnMap: false,
            onlyFriendsAlert: false
          },
          caseCount: 0,
          userId: this.userIdParam
        }, 
        uploadedAvatar: null
      }
    },
    computed: {
      userIdParam(){
        return this.userId || this.$route.params.id;
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
        var self = this;
        const url = '/users/' + self.userIdParam + '/details/';
        
        $.ajax({
          method: 'GET',
          url: url
        }).done(function(response){
          if(response.isSuccess){
            self.settings = response.data;  
          }
        }).fail(function(e) {
          //TBD: handke error
        });
      },
      avatarSelected() {
        var self = this;
        var imageInput = self.$refs.userAvatar;
        var imageContainer = self.$refs.avatarPresent;
        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          imageContainer.src = dataURL;
        };

        var image = imageInput.files[0];
        self.uploadedAvatar = image;
        reader.readAsDataURL(image);
        self.saveSettings();
      },
      saveSettings(){
        var self = this;
        const url = '/users/' + self.userId + '/settings/profile';
        const formData = new FormData();
        formData.append('settings', JSON.stringify(self.settings));  

        if(self.uploadedAvatar){
          formData.append('avatar', self.uploadedAvatar);  
        }

        $.ajax({
          url: url, 
          data: formData, 
          processData: false,
          contentType: false
        }).done(function(response){

        }).fail(function(e) {
          //TBD: handke error
        });
      },
      logout(){
        var self = this;
        self.$emit('logout');
      }
    }
  }
</script>
<style scoped>
	.profile{
    margin: 0px 5px 5px 5px;
    text-align: center;
  }

  .section{
    text-align: center;
    width: 100%;
    float: left;
    margin-top: 10px;
  }

  @media only screen and (max-width: 768px) {
      /* For mobile phones: */
      [class*="section"] {
          width: 100%;
      }
  }

  .user-avatar{
    width: 100px;
    height: 100px;
    border-radius: 150px;
  }

  .img-editor{
    z-index: 9999;
    font-size: 24px;
  }

  .save-settings{
    position: fixed;
    right:5px;
    bottom: 10px;
  }

  .section label.data{
    padding-top:8px;
  }

  i.fa.selected{
    font-size: 30px;
  }
</style>
