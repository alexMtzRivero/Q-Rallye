import Vue from 'vue'
import Router from 'vue-router'
import Rules from './components/rules.vue'
import RallyeManager from './components/RallyeManager.vue'
import Teams from './components/Team/Team.vue'
import Quizz from './components/quizz.vue'
import Login  from "./components/Login/Login.vue"
import CreateAccount  from "./components/Login/CreateAccount.vue";
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
        {
            path: '/teams',
            component: Teams
        },
        {
            path: '/quizz',
            component: Quizz
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/createAccount',
            component: CreateAccount
        },
    ]
})
