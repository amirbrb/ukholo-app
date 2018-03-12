<template>
  <div class="case-view col-xs-12">
    <h3 class="case-title">{{caseData.title}}</h3>
    <div class="case-data-wrraper">
      <div class="case-description">{{caseData.description}}</div>
      <div class="case-images">
        <router-link v-for="img in caseData.images" :to="'/image/' + img">
          <img :src="imagesDomain + img"/>   
        </router-link>
      </div>
    </div>
    <div class="case-issuer-wrapper" v-if="!isSelfEdit">
      <router-link v-if="caseData.user" :to="{ path: '/users/' + caseData.userId + '/details/'}">
        <img v-if="caseData.user" :src="imagesDomain + 'avatar/' + caseData.userId"/>
      </router-link>
    </div>
    <div class="case-messages-wrapper">
      <router-link :to="{ path: '/events/chat/' + $route.params.id + '?isActive=' + caseData.isActive}">
        <i v-if="caseData.messages" class="fa fa-comment-o" :counter="caseData.messages.length > 10 ? '10+' : caseData.messages.length" aria-hidden="true"></i>
      </router-link>
    </div>
    <div class="case-actions-wrapper" v-if="!isSelfEdit">
      <a v-if="caseData.user" :href="'tel:' + caseData.user.phoneNumber">
        <i class="fa fa-phone" aria-hidden="true"></i>        
      </a>
    </div>
    <div id="caseMapContainer"></div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import StateControl from '../misc/StateControl.vue'
import $ from 'jquery';
var google = window.google;
export default {
  extends: MBBase,
  components: {
    StateControl
  },
  props: ['isSelfEdit'],
  data () {
    return {
      caseData: {
        messages: []
      },
      commentCount: 0
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      var self = this;
      var url = '/events/' + self.$route.params.id;
      $.ajax({
        url: url,
        method: 'GET'
      }).done(function(response){
        if(response.isSuccess){
          self.caseData = response.data;
          var caseLatLng = new google.maps.LatLng(parseFloat(self.caseData.location.lat), parseFloat(self.caseData.location.lng));
          self.map = new google.maps.Map(document.getElementById('caseMapContainer'), {
            center: caseLatLng,
            zoom: 16
          });

          var caseMarker = new google.maps.Marker({
            position: caseLatLng
          });
          caseMarker.setMap(self.map);
        }
        else{
          console.log('failed getting case data')
          //TBD - show proper error
        }
      }).fail(function(e){
        //TBD - show proper error
      });
    }
  }
}

</script>

<style scoped>
  .case-view{
    position: fixed;
    top: 110px;
    margin: 5px 5px 5px 5px;
    width: 100%;
  }

  .close{
    position: absolute;
    top: -20px;
    left: 10px;
  }

  .case-title{
    margin-top: 50px;
    font-weight: bold; 
    max-width: 100%;
  }

  .case-data-wrraper{
    width: 100%;
    float: left;
  }
  .case-issuer-wrapper{
    position: absolute;
    top: -15px;
    right: 20px;
  }

  .case-issuer-wrapper img{
    width: 60px;
    height: 60px;
    border-radius: 80px;
  }

  .case-messages-wrapper{
    position: absolute;
    top: -8px;
    left: 50px;
    margin-right: 15px; 
  }

  .case-actions-wrapper{
    position: absolute;
    top: -8px;
    right: 100px;
  }

  .case-actions-wrapper a{
    font-size: 40px;
  }

  .case-messages-wrapper .fa, .case-actions-wrapper .fa{
    font-size: 40px;
    color:gray;
  }

  .case-description{
    margin-top: 10px;
    font-size: 17px; 
    max-height: 100px;
    overflow-y: auto;
  }

  .case-images{
    max-height: 200px;
    overflow: auto;
  }

  .case-images img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 10px;
  }

  #caseMapContainer{
    height: 300px;
    width: 98%;
    top: 15px;
  }

  .fa-comment-o:after {
    position: absolute;
    content:attr(counter);
    top: 10px;
    right: 2px;    
    height: 15px;
    min-width: 15px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 12px;
    font-size: 10px;    
    line-height: 12px;
    text-align: center;
    background: red;
    color: white;
  }
  
</style>
