<template>
  <div class="user-image">
    <span class="close" @click="remove"><i class="fa-times fa"></i></span>
    <img :src="this.imageSrc">
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
export default {
  extends: MBBase,
  components: {},
  data () {
    return {
      imageSrc: ''
    }
  },
  created () {},
  methods: {
    remove(){
      this.$emit('imageRemoved');
    }
  }
};

</script>

<style scoped>
  .user-image{
    width: 60px;
  }

  .user-image .close{
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .user-image img{
    position: absolute;
    right: 15px;
  }
</style>
