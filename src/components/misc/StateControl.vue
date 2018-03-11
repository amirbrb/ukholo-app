<template>
  <div class="state-control" v-if="$route.path !== '/' && $route.path !== '/settings'">
    <span class="close" @click="goBack"><i class="fa-times fa"></i></span>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
export default {
  extends: MBBase,
  components: {
    
  },
  props: [],
  data () {
    return {
      imageId: '',
      excludedPaths: ['/settings']
    }
  },
  methods: {
    goBack(){
      this.$router.back();
    }
  }
}

</script>

<style scoped>
  .state-control{
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>