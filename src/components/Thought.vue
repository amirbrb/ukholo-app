<template>
    <div class="t-page-content">
        <div class="card">
            <div class="header">
                <div class="title">{{thought.title}}</div>
                <router-link :to="'writers/' + thought.publisher.name" class="publisher">
                    <img :src="thought.publisher.imageUrl"/>
                    <label>{{thought.publisher.name}}</label>
                </router-link>
                <div class="date-time">{{$moment(thought.publishedAt).format("DD-MMM-YYYY")}}</div>
            </div>
            <div class="body" v-html="thought.body"></div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Thought',
        data: () => ({
            thought: {
                publisher: {}
            }
        }),
        mounted(){
            const self = this;
            let id = parseInt(self.$route.params.id);
            self.thought = self.$store.getters.getThoughtById(id);
        },
        methods: {
        },
        props: []
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
        font-size: 30px;
        font-style: italic;
        font-family: "Comic Sans MS", cursive, sans-serif;
    }
    
    .publisher{
        width:100%;
        padding-left: 20px;
    }
    
    .publisher label{
        color: white;
        line-height:40px;
        vertical-align: top;
        padding: 10px;
    }
    
    .publisher img{
        width: 50px;
    }
    
    .date-time{
        width:100%;
        text-align:right;
        color:  #f2f2f2;
        padding-right: 20px;
    }
    
    .body{
        padding: 20px;
        line-height: 2.5em;
        font-family: "Comic Sans MS", cursive, sans-serif;
    }
    
    .body::selection {
      background: #FFE4B5; /* WebKit/Blink Browsers */
    }
    .body::-moz-selection {
      background: #FFE4B5; /* Gecko Browsers */
    }
</style>