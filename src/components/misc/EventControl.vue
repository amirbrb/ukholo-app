<template>
  <div id="eventControl" class="event-control" 
    v-bind:style="{ top: location.top + 'px', left: location.left + 'px'  }">
    <i ref="eventControl" class="fa fa-handshake-o"></i></div>
</template>

<script>

import Hammer from 'hammerjs';
export default {
  components: {
    
  },
  props: ['location'],
  data () {
    return {
      
    }
  },
  mounted (){
    var self = this;
    var eventControl = self.$refs.eventControl;

    eventControl.style.left = self.location.left + "px";
    eventControl.style.top = self.location.top + "px";

    var hammertime = new Hammer(eventControl);
    var lastPosX = self.location.left;
    var lastPosY = self.location.top;
    var isDragging = false;
    
    var press = new Hammer.Press({
      time: 800
    });

    hammertime.add(press);

    hammertime.on('press', function(ev){
      self.$emit('contextMenu', true);
    });

    hammertime.on('tap', function(ev) {
      self.$router.push('/help/event');
    });

    hammertime.on('pan', function(ev) {
      var elem = ev.target;
      if (!isDragging) {
        isDragging = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;
      }

      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      if(posX < 0 || posY < 0) return;

      // move our element to that position
      elem.style.left = posX + "px";
      elem.style.top = posY + "px";
      
      // DRAG ENDED
      // this is where we simply forget we are dragging
      if (ev.isFinal) {
        isDragging = false;
        self.$emit('eventControlLocationChanged', {
          left: posX,
          top: posY
        });
      }
    });
  },
  methods: {
    
  }
}

</script>

<style scoped>
.event-control{
  height: 70px;
  width: 70px;
  line-height: 70px;
  text-align: center;
  background: lightgrey;
  z-index: 9999;
  box-shadow: 5px 5px 5px grey;
  opacity: 0.72;
  position: absolute;
  border-radius: 150px;
  right: 30px;
  bottom: 30px;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
