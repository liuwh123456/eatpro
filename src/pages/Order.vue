<template>
    <div class="main">
        <div class="content">
            <div class="inquire">
                <span>订单号:<el-input v-model="params.orderNo" placeholder="订单号"></el-input></span>
                <span>收货人:<el-input v-model="params.consignee" placeholder="收货人"></el-input></span>
                <span>手机号:<el-input v-model="params.phone" placeholder="手机号"></el-input></span>
                <span>订单状态:<select v-model="params.orderState"><option value="已完成">已完成</option><option value="未完成">未完成</option>
                <option value="派送中">派送中</option>
                <option value="已受理">已受理</option>
                
                </select></span>
                <p>选择时间：<el-date-picker
                v-model="params.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker><el-button type="primary" @click="search">查询</el-button></p>
            </div>
            <div class="table">
                <el-table
                 :data="tableData"
                 border
                 style="width: 100%">
                 <el-table-column
                   prop="orderNo"
                   label="订单号"
                   width="260">
                 </el-table-column>
                 <el-table-column
                   prop="orderTime"
                   label="下单时间"
                   width="230">
                 </el-table-column>
                 <el-table-column
                   prop="phone"
                   label="手机号"
                   width="260">
                 </el-table-column>
                 <el-table-column
                   prop="consignee"
                   label="收货人"
                   width="220">
                   </el-table-column>
                 <el-table-column
                   prop="deliverAddress"
                   label="配送地址"
                   width="400">
                 </el-table-column>
                 <el-table-column
                   prop="deliveryTime"
                   label="送达时间"
                   width="220">
                 </el-table-column>
                 <el-table-column
                   prop="remarks"
                   label="用户备注"
                   width="220">
                 </el-table-column>
                 <el-table-column
                   prop="orderAmount"
                   label="订单金额"
                   width="220">
                 </el-table-column>
                 <el-table-column
                   prop="orderState"
                   label="订单状态"
                   width="220">
                 </el-table-column>
                 <el-table-column
                   fixed="right"
                   label="操作"
                   width="200">
                   <template slot-scope="scope">
                     <el-button @click="handleClick(scope.$index,tableData)" type="text" size="small">查看</el-button>
                     <el-button type="text" size="small" @click="editorder(scope.$index,tableData)">编辑</el-button>
                   </template>
                 </el-table-column>
                </el-table>
            </div>
            <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="params.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
            <el-dialog
              title="订单详情"
              :visible.sync="dialogVisible"
              width="30%">
              <p v-if="editflag"><el-input v-model="detail.orderNo" placeholder="请输入内容"></el-input></p>
              <p v-else>订单号:{{detail.orderNo}}</p>
              <p v-if="editflag"><el-input v-model="detail.orderTime" placeholder="请输入内容"></el-input></p>
              <p v-else>下单时间:{{detail.orderTime}}</p>
              <p v-if="editflag"><el-input v-model="detail.phone" placeholder="请输入内容"></el-input></p>
              <p v-else>联系电话:{{detail.phone}}</p>
              <p v-if="editflag"><el-input v-model="detail.consignee" placeholder="请输入内容"></el-input></p>
              <p v-else>收货人:{{detail.consignee}}</p>
              <p v-if="editflag"><el-input v-model="detail.deliverAddress" placeholder="请输入内容"></el-input></p>
              <p v-else>送货地址:{{detail.deliverAddress}}</p>
              <p v-if="editflag"><el-input v-model="detail.deliveryTime" placeholder="请输入内容"></el-input></p>
              <p v-else>送达时间:{{detail.deliveryTime}}</p>
              <p v-if="editflag"><el-input v-model="detail.remarks" placeholder="请输入内容"></el-input></p>
              <p v-else>备注:{{detail.remarks}}</p>
              <p v-if="editflag"><el-input v-model="detail.orderAmount" placeholder="请输入内容"></el-input></p>
              <p v-else>订单金额:{{detail.orderAmount}}</p>
              <p v-if="editflag"><el-input v-model="detail.orderState   " placeholder="请输入内容"></el-input></p>
              <p v-else>订单状态:{{detail.orderState}}</p>
              <span slot="footer" class="dialog-footer">
                <el-button v-if="editflag"   @click="close">取 消</el-button>
                <el-button v-else @click="dialogVisible = false">确 认</el-button>
                <el-button v-if="editflag" @click="subedit">确 认</el-button>
              </span>
            </el-dialog>
  </div>
        </div>
    </div>
</template>

<script>
    import{Api_getodrerlist,Api_serch,Api_detail,Api_editorder} from '../api/apis'
    export default {
        data(){
            return{
              params:{
                currentPage:1,
                pageSize:10,
                orderNo:'',
                consignee:'',
                phone:'',
                orderState:'',
                date:'',
              },
              total:1,
              tableData:[],
              detail:[],
              dialogVisible:false,
              editflag:false
            }
        },
        methods: {
            getodrerlist(){
              Api_getodrerlist(this.params).then((res)=>{
                this.total=res.data.total
               this.tableData=res.data.data
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

              for(let i of this.tableData){
                i.orderTime=resolvingDate(i.orderTime)
              }
              })
            },
            handleClick(index,row) {
              this.dialogVisible=true
              Api_detail(row[index].id).then((res)=>{
                this.detail=res.data.data
              })
            },
            editorder(index,row){
               this.dialogVisible=true
               this.editflag=true
                Api_detail(row[index].id).then((res)=>{
                this.detail=res.data.data
              })
            },
            subedit(){
              console.log(this.detail)
              Api_editorder(this.detail).then((res)=>{
                if(res.data.code==0){
                  this.$message({message: '修改成功',type: 'success'})
                  this.dialogVisible = false
                  this. editflag= false
                  this.getodrerlist()
                }else{
                this.$message.error('修改失败，请稍后重试')
                }
              })
              
            },
            close(){
              this.dialogVisible = false
              this.editflag=false
            },
            handleSizeChange(val) {
            this.params.pageSize=val
            console.log(val)
            this.getodrerlist()
            },
            handleCurrentChange(val) {
            this.params.currentPage=val
            this.getodrerlist()
            },
            search(){
              Api_serch(this.params).then((res)=>{
                this.restotal=res.data.total
               this.tableData=res.data.datas
              })
            }
        },
        created(){
          this.getodrerlist()
        }
    }
</script>

<style lang="less" scoped>
    .main{
        .content{
            height: 100%;
            background-color: white;
            padding: 20px;
             .el-pagination{
                margin-left: 20px;
            }
            .inquire{
                span{
                    .el-input,select{
                        width: 15%;
                        border: 1px solid #DCDFE6;
                        height: 40px;
                        margin-right: 20px;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
                }
                p{
                    margin-left: 120px;
                    button{
                        margin-left: 20px;
                    }
                }
            }
            .table{
              margin-top: 20px;
            }
            .el-dialog{
              p{
                height: 40px;
                line-height: 40px;
                margin-top: 20px;
              }
            }
        }
    }
</style>