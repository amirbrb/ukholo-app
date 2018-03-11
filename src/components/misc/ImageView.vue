<template>
  <div class="image-view col-xs-12">
    <img :src="imagesDomain + this.imageId"/>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import StateControl from './StateControl.vue'
export default {
  extends: MBBase,
  components: {
    StateControl
  },
  props: [],
  data () {
    return {
      imageId: ''
    }
  },
  created(){
    this.imageId = this.$route.params.id;
  },
  methods: {
    goBack(){
      this.$router.back();
    }
  }
}

</script>

<style scoped>
  .image-view {
    top: 25px;
    width: 100%;
  }

  img{
    width: 100%;
    margin-top: 10px
  }
</style>
