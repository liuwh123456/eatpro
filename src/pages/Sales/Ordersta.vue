<template>
    <div class="main">
        <div class="content">
            <h4>订单统计</h4>
            <p>选择时间：<el-date-picker
            v-model="date_input"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker><el-button type="primary" @click="search">查询</el-button></p>
            <div id="chartsbox"></div>
        </div>
    </div>
</template>

<script>
    import{Api_orderdate} from '../../api/apis'
    import echarts from 'echarts'
    export default {
        data(){
            return{
                date_input:'',
            }
        },
        methods: {
            search(){
                var mycharts = echarts.init(document.getElementById("chartsbox"))
                Api_orderdate(JSON.stringify(this.date_input)).then((res)=>{
                    this.orderlist=res.data.data
                    var timearr = this.orderlist.map((i)=>{return i.orderTime})
                    var amountarr = this.orderlist.map((i)=>{return i.orderAmount})
                      //  时间转换函数
                   function resolvingDate(date){
                  //date是传入的时间
                    let d = new Date(date);
                    let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
                    let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                    let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
                    let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
                    let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
                    let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
                    return times
                    }
                    var newtimearr=[]
                    for(let i=0;i<timearr.length;i++){
                        newtimearr.push(resolvingDate(timearr[i]))
                    }
                    let option = {
                        xAxis: {
                            type: 'category',
                            data: newtimearr
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: amountarr,
                            type: 'line',
                            smooth: true
                        }]
                    }
                    mycharts.setOption(option)
                })
            }
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
            padding-left: 20px;
            h4{
              padding-left: 20px;
              padding-right: 20px;
              height: 50px;
              line-height: 40px;
              border-bottom: 1px solid #cccccc;
              margin-bottom: 10px;}
            #chartsbox{
                width: 1640px;
                height: 700px;
            }
            .el-button{
                margin-left: 20px;
            }
        }
    }
</style>