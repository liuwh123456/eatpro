import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../pages/Login'
import {Api_checktoken} from '../api/apis'
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
            {
            path:'/',
            name:'登录',
            component:login
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
                        mate:{role:['super','normal']}
                    },
                    {
                        path:'/home/order',
                        name:'订单管理',
                        component:()=>import('../pages/Order'),
                        mate:{role:['super','normal']}

                    },
                    {
                        path:'/home/prolist',
                        name:'商品列表',
                        component:()=>import('../pages/goods/ProductList'),
                        mate:{role:['super','normal']}

                    },
                    {
                        path:'/home/proadd',
                        name:'商品添加',
                        component:()=>import('../pages/goods/ProductAdd'),
                        mate:{role:['super','normal']}

                    },
                    {
                        path:'/home/categories',
                        name:'商品分类',
                        component:()=>import('../pages/goods/Categories'),
                        mate:{role:['super','normal']}

                    },
                    {
                        path:'/home/shop',
                        name:'店铺管理',
                        component:()=>import('../pages/Shop'),
                        mate:{role:['super']}
                    },
                    {
                        path:'/home/acclist',
                        name:'账户列表',
                        component:()=>import('../pages/account/AccList'),
                        mate:{role:['super']}

                    },
                    {
                        path:'/home/addAcc',
                        name:'账户添加',
                        component:()=>import('../pages/account/AddAcc'),
                        mate:{role:['super']}

                    },
                    {
                        path:'/home/chagepwd',
                        name:'修改密码',
                        component:()=>import('../pages/account/ChagePwd'),
                        mate:{role:['super']}

                    },
                    {
                        path:'/home/Comsta',
                        name:'商品统计',
                        component:()=>import('../pages/Sales/Comsta'),
                        mate:{role:['super']}

                    },
                    {
                        path:'/home/ordersta',
                        name:'订单统计',
                        component:()=>import('../pages/Sales/Ordersta'),
                        mate:{role:['super']}

                    },
                    {
                        path:'/home/accountinfo',
                        name:'个人中心',
                        component:()=>import('../pages/Accountinfo'),
                        mate:{role:['super']}

                    }
                ]
            },
        ],
    
})
const router = new VueRouter()
router.beforeEach((to,from,next)=>{
    from
    if(to.path!='/'){
        Api_checktoken(localStorage.token).then((res)=>{
            if(res.data.code==0){
                if(to.mate.role.includes(localStorage.role)){
                next()
                }else{
                    from()
                }
            }else{
                alert(1)
                console.log(1)
                to('/')
            }
        })
    }else{
        next('/')
    }
})