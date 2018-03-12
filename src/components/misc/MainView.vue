<template>
  <div>
    <div class="data-view data-container">
      <ul class="nav nav-tabs">
        <li :class="{'active': userData.preferences.viewType === 2}">
          <a data-toggle="tab" href="#sosMap" @click="selectMapView"><i class="fa fa-map-o" aria-hidden="true"></i></i></a>
        </li>
        <li :class="{'active': userData.preferences.viewType === 1}">
          <a data-toggle="tab" href="#sosTable" @click="selectTableView"><i class="fa fa-list-ul" aria-hidden="true"></i></i></a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="sosMap" ref="sosMapTab" :class="{'tab-pane': true, 'active': userData.preferences.viewType === 2}">
          <MapView :cases="cases" v-if="userData.preferences.viewType === 2" 
            :mapZoomLevel="userData.preferences.mapZoomLevel"
            :currentLocation="currentLocation"
            v-on:mapZoomChanged="mapZoomChanged">
          </MapView>
        </div>
        <div id="sosTable" ref="sosTableTab"
          :class="{'tab-pane': true, 'active': userData.preferences.viewType === 1}">
          <TableView :cases="cases"
            :currentLocation="currentLocation"></TableView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';
import MBBase from '../../MBBase.vue';
import ViewType from '../../enums/viewType'
import EventForm from './EventForm';
import TableView from '../help/TableView';
import MapView from '../help/MapView';
import HeaderNavbar from './HeaderNavbar';

export default {
  extends: MBBase,
  components: {
    EventForm,
    TableView,
    HeaderNavbar,
    MapView,
    ViewType
  },
  data () {
    return {
      cases: [],
      timeoutId: null,
      queryDelay: 5000
    }
  },
  props: [],
  created(){
    var self = this;
    window.ViewType = ViewType
    self.getData();
  },
  destroyed(){
    var self = this;
    clearTimeout(self.timeoutId);
  },
  methods: {
    getData(){
      var self = this;
      var url = '/events/';
      $.ajax({
        url: url,
        method: 'GET',
        data: {
          location: self.currentLocation,
          userId: self.userData.userId
        }
      }).done(function(response){
        if(response.isSuccess){
          self.cases = response.data.map(data => {
            return {
              image: self.imagesDomain + 'avatar/' + data.userId,
              title: data.title,
              description: data.description,
              id: data.id,
              location: data.location,
              userId: data.userId,
              created: data.created
            }
          })
        }
        else{
          console.log('failed getting cases');
          //TBD: proper error message  
        }
        clearTimeout(self.timeoutId);
        self.timeoutId = setTimeout(self.getData, self.queryDelay);
      }).fail(function(response){
        console.log(response);
        //TBD: proper error message
      });
    },
    selectTableView(){
      this.selectedTabChanged(ViewType.table)
    },
    selectMapView(){
      this.selectedTabChanged(ViewType.map)
    },
    selectedTabChanged(viewType){
      var self = this;
      self.userData.preferences.viewType = viewType;
      self.userSettingsChanged(self.userData.preferences, self.userData.userId);
    },
    mapZoomChanged(zoomLevel){
      var self = this;
      self.userData.preferences.mapZoomLevel = zoomLevel;
      self.userSettingsChanged(self.userData.preferences, self.userData.userId);
    }
  }
}

</script>

<style scoped>
  .data-view{
    margin: 5px 5px 5px 5px;
  }
</style>
