<template>
  <div class="information-button" @click="showInfo">
    <i class="fa fa-info"></i>
    <transition name="fade-short">
      <div v-show="isShowingData" ref="dataElement" class="information-data">{{data}}</div>
    </transition>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
//import axios from 'axios'

export default {
  extends: MBBase,
  components: {
    
  },
  props: ['data'],
  data () {
    return {
      isShowingData: false,
      timeoutId: null
    }
  },
  methods: {
    showInfo(){
      var self = this;
      if(self.isShowingData){
        self.isShowingData = false;
        clearTimeout(self.timeoutId);
      }
      else{
        self.isShowingData = true;
        var e = window.event;
        var el = self.$refs.dataElement;
        el.style.left = e.clientX - 48 + 'px';
        el.style.top = e.clientY + 15 + 'px';
        self.timeoutId = setTimeout(function(){
          self.isShowingData = false;
        }, 2500);
      }
    }
  }
}

</script>

<style scoped>
  .information-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 5px;
    margin-top: 8px;
    padding: 0px 0px 0px 7px;
    border-radius: 30px;
    background-color: black;
    color: white;
    float: right;
  }

  .information-data{
    color: black;
    background-color: gray;
    border-color: black;
    width: 100px;
    font-size: 14px;
    border: 1px solid gray;
    border-radius: 70px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    position: fixed;
    z-index: 9999;
  }
</style>
