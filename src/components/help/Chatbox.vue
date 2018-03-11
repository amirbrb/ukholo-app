<template>
	<div class="chat-box col-xs-12" :disabled="!isActive">
      	<div class="messages-wrapper col-xs-12" ref="messagesContainer">
      		<div v-if="isLoading">Getting messages</div>
	      	<div v-if="!isLoading" v-for="message in messages" :class="{'wrap-message': true, 'wrap-message-right' : message.senderId === userData.userId}">
		      	<div class="chat-message">
			        <div class="message-sender">
			        	<img :src="domain + '/images/avatar/' + message.senderId"/>
			        </div>
			        <p>{{message.text}}</p>
		      	</div>
	      	</div>
	      	<div class="chat-text">
	      		<div class="input-group">
			  		<input :disabled="!isActive" class="form-control send-message" v-model="newMessage" placeholder="enter message here" aria-describedby="send-addon">
			  		<span class="input-group-addon" :disabled="!isActive" id="send-addon" @click="sendMessage"><i class="glyphicon glyphicon-send"></i></span>
				</div>
      		</div>
      	</div>
	</div>
</template>

<script>
	import MBBase from '../../MBBase.vue'
	import moment from 'moment';
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
	      		lastQuery: moment(new Date(-8640000000000000)).format(),
	      		alive: true,
	      		isLoading: true,
	      		caseId: this.$route.params.id,
	      		isActive: this.$route.query.isActive || false
		    }
	  	},
	  	computed: {

	  	},
	  	created(){
	    	this.getChatMessages();
	  	},
	  	beforeDestroy(){
	    	var self = this;
	    	self.alive = false;
	  	},
	  	methods: {
	    	getChatMessages(){
	      		var self = this;
	      		var url = '/events/' + self.caseId + '/messages/?q=' + self.lastQuery;
	      		$.get(url, function(response){
	      			if(response.isSuccess){
	      				self.messages.push.apply(self.messages, response.data.messages);
		        		if(response.data.lastTimestamp){
		        			self.lastQuery = response.data.lastTimestamp;
		        		}
		        		if(response.data.messages.length > 0){
		        			var scroller = $(self.$refs.messagesContainer);
		        			setTimeout(function(){
		        				scroller.stop().animate({
								  scrollTop: scroller[0].scrollHeight
								}, 400)
	        				}, 200);
		        		}

	        			self.isLoading = false;
		        		if(self.alive){
		        			self.timeoutId = setTimeout(self.getChatMessages, 1000);
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

	      		var url = '/events/' + self.caseId + '/message/';
	      		var data = {
	      			caseId: self.caseId,
	      			text: self.newMessage,
	      			userId: self.userData.userId
	      		};
      			$.post(url, data, function(response){
      				if(response.isSuccess){
      					self.newMessage = '';
      				}
      				else{
      					console.log('failed posting message');
      					//TBD: proper error
      				}
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
		right: 10px;
		bottom: 10px;
		width: 40%;
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
		border: 1px gray solid;
	}
</style>
