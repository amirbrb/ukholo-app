<template>
  <div class="event-context-menu" v-bind:style="{ top: location.top - 110 + 'px', left: location.left - 35 + 'px'  }">
    <span class="close" @click="hideContextMenu"><i class="fa-times fa"></i></span>
    <ul class="context-menu">
      <li @click="hideContextMenu"><router-link :to="'/help/sos'"><i class="fa fa-users"></i>in need...</router-link></li>
      <li @click="hideContextMenu"><router-link :to="'/help/event'"><i class="fa fa-shield"></i>help me...</router-link></li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['location'],
  data () {
    return {
      
    }
  },
  mounted (){
    //var self = this;
  },
  methods: {
    hideContextMenu(){
      this.$emit('hideContextMenu', false)
    }
  }
}

</script>

<style scoped>
  .event-context-menu{
    width: 150px;
    z-index: 9999;
    box-shadow: 5px 5px 5px grey;
    position: absolute;
    background: white;
  }
  .close{
    position: relative;
    top: 5px;
    left: -5px;
  }

  ul{
    margin-top: 28px
  }

  .context-menu{
    list-style: none;
    padding-left: 10px;
    padding-right: 10px;
  }

  .context-menu li{
    border-bottom: 1px solid black;
    margin-top: 2px; 
    font-size: 18px;
    padding:5px;
    cursor: pointer;
  }
  
  .context-menu li i{
    margin-right:15px;
  }
</style>
