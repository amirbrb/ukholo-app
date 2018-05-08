<template>
  <div class="table-view">
    <div v-for="eventData in events" class="event">
      <router-link :to="{ path: '/events/edit/' + eventData.id}">
        <table>
          <tr>
            <td rowspan="2" class="event-actions">
              
            </td>
            <td>
              
            </td>
          </tr>
        </table>
        <div class="event-details">
          <label>{{stringifyDate(eventData.created)}}</label>
        </div>
        <div class="event-title">{{eventData.title}}</div>
        <div class="event-description">
          {{eventData.description}}
        </div>
      </router-link>
    </div>  
  </div>
</template>

<script>

import $ from 'jquery';
import MBBase from '../../MBBase.vue';
export default {
  extends: MBBase,
  components: {

  },
  props: ['userId'],
  data () {
    return {
      events: []
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      var self = this;
      var url = '/users/' + this.userId + '/events/';
      $.ajax({
        url: url,
        method: 'GET'
      }).done(function(response){
        if(response.isSuccess){
          self.events = response.data.map(data => {
            return {
              image: self.imagesDomain + 'avatar/' + data.userId,
              title: data.title,
              description: data.description,
              id: data.id,
              created: data.created,
              isActive: data.isActive
            }
          });
        }
        else{
          console.log('failed getting cases');
          //TBD: proper error message  
        }
      }).fail(function(response){
        console.log(response);
        //TBD: proper error message
      });
    }
  }
}

</script>

<style scoped>
  .table-view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .event {
    position: relative;
    width: 100%;
    border: 1px groove;
    margin-top: 2px;
    padding: 10px;
  }

  .event-details{
    font-weight: bolder;
    font-size: 18px;
  }

  .event-title {
    font-weight: bolder;
    font-size: 16px;
  }
  .event-description {
    margin-top: 5px;
    font-size: 15px;
    width: 99%;
  }
</style>
