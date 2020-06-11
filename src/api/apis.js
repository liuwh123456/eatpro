import axios from 'axios'
axios.defaults.baseURL='http://localhost:5000'
//登录
export const Api_login=(params)=>axios.post('/users/checkLogin',params)
// 添加账户
export const Api_Addacc=(params)=>axios.post('/users/add',params)
// 获取列表
export const Api_Getacc=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
// 修改账户
export const Api_edit=(params)=>axios.post('/users/edit',params)
//删除账户
export const Api_Delacc=(id)=>axios.get('/users/del',{params:{id}})
//批量删除
export const Api_Delaccs=(ids)=>axios.get('/users/batchdel',{params:{ids:[ids]}})
// 检查旧密码
export const Api_checkoldpwd=(id,oldPwd)=>axios.get('/users/checkoldpwd',{params:{id,oldPwd}})
// 修改密码
export const Api_editpwd=(params)=>axios.post('/users/editpwd',params)
//token
export const Api_checktoken=(token)=>axios.get('/users/checktoken',{params:{token}})
 //获取账户信息
export const Api_accountinfo=(id)=>axios.get('/users/accountinfo',{params:{id}})
//获取商品分类列表
export const Api_getcatelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//删除分类
export const Api_Delcate=(id)=>axios.get('/goods/delcate',{params:{id}})
// 添加分类
export const Api_addcate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})
// 修改分类分类
export const Api_editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})
//获取商品分类
export const Api_categories=()=>axios.get('/goods/categories',{params:{}})
//添加分类
export const Api_goodsadd=(params)=>axios.post('/goods/add',params)
//获取商品列表
export const Api_getgoodslist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})
//删除分类
export const Api_Delgoods=(id)=>axios.get('/goods/del',{params:{id}})
//修改商品
export const Api_editgoods=(params)=>axios.post('/goods/edit',params)
//获取订单列表
export const Api_getodrerlist=(params)=>axios.get('/order/list',{params:params})
//查询订单
export const Api_serch=(params)=>axios.get('/order/search',{params:params})
//查看订单
export const Api_detail=(id)=>axios.get('/order/detail',{params:{id}})
//修改订单
export const Api_editorder=(params)=>axios.post('/order/edit',params)
//获取店铺详情
export const Api_getshopinfo=()=>axios.get('/shop/info',{params:{}})
// //店铺内容修改
export const Api_editshop=(params)=>axios.post('/shop/edit',params)
//获取首页报表
export const Api_totladata=()=>axios.get('/order/totaldata',{params:{}})
//获取订单报表
export const Api_orderdate=(date)=>axios.get('/order/ordertotal',{params:{date}})