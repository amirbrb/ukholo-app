<template>
    <router-link :to="'posts/' + thought.id">
        <div class="card">
            <div class="header">
                <div class="title">{{thought.title}}</div>
                <router-link :to="'writers/' + thought.publisher.name" class="publisher">
                    <label>{{thought.publisher.name}}</label>
                    <img :src="thought.publisher.imageUrl"/>
                </router-link>
                <div class="date-time">{{$moment(thought.publishedAt).fromNow()}}</div>
            </div>
            <div class="content" v-html="cropText(thought.body)"></div>
    	</div>        
    </router-link>
</template>

<script>
    export default{
        name: 'Thought',
        data: () => ({
            
        }),
        mounted(){
            
        },
        methods: {
            cropText(text){
                return text.length > 70 
                    ? text.substring(0, 70) + '...' 
                    : text;
            }       
        },
        props: ['thought']
    }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 red;
        transition: 0.3s;
        width: 98%;
        border-radius: 5px;
        font-family: "Comic Sans MS", cursive, sans-serif;
        background:  #ffb3b3;
        color: white;
        padding:10px;
        float:left;
    }
    
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .title{
        width: 100%;
        text-align:center;
        font-size: 28px;
    }
    
    .publisher{
        line-height:50px;
        width:100%;
    }
    
    .publisher label{
        color: white;
        vertical-align: top;
        padding: 20px;
    }
    
    .publisher img{
        width: 50px;
        float:left;
    }
    
    .date-time{
        text-align:right;
        color:  #f2f2f2;
        margin-top: -35px
    }
    
    .content{
        margin: 30px 3px;
    }
</style>
