<template>
    <div class="main">
            <div class="content">
            <h4>修改密码</h4>
            <p>账号：<el-input v-model="acc_input" placeholder="用户名"></el-input></p>
            <p>密码：<el-input v-model="opwd_input" placeholder="密码"></el-input></p>
            <p>新密码：<el-input v-model="npwd_input" placeholder="新密码"></el-input></p>
           
            <el-button type="primary" @click="chagepwd">确定</el-button>
            <el-button type="info" @click="reset">重置</el-button>
            </div>
    </div>
</template>

<script>
    import{Api_checkoldpwd} from '../../api/apis'
    import{Api_editpwd} from '../../api/apis'
    export default {
        data(){
            return{
                acc_input:'',
                opwd_input:'',
                npwd_input:'',
              
            }
        },
        methods:{
            chagepwd(){
                Api_checkoldpwd(localStorage.id,this.opwd_input).then((res)=>{
                    if(res.data.code==0){
                        let params={
                            newPwd:this.npwd_input,
                            id:localStorage.id
                            }
                        Api_editpwd(params).then((res)=>{
                            if(res.data.code==0){
                                this.$message({message: '密码修改成功',type: 'success'})
                                this.acc_input='',
                                this.opwd_input='',
                                this.npwd_input=''
                            }else{
                                this.$message.error('修改失败，请稍后重试')
                                console.log(this.params)
                                console.log(this.npwd_input)
                            }
                        })
                    }else{
                        this.$message.error('密码与账户不符请检查重试')
                    }
                })
            },
            reset(){
                this.acc_input='',
                this.opwd_input='',
                this.npwd_input=''
            }
        }
    }
</script>

<style lang="less" scoped>
     .main{
        height: 100%;
        .content{
            width:96%;
            height: 90%;
            background-color: white;
            margin-top: 1%;
            margin-left: 1%;
             padding-top: 20px;
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
                }
            }
            .el-button{
              margin-top: 20px;
            }
        }
    }
</style>