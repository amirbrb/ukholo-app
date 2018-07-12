<template>
    <div class="t-container">
        <div class="t-page-title">
            <h2>Think with others</h2>
        </div>
        <div class="t-page-content">
            <input ref="title" placeholder="title" v-model="title" class="t-input"/>
            <markdown-editor v-model="body" ref="markdownEditor"></markdown-editor>
            <div class="save-cancel">
                <SaveCancel :saveAction="savePost" cancelAction="cancel"></SaveCancel>
            </div>
        </div>
	</div>
</template>

<script>
    import SaveCancel from './SaveCancel'
    export default{
        data: () => ({
            title: '', 
            body: '',
            config: {
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                ],
                height: 300
            }
        }),
        components: { SaveCancel },
        mounted(){
            this.simplemde = null
        },
        computed: {
            simplemde () {
                return this.$refs.markdownEditor.simplemde
            }
        },
        methods: {
            savePost() {
                debugger;
                let self = this;
                let html =  self.simplemde.markdown(self.body);
                self.$store.commit('addThought', {
                    title: self.title,
                    body: html,
                    userId: 2
                })
            },
            cancel: () => { }
        }
    }
</script>

<style>
    .save-cancel{
        text-align: right;
        margin-top: 10px;
    }

    .t-button{
    	height: 24px;
    	border-radius: 15px;
    	padding: 12px;
    	color: black;
    	background: #f06060;
    	border: 1px solid;
    }
    
    .t-button.danger{
        background: red;
    }
</style>