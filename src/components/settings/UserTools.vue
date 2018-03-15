<template>
  <div clas="container text-center" >
    <div class="title text-center">
      <p class="title-1">SPREAD YOUR LOVE</p>
      <p>tell us what you can do</p>      
    </div>
    <div class="tools-container col-xs-12">
      <div v-for="userTool in userTools" :class="{'user-tool': true,  'col-xs-5': true, 'selected': userTool.selected}" @click="userToolSelectionChanged" :data-id="userTool.id">
        <div class="tool-title">{{userTool.title}}</div>
        <div :class="'tool-image fa fa-' + userTool.class"></div>
      </div>
    </div>
    <div class="save-settings">
      <a class="btn btn-sm btn-default" @click="saveSettings">save settings</a>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  props: ['userId', 'selectedTools'],
  data () {
    return {
      userTools: this.$store.state.userTools
    }
  },
  created(){
    var self = this;
    self.userTools.forEach(function(tool){
      tool.selected = self.selectedTools.indexOf(tool.id) > -1;
    })
  },
  mounted (){
    //var self = this;
  },
  methods: {
    saveSettings(){
      var self = this;
      var selectedTools = $.grep(self.userTools, function(tool){
        return tool.selected;
      }).map(function(tool){
        return tool.id
      });
      
      const url = '/users/' + self.userId + '/settings/tools';
      $.ajax({
        url: url, 
        data: {
          'selectedTools':  JSON.stringify(selectedTools)
        }
      }).done(function(response){
        self.$store.commit('saveUserTools', selectedTools);
      }).fail(function(e) {
        //TBD: handke error
      });
    },
    userToolSelectionChanged(event){
      var self = this;
      var el = $(event.currentTarget);
      var toolId = parseInt(el.attr('data-id'));
      el.toggleClass('selected');

      for(var tool in self.userTools){
        if(self.userTools[tool].id == toolId){
          self.userTools[tool].selected = el.hasClass('selected');
        }
      }
    }
  }
}

</script>

<style scoped>
  .title{
    margin-top: 15px;
  }

  .title-1{
    font-size: 15px;
  }

  .user-tool{
    text-align: center;
    height: 120px;
    border: 1px solid black;
    line-height: 30px;
    margin-left: 20px;
    margin-top: 20px;
    cursor: pointer;
  }

  .user-tool.selected{
    transform: rotate(5deg);
    border-width: 2px;
  }

  .tool-title{
    font-size: 30px;
    margin-top: 25px;    
  }

  .tool-image{
    margin-top: 20px;
    font-size: 30px;
  }

  .save-settings{
    position: fixed;
    right:5px;
    bottom: 10px;
  }
</style>
