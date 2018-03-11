<template>
  <div class="map-view view-container">
    <div id="map"></div>    
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import $ from 'jquery';
var google = window.google;
export default {
  extends: MBBase,
  components: {
    
  },
  props: ['mapZoomLevel', 'cases'],
  data () {
    return {
      map: {}
    }
  },
  mounted(){
    var self = this;
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: self.currentLocation.lat, lng: self.currentLocation.lng},
      zoom: self.mapZoomLevel,
      disableDefaultUI: true,
      mapTypeControlOptions: google.maps.MapTypeId.ROADMAP
    });

    self.map.addListener('zoom_changed', function() {
      var zoom = self.map.getZoom();
      self.$emit('mapZoomChanged', zoom);
    });

    self.placeDataOnMaps();
  },
  watch: {
    cases: function (newCases) {
      var self = this;
      self.cases = newCases
      self.placeDataOnMaps();
    }
  },
  methods: {
    placeDataOnMaps(){
      var self = this;
      self.cases.forEach(function(data){
        var position = {
          lat: parseFloat(data.location.lat),
          lng: parseFloat(data.location.lng)
        };
        var icon = {
          url: data.image,
          scaledSize: new google.maps.Size(40, 40)
        };

        var markerString = "<a data-case-id='" + data.id + "'><h3 data-case-id='" + data.id + "'>" + data.title + "</h3></a>";
        markerString += "<p>" + data.description + "</p>";
        var infowindow = new google.maps.InfoWindow({
          content: markerString
        });

        $(document).on('click', 'a[data-case-id]', function(link){
          var caseId = link.target.attributes['data-case-id'].value;
          self.$router.push('/events/' + caseId);
          self.$emit('caseShowing');
        });
        
        var marker = new google.maps.Marker({
          position: position,
          map: self.map,
          title: data.title,
          icon: icon,
          optimized: false
        });

        marker.addListener('click', function() {
          infowindow.open(self.map, marker);
        });

        marker.setMap(self.map);
      });
    }
  }
}

</script>

<style>
  .map-view {
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 5px;
  }

  #map{
    height: 100%;
  }

  .gmnoprint img {
    border-radius:15px;
    border:1px solid #000 !important;
  }
</style>
