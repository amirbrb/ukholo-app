import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Profile from '../components/Profile'
import Post from '../components/Post'
import Share from '../components/Share'
import Feedback from '../components/Feedback'

import Thought from '../components/Thought'

Vue.use(VueRouter)

const routes = [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/posts/:id',
      component: Thought, 
      props: true
    }
  ];

export const router = new VueRouter({ routes });