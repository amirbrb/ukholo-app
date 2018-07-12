import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [
            {id: 1, name: 'amir', imageUrl: 'https://t2.rbxcdn.com/ebee94240a9bf5f9bb92a9a6e0a1be45'},
            {id: 2, name: 'amir mishori', imageUrl: 'https://t2.rbxcdn.com/ebee94240a9bf5f9bb92a9a6e0a1be45'}
        ],
        thoughts: [{
            id: 1,
            title: 'hi there1',
            body: 'asclkj lkjsdlkj lkjlk jvlkj lvkj lkfv ;dsvjldkdfj lkj  l kjfdvlkdj vlkj ksjchkjh kgchsj kjhkhkjhhk k jhks kjsdhk ksj dk kj kj ksjdhkjh ksdhj',
            publisher: {
                userId: 1
            },
            publishedAt: new Date('2018-07-08 10:40:21')
        },
        {
            id: 2,
            title: 'hi there1',
            body: 'asclkj lkjsdlkj lkjlk jvlkj lvkj lkfv ;dsvjldkdfj lkj  l kjfdvlkdj vlkj ksjchkjh kgchsj kjhkhkjhhk k jhks kjsdhk ksj dk kj kj ksjdhkjh ksdhj',
            publisher: {
                userId: 2,
                name: 'john doe',
                imageUrl: 'https://t2.rbxcdn.com/ebee94240a9bf5f9bb92a9a6e0a1be45'
            },
            publishedAt: new Date('2018-07-08 10:40:21')
        },
        {
            id: 3,
            title: 'hi there1',
            body: 'asclkj ',
            publisher: {
                userId: 3,
                name: 'john doe',
                imageUrl: 'https://t2.rbxcdn.com/ebee94240a9bf5f9bb92a9a6e0a1be45'
            },
            publishedAt: new Date('2018-07-08 10:40:21')
        }]
    },
    getters: {
        getThoughtById: (state, getters) => (id) => {
            return state.thoughts.find(t => t.id === id)
        }
    },
    mutations: {
        addThought (state, thoughDetails) {
            state.thoughts.push({
                id: state.thoughts.length + 1,
                title: thoughDetails.title,
                body: thoughDetails.body,
                publisher: {
                    userId: thoughDetails.userId,
                },
                publishedAt: new Date()
            })
        }
    }
})