import Vue from 'vue'
import Router from 'vue-router'
import Rules from './components/rules.vue'
import RallyeManager from './components/RallyeManager.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/rallyeManager',
            component: RallyeManager
        },
       
        {
            path: '/rules',
            component: Rules
        },

    ]
})
