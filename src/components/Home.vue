<template>
    <div class="t-container">
        <div class="t-page-title">
            <h2>Home</h2>
        </div>
        <div class="t-page-content">
            <ThoughPreview v-for="item in $store.state.thoughts" :thought="item">
            </ThoughPreview>
        </div>
	</div>
</template>

<script>
    import ThoughPreview from './ThoughPreview'
    
    export default{
        data: () => ({
            
        }),
        mounted(){
            
        },
        methods: {
            
        },
        components: { ThoughPreview }
    }
</script>

<style>
    
</style>