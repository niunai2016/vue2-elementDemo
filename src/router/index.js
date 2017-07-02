import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods'
import Comments from '@/components/Comments/Comments'
import Seller from '@/components/Seller/Seller'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            component: Goods
        },
        {
            path: '/goods',
            component: Goods
        },
        {
            path: '/comments',
            component: Comments
        },
        {
            path: '/seller',
            component: Seller
        },
    ]
})
