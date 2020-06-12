<template>
    <div class="main">
        <div class="content">
            <div class="inquire">
                <p>选择时间：<el-date-picker
                v-model="date_input"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker><el-button type="primary">查询</el-button></p>
            </div>
           
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                order_input:'',
                name_input:'',
                phone_input:'',
                date_input:'',
            }
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>
    .main{
        .content{
            height: 100%;
            background-color: white;
            margin-top: 1%;
            margin-left: 1%;
            padding-top:20px ;
            padding-bottom:20px ;
            padding-left: 20px;
            .el-button{
                margin-left: 20px;
            }
        }
    }
</style>