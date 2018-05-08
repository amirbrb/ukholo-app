<template>
  <div class="sos-request col-xs-12">
    <div class="form-group has-feedback event-title" style="margin-top: 20px;">
      <input name="title" v-model="help.title"
        class="form-control" 
        placeholder="tell others what is needed">
    </div>
    <div class="form-group has-feedback event-tools">
      <div v-for="userTool in $store.state.userTools" @click="eventToolSelected"
        :class="{'user-tool': true,  'col-xs-5': true}" :data-id="userTool.id">
        <div class="tool-title">{{userTool.title}}</div>
        <div :class="'tool-image fa fa-' + userTool.class"></div>
      </div>
    </div>
    <div class="form-group has-feedback event-description">
      <textarea name="description"  v-model="help.description"
        class="form-control" placeholder="describe others what is needed - try to be specific" rows="2"></textarea>
    </div>
    <div class="form-group has-feedback event-location">
      <input ref="autocomplete" class="form-control" placeholder="where sre you?" type="text">
      <span class="glyphicon glyphicon-map-marker col-xs-offset-1 form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback col-xs-8 col-md-3 event-images">
      <label class="file-container">
        <a class="btn btn-default file-loader">
          <span class="fa fa-upload"></span><p>Choose images</p>
        </a>
        <input ref="images" type="file" accept="image/*" @change="imagesSelected" multiple/>
      </label>
    </div>
    <div class="form-group col-xs-12">
      <div ref="imageContainer" id="imageContainer" class="images-container"></div>
    </div>
    <div class="form-group text-center col-xs-12">
      <a class="btn btn-primary call-help-btn" v-on:click="callHelp">SOS</a>
    </div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import StateControl from './StateControl.vue'
import Information from './Information.vue'
import axios from 'axios'
import $ from 'jquery';

var autocomplete;
var google = window.google;
export default {
  extends: MBBase,
  components: {
    Information,
    StateControl
  },
  data () {
    return {
      help: {
        title: '',
        selectedType: 'i just need some help',
        description: '',
        images: [],
        location: {},
        selectedTools: []
      }
    }
  },
  mounted(){
    var self = this;
    self.initAutocomplete();
  },
  methods: {
    hide(){
      var self = this;
      self.help.title = '';
      self.help.description = '';
      self.help.images = [];
      var container = self.$refs.imageContainer
      while (container.firstChild) {
          container.removeChild(container.firstChild);
      }
      self.$router.back();
    },
    eventToolSelected(){
      debugger;
      var self = this;
      var el = $(window.event.currentTarget);
      var toolId = parseInt(el.attr('data-id'));
      el.toggleClass('selected');
      
      if(el.hasClass('selected')){
        self.help.selectedTools.push(toolId);
      }
      else{
        var indexOf = self.help.selectedTools.indexOf(toolId);
        self.help.selectedTools.splice(indexOf, 1);
      }
    },
    initAutocomplete(){
      var self = this;
      autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        {types: ['geocode']}
      );

      var circle = new google.maps.Circle({
        center: self.currentLocation
      });
      autocomplete.setBounds(circle.getBounds());
      setTimeout(this.locateHelpLocation, 1000);
      autocomplete.addListener('place_changed', this.helpLocationChanged);
    },
    helpLocationChanged() {
      var self = this;
      var place = autocomplete.getPlace();
      self.help.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    },
    locateHelpLocation(){
      var self = this;
      self.help.location = self.currentLocation;
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + self.currentLocation.lat + ','+ self.currentLocation.lng + '&key=AIzaSyBSqo5kFr5ENcknN23v5QUfQy-zoWnpopA'; 
      axios.get(url).then(response => {
        if(response.data.results && response.data.results.length > 0){
          self.$refs.autocomplete.value = response.data.results[0].formatted_address;
        }
      }).catch(response => {
        
      });
    },
    callHelp(){
      debugger;
      var self = this;
      const url = '/events/help';
      const formData = new FormData();
      formData.append('userId', self.userData.userId);  
      formData.append('title', self.help.title);  
      formData.append('description', self.help.description);  
      formData.append('lat', self.help.location.lat);
      formData.append('lng', self.help.location.lng);
      formData.append('selectedTools',  JSON.stringify(self.help.selectedTools));
      for(var fileIndex = 0; fileIndex < self.help.images.length; fileIndex++){
        formData.append(self.help.images[fileIndex].image, self.help.images[fileIndex].file);  
      }

      $.ajax({
          url: url, 
          data: formData, 
          processData: false,
          contentType: false
        }
      ).done(function(response){
        if(response.isSuccess){
          self.hide();  
        }
        else{
          console.log('failed uploading cases') 
          //TBD: proper error to user 
        }           
      }).fail(function(e){
        //TBD: log error
      })
    },
    imagesSelected(){
      var self = this;
      var imageInput = self.$refs.images;
      var imageContainer = self.$refs.imageContainer;
      var curFiles = imageInput.files;
      for (var fileIndex = 0; fileIndex < curFiles.length; fileIndex++) {
        var dataUri = window.URL.createObjectURL(curFiles[fileIndex]);
        var userImageDiv = $('<div class="user-image"><img src="' + dataUri + '"><div class="close"><i class="fa fa-times"></i></div></div>');
        var id = fileIndex  + '_' + curFiles[fileIndex].name;
        userImageDiv.find('.close').click(function(){
          var me = $(this);
          me.parent('.user-image').remove();
          self.removeImage(id);
        })
        imageContainer.appendChild(userImageDiv.get(0));
        self.help.images.push({
            image: curFiles[fileIndex].name, 
            file: curFiles[fileIndex],
            id: id
        });
      };
    },
    removeImage(id){
      var self = this;
      var existingIndex = self.help.images.findIndex(img => img.id === id);
      self.help.images.splice(existingIndex, 1);
    }
  }
}

</script>

<style>
  .event-images{
    text-align: center;
    width: 100%;
  }

  .sos-request{
    top: 25px;
    margin: 5px 5px 5px 5px;
  }

  .user-tool{
    text-align: center;
    height: 60px;
    border: 1px solid black;
    line-height: 15px;
    margin-left: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .user-tool.selected{
    transform: rotate(5deg);
    border-width: 2px;
  }

  .tool-title{
    font-size: 16px;
    margin-top: 10px;    
  }

  .tool-image{
    margin-top: 10px;
    font-size: 14px;
  }

  .help-title{
    margin-bottom: 5px;
  }

  .call-help-btn{
    border-radius: 150px;
    height: 50px;
    width: 50px;
    line-height: 40px;
  }

  .record-help{
    margin-top: 40px;
  }

  .record-help-btn{
    height: 100px;
    width: 100px;
    line-height: 100px;
    border-radius: 100px;
    font-size: 40px;
  }

  .images-container{
    max-height: 85px;
    overflow: auto
  }

  div.user-image{
    width: 70px;
    float: left;
    margin: 5px;
  }

  div.user-image img{
    height: 70px;
    width: 70px;
    border-radius: 60px;
  }

  div.user-image .close{
    position: relative;
    top: -73px;
    left: 5px;
    font-size: 15px;
  }

  select.form-control.selectpicker.shown{
    display: block !important;
  }
</style>
