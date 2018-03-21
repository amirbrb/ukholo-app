		border-radius: 12px;
		border-radius: 12px;
<template>
	<div class="chat-box col-xs-12" :disabled="!isActive">
      	<div class="messages-wrapper col-xs-12" ref="messagesContainer">
	      	<div v-for="message in messages" :class="{'wrap-message': true, 'wrap-message-right' : message.senderId === userData.userId}">
		      	<div class="chat-message">
			        <div class="message-sender">
			        	<img :src="domain + '/images/avatar/' + message.senderId"/>
			        </div>
			        <p>{{message.text}}</p>
		      	</div>
	      	</div>
	      	<div class="chat-text col-xs-10 col-sm-5">
	      		<input :disabled="!isActive" class="form-control send-message" v-model="newMessage" placeholder="enter message here" aria-describedby="send-addon">
	      		<a class="btn btn-default" @click="sendMessage">send</a>
      		</div>
      	</div>
	</div>
</template>

<script>
	import MBBase from '../../MBBase.vue'
	import $ from 'jquery'

	export default{
		extends: MBBase,
	  	components: {
	    },
	  	props: [],
	  	data () {
		    return {
	      		messages: [],
	      		timeoutId: null,
	      		newMessage: '',
	      		alive: true,
	      		isLoading: true,
	      		caseId: this.$route.params.id,
	      		isActive: this.$route.query.isActive || false
		    }
	  	},
	  	computed: {

	  	},
	  	created(){
	  		let self = this;
	  		window.socket.emit('chat-box', self.caseId);
	    	self.getChatMessages();

	    	window.socket.on('chat-message', function(msgData){
	      		self.messages.push(msgData);
	        	self.scroll();
		    });
	  	},
	  	beforeDestroy(){
	    	var self = this;
	    	self.alive = false;
	  	},
	  	methods: {
	  		scroll(){
	  			let self = this;
  				var scroller = $(self.$refs.messagesContainer);
    			setTimeout(function(){
    				scroller.stop().animate({
					  scrollTop: scroller[0].scrollHeight
					}, 400)
				}, 200);
	  		},
	    	getChatMessages(){
	      		var self = this;
	      		var url = '/events/' + self.caseId + '/messages/';
	      		$.get(url, function(response){
	      			if(response.isSuccess){
	      				self.messages.push.apply(self.messages, response.data.messages);
		        		if(response.data.messages.length > 0){
	        				self.scroll();
	        			}
	      			}
	      			else{
	      				console.log('failed getting messages');
	      				//TBD: proper error
	      			}
	      		}).fail(function(response) {
			        //TBD - show proper error
		      	});
	    	},
	    	sendMessage(){
    			var self = this;
    			if(!self.isActive) return;
				if(self.newMessage == '') return;
				var message = self.newMessage;
				self.newMessage = '';
				window.socket.emit('chat-message', {
					caseId: self.caseId,
	      			message: message,
	      			sender: self.userData.userId
				});
    		}
	}
}
</script>

<style scoped>
	.chat-box{
		margin-top: 40px;
	}
	.chat-text{
		margin-top: 5px;
		position: fixed;
		margin-right: 10px;
		margin-left: 10px;
		right: 10px;
		bottom: 10px;
	}

	.chat-text a{
		position: fixed;
		bottom: 10px;
	}

	.messages-wrapper{
		height: 70vh;
		overflow: auto;
	}
	.chat-message{
		min-height: 50px;
		background: grey;
		opacity: 0.8;
		border-radius: 5px;
		padding-left: 25px;
		padding-top: 5px;
		padding-bottom: 5px;
		margin: 5px 5px 5px 5px;
		width: 100%; 
	}

	.wrap-message{
		width: 55%;
		float: left;
	}
	.wrap-message-right{
		float: right;
	}

	.wrap-message-right .chat-message{
		float: right;
	}

	.input-group-addon{
		cursor: pointer;
	}

	.message-sender{
		float: left;
	}
	.message-sender img{
		width: 40px;
		height: 40px;
		position: relative;
		left: -20px;
		border-radius: 40px
	}

	.send-message{
		border-bottom: 1px gray solid;
		width:70%; 
		float: left
	}
</style>
