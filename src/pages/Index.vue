<template>
    <div class="main">
        <div class="main_card">
            <el-card class="box-card"><img src="../assets/imgs/index1.png"><div class="cardtext"><span>总订单</span>{{list.totalOrder}}</div></el-card>
            <el-card class="box-card"><img src="../assets/imgs/index2.png"><div class="cardtext"><span>总销售额</span>{{list.totalAmount}}</div></el-card>
            <el-card class="box-card"><img src="../assets/imgs/index3.png"><div class="cardtext"><span>今日订单数</span>{{list.todayOrder}}</div></el-card>
            <el-card class="box-card"><img src="../assets/imgs/index4.png"><div class="cardtext"><span>今日销售额</span>{{list.totayAmount}}</div></el-card>
        </div>
        <div id="echartsbox">
            <!-- 这里是Echarts -->

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import{Api_totladata} from '../api/apis'
    export default {
        data(){
            return{
                list:''
            }
        },
        mounted(){
            var mycharts = echarts.init(document.getElementById("echartsbox"))
            Api_totladata().then((res)=>{ 
                this.list=res.data
                let option = {
                  title: {
                        text: '数据统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['订单数据', '金额数据']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: res.data.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '订单数据',
                            type: 'line',
                            stack: '总量',
                            data: res.data.orderData
                        },
                        {
                            name: '金额数据',
                            type: 'line',
                            stack: '总量',
                            data: res.data.amountData
                        }
                    ]
                }
                mycharts.setOption(option)
            })
        }
    }
</script>

<style lang='less' scoped>
    .main{
        width: 100%;
        #echartsbox{
            width: 1640px;
            padding-top: 20px;
            padding-bottom: 20px;
            height: 660px;
            margin-top: 20px;
            margin-left: 20px;
            background-color: white;
        }
        .main_card{
            width: 1680px;
            display: flex;
            justify-content: space-around;
            img{
                width: 110px;
                float: left;
                margin-bottom: 20px;
            }
            .cardtext{
                float:right;
                margin-right: 20px;
                font-size: 26px;
                text-align: left;
                span{
                font-size: 40px;
                color: #CDCDCD;
                display: block;
                }
            }
            .box-card {
                width: 23%;
            }
        }
    }
</style>