<template>
  <div class="main">
    <h1>登录</h1>
    <el-input v-model="acc_input" placeholder="请输入用户名"></el-input>
    <el-input placeholder="请输入密码" v-model="pwd_input" show-password></el-input>
    <el-button type="info" round @click="login">登录</el-button>
  </div>
</template>

<script>
import {Api_login} from '../api/apis'
export default {
    data() {
    return {
          acc_input:'',
          pwd_input:'',
          isclick:true
        }
    },
    methods:{
      login(){
       if(this.isclick){
        let  params={account:this.acc_input,password:this.pwd_input}
        Api_login(params).then((res)=>{
          if(res.data.code==0){
            //本地存储
            localStorage.token=res.data.token
            localStorage.account=this.acc_input
            localStorage.id=res.data.id
            localStorage.role=res.data.role
            console.log(localStorage.token,localStorage.id,localStorage.role,localStorage.account)
            this.$message({message: '恭喜你，登录成功',type: 'success'})
            setTimeout(()=>{
                this.$router.push('/home/index')
            },1000)
          }else{
            this.$message.error('用户或者密码错误')
          }
        })
        this.isclick=false
        }else{
          setTimeout(()=>{this.isclick=true},3000)
        }
      }
    }
  }
</script>

<style  scoped>
  
  .main{
    height: 100%;
    width: 100%;
    background-color:#adc2b5;
    padding-top: 30px;
  }
  h1{
    color: #829D93;
    text-align: center;
  }
  .el-input{
    width: 240px;
    margin: 30px auto;
    display: block;
    border-radius: 20px;
  }
  .el-button{
    margin: 30px auto;
    width: 120px;
    display: block;
    background-color: #829D93;
  }
</style>