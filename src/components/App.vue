<template>
  <div class="container">
			<!-- Top Navigation -->
			<header>
				<h1>Thoughts<span>Thinking, Spreading, Touching </span></h1>	
			</header>
			<section>
				<router-view></router-view>
			</section>
			<navigator></navigator>
		</div><!-- /container -->
</template>

<script>
import navigator from './BottomMenu'
export default {
  components: {
    navigator
  },
  data: () => ({
      
  }),
  props: {
      source: String
  }
};

</script>

<style>
  .container > header {
  	margin: 0 auto;
  	padding: 1em;
  	text-align: center;
  	background: #b32d00;
  	
  	position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:9999;
  }
  
  .container > header h1 {
  	font-size: 2.625em;
  	line-height: 1.3;
  	margin: 0;
  	font-weight: 300;
  }
  
  .container > header span {
  	display: block;
  	font-size: 60%;
  	opacity: 0.7;
  	padding: 0 0 0.6em 0.1em;
  }
  
  .container section{
    position: absolute;
    top:140px;
    width: 100%;
  }
</style>
