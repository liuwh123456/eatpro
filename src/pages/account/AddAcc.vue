<template>
    <div class="main">
        <div class="content">
        <h4>添加账户</h4>
        <p>账号：<el-input v-model="acc_input" placeholder="用户名"></el-input></p>
        <p>密码：<el-input v-model="pwd_input" placeholder="密码"></el-input></p>
        
        <el-form ref="form"  label-width="80px">
          <el-form-item label="用户组:">
            <el-select v-model="group" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="info" @click="reset">重置</el-button>
        </div>
    </div>
</template>

<script>
import{Api_Addacc} from '../../api/apis'
    export default {
        data(){
            return{
                acc_input:'',
                pwd_input:'',
                group: ''
            }
        },
        methods:{
            add(){
                let params ={
                    account:this.acc_input,
                    password:this.pwd_input,
                    userGroup:this.group
                }
                this.acc_input='',
                this.pwd_input=''
                Api_Addacc(params).then((res)=>{
                     if(res.data.code==0){
                        this.$message({message: '恭喜你，添加成功',type: 'success'})
                    }else{
                    this.$message.error('添加失败，请稍后重试')
                  }
                })
            },
            reset(){
                this.acc_input='',
                this.pwd_input=''
            }
        }
    }
</script>

<style lang="less" scoped>
     .main{
        height: 100%;
        .content{
            height: 100%;
            background-color: white;
            padding-left: 20px;
            h4{
                height: 50px;
                padding-left: 20px;
                line-height: 50px;
                border-bottom:1px solid #F0F2F5 ;
            }
            p{
                margin-top: 20px;
                margin-left: 20px;
                .el-input{
                    width: 400px;
                    height: 40px;
                }
            }
            .el-form{
                margin-top: 80px;
            }
            .el-form-item__content{
                width: 400px;
            }
            .el-button{
              margin-top: 100px;
            }
        }
    }
</style>