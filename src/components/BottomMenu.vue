<template>
    <div class="component">
		<button class="cn-button" ref="menuButton" @click="toggleMenu">+</button>
		<div class="cn-wrapper" ref="wrapper" @click="toggleMenu">
		    <ul>
		      <li><router-link to="/"><span class="icon-home"></span></router-link></li>
		      <li><router-link to="/me"><span class="icon-user"></span></router-link></li>
		      <li><router-link to="/post"><span class="icon-edit"></span></router-link></li>
		      <li><router-link to="/share"><span class="icon-share"></span></router-link></li>
		      <li><router-link to="/feedback"><span class="icon-comment"></span></router-link></li>
		     </ul>
		</div>
		<div class="cn-overlay" ref="overlay" @click="toggleMenu"></div>
	</div>
</template>

<script>
    export default{
        name: 'navigator',
        data: () => ({
            opened: false
        }),
        mounted(){
            
        },
        methods: {
            toggleMenu(){
                const self = this;
                if(self.opened){
                    self.closeNav();
                }
                else{
                    self.openNav();
                }
                
                self.opened = !self.opened;
            },
            openNav(){
                const self = this;
                self.$refs.menuButton.innerHTML = "-";
                window.classie.add(self.$refs.overlay, 'on-overlay');
	            window.classie.add(self.$refs.wrapper, 'opened-nav');
            },
            closeNav(){
                const self = this;
                self.$refs.menuButton.innerHTML = "+";
                window.classie.remove(self.$refs.overlay, 'on-overlay');
		        window.classie.remove(self.$refs.wrapper, 'opened-nav');
            },
        }
    }
</script>

<style>
    /*
        menu design By //https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
    */
</style>