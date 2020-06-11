<template>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <el-menu
          router
          unique-opened
          :default-active="path"
          class="el-menu-vertical-demo"
          background-color="#adc2b5"
          text-color="#829D93"
          active-text-color="#f0f5f2">
          <img src="../assets/imgs/indexicon.png"  class="indexicon" alt="伊管理平台">
          <span class="index_title">伊特外卖管理平台</span>
          <div v-for="item in newaside" :key="item.index">
            <el-submenu v-if="item.children" :index="item.index">
                <!-- <i :class="item.clssrc"></i> -->
                <span slot="title">{{item.asidename}}</span>
                <el-menu-item-group>
                  <el-menu-item v-for="child in item.children" :key="child.index"  :index="child.index">
                    <i :class="child.clssrc"></i>
                    <span slot="title">{{child.asidename}}</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.index">
              <i :class="item.clssrc"></i>
              <span slot="title">{{item.asidename}}</span>
            </el-menu-item>
          </div>    
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in hasharr" :key="item">{{item}}</el-breadcrumb-item>
            <div class="top_right">
              <span v-html="masg"></span>
              <el-row class="demo-avatar demo-basic">
                <div class="demo-basic--circle">
                  <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                </div>
              </el-row>
            </div>
          </el-breadcrumb>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
    import {Api_checktoken,Api_accountinfo} from '../api/apis'
    export default {
        data(){
          return{
            aside:[{index:'/home/index',clssrc:'el-icon-location',asidename:'后台首页',role:"['super','normal']",num:1},
              {index:'/home/order',clssrc:'el-icon-location',asidename:'订单管理',role:"['super','normal']"},
              {index:'1',clssrc:'el-icon-location',asidename:'商品管理',children:[
                {index:'/home/prolist',clssrc:'el-icon-location',asidename:'商品列表'},
                {index:'/home/proadd',clssrc:'el-icon-location',asidename:'添加商品'},
                {index:'/home/categories',clssrc:'el-icon-location',asidename:'商品分类'}
                ],role:"['super','normal']"
              },
              {index:'/home/shop',clssrc:'el-icon-location',asidename:'店铺管理',role:"[super]"},
              {index:'2',clssrc:'el-icon-location',asidename:'账户管理',children:[{
                index:'/home/acclist',clssrc:'el-icon-location',asidename:'账户列表'},
                {index:'/home/addAcc',clssrc:'el-icon-location',asidename:'添加账户'},
                {index:'/home/chagepwd',clssrc:'el-icon-location',asidename:'修改密码'}
              ],role:"[super]"},
              {index:'3',clssrc:'el-icon-location',asidename:'销售统计',children:[{
                index:'/home/Comsta',clssrc:'el-icon-location',asidename:'商品统计'},
                {index:'/home/ordersta',clssrc:'el-icon-location',asidename:'订单统计'}
              ],role:"[super]"},
            ],
            hasharr:[],
            path:'',
            circleUrl: '',
            name:localStorage.account,
            masg:'',
            role:localStorage.role            
          }
        },
        methods: {
          breadname(hash){
            let arr=[]
            switch(hash){
              case '/home/index': arr=[];   break;
              case '/home/order': arr=['订单管理'];   break;
              case '/home/prolist': arr=['商品管理','商品列表'];   break;
              case '/home/proadd': arr=['商品管理','添加商品'];   break;
              case '/home/categories': arr=['商品管理','商品分类'];   break;
              case '/home/shop': arr=['店铺管理'];   break;
              case '/home/addAcc': arr=['账户管理','添加账户'];   break;
              case '/home/chagepwd': arr=['账户管理','修改密码'];   break;
              case '/home/Comsta': arr=['销售统计','商品统计'];   break;
              case '/home/ordersta': arr=['销售统计','商品统计'];   break;
              case '/home/accountinfo': arr=['个人中心'];   break;
            }
            this.hasharr=arr
          }, 
        },
        watch:{
           $route: {
            handler: function(val){
            window.__this.breadname(val.path)
            },
            // 深度观察监听
            deep: true
          }
        },
        computed:{
          newaside(){
            //首先取到原数组的role以及本地存储的role然后使用filter过滤生成新数组过滤条件是item.role里面有本地存储的role使用数组的include方法判定
            return this.aside.filter(i=>i.role.includes(this.role)) 
          }
        },
        created(){
          window.__this=this
          this.path=this.$route.path
          this.breadname(this.path)
          Api_checktoken(localStorage.token).then((res)=>{
            if(res.data.code==0){
              this.masg=`<a href='http://localhost:8080/#/home/accountinfo'><span>欢迎你,${this.name}</span></a>`
            }else{
              this.masg="<a href='http://localhost:8080/#/'>亲，请登录</a>"
            }
          }),
          Api_accountinfo(localStorage.id).then((res)=>{
          this.circleUrl=res.data.accountInfo.imgUrl
           })
        }
    }
</script>

<style lang="less" scoped>
 .el-header, .el-footer {
    background-color: #ADC2B5;
    color: #829D93;
    text-align: center;
    height: 60px;
    .el-breadcrumb{
      display: block;
      line-height: 60px;
      height: 60px;
      .top_right{
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        height: 60px;display: flex;
        span{
          margin-right: 10px;
        }
      }
      .el-breadcrumb__separator{
        color: #829D93;
      }
    }
  }
  .el-container{
    height: 100%;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
    // line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  a{
        text-decoration: none;
        color: #829D93;
    }
    .indexicon{
        margin-top: 10px;
        margin-left: 10px;
        width: 40px;
    }
    .index_title{
      height: 40px;
      display: inline-block;
      color: aquamarine;
      line-height: 40px;
    }
    .el-menu{
        border: 0;
        height: 100%;
    }
    .el-menu-item{
        height: 60px;
    }
</style>