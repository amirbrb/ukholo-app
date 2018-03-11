<template>
  <div class="event-context-menu" v-bind:style="{ top: location.top - 110 + 'px', left: location.left - 35 + 'px'  }">
    <span class="close" @click="hideContextMenu"><i class="fa-times fa"></i></span>
    <ul class="context-menu">
      <li><router-link :to="'/help/sos'">Now</router-link></li>
      <li><router-link :to="'/help/event'">Help</router-link></li>
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
    opacity: 0.82;
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
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
  }

  .context-menu li{
    border-radius: 20px;
    border: 1px solid black;
    margin-top: 2px; 
    font-size: 18px;
    cursor: pointer;
  }
</style>
