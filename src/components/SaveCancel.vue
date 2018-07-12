<template>
    <div class="wrapper">
        <a class="t-button" @click="cancelClicked">Cancel</a>
        <a class="t-button" @click="saveClicked">Save</a>
	</div>
</template>

<script>
    export default{
        props: ['saveAction', 'cancelAction'],
        data: () => ({
            
        }),
        mounted(){
            
        },
        methods: {
            saveClicked() {
                this.saveAction();
            },
            cancelClicked() {
                this.cancelAction();
            }
        },
        components: { }
    }
</script>

<style>
    
</style>