import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/Login'
import {Api_checktoken} from '../api/apis'
Vue.use(VueRouter)
//  new VueRouter({
    
    
// })
const router = new VueRouter({
    routes:[
        {
        path:'/',
        name:'登录',
        component:login,
        meta:{role:['super','normal']}
        },
        {
            path:'/home',
            name:'首页',
            component:()=>import('../pages/Home'),
            children:[
                {
                    path:'/home/index',
                    name:'首页',
                    component:()=>import('../pages/Index'),
                    // meta:{maye:1,role:['super','normal']}
                    meta:["a"]
                },
                {
                    path:'/home/order',
                    name:'订单管理',
                    component:()=>import('../pages/Order'),
                    meta:{role:['super','normal']}

                },
                {
                    path:'/home/prolist',
                    name:'商品列表',
                    component:()=>import('../pages/goods/ProductList'),
                    meta:{role:['super','normal']}

                },
                {
                    path:'/home/proadd',
                    name:'商品添加',
                    component:()=>import('../pages/goods/ProductAdd'),
                    meta:{role:['super','normal']}

                },
                {
                    path:'/home/categories',
                    name:'商品分类',
                    component:()=>import('../pages/goods/Categories'),
                    meta:{role:['super','normal']}

                },
                {
                    path:'/home/shop',
                    name:'店铺管理',
                    component:()=>import('../pages/Shop'),
                    meta:{role:['super']}
                },
                {
                    path:'/home/acclist',
                    name:'账户列表',
                    component:()=>import('../pages/account/AccList'),
                    meta:{role:['super']}

                },
                {
                    path:'/home/addAcc',
                    name:'账户添加',
                    component:()=>import('../pages/account/AddAcc'),
                    meta:{role:['super']}

                },
                {
                    path:'/home/chagepwd',
                    name:'修改密码',
                    component:()=>import('../pages/account/ChagePwd'),
                    meta:{role:['super']}

                },
                {
                    path:'/home/Comsta',
                    name:'商品统计',
                    component:()=>import('../pages/Sales/Comsta'),
                    meta:{role:['super']}

                },
                {
                    path:'/home/ordersta',
                    name:'订单统计',
                    component:()=>import('../pages/Sales/Ordersta'),
                    meta:{role:['super']}

                },
                {
                    path:'/home/accountinfo',
                    name:'个人中心',
                    component:()=>import('../pages/Accountinfo'),
                    meta:{role:['super']}

                }
            ]
        },
    ],
})
router.beforeEach((to,from,next)=>{
    if(to.path!='/'){
        Api_checktoken(localStorage.token).then((res)=>{
            if(res.data.code==0){
                // console.log(to.meta)
                next()
                // if(to.meta.role.includes(localStorage.role)){
                //     console.log("您来啦")
                // next()
                // }else{
                //     console.log("无权限")
                //     from()
                // }
            }else{
                next('/')
            }
        })
    }else{
        next()
    }
})
export default router