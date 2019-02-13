import Vue from 'vue'
import Router from 'vue-router'
import Rules from './components/rules.vue'


Vue.use(Router);

export default new Router({
    routes: [
       
        {
            path: '/rules',
            component: Rules
        },

    ]
})
