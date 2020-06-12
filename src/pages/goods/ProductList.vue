<template>
    <div class="main">
            <div class="content">
                <h4>商品列表</h4>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  >
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品ID">
                          <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="商品名称">
                          <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属分类">
                          <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格">
                          <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="商品图片">
                          <span>{{ props.row.imgUrl}}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                          <span>{{ props.row.ctime }}</span>
                        </el-form-item>
                        <el-form-item label="商品评价">
                          <span>{{ props.row.rating}}</span>
                        </el-form-item>
                        <el-form-item label="商品数量">
                          <span>{{ props.row.sellCount}}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                          <span>{{ props.row.goodsDesc}}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    label="所属分类"
                    prop="category">
                  </el-table-column>
                  <el-table-column
                    label="商品价格"
                    prop="price">
                  </el-table-column>
                  <el-table-column
                    label="商品图片">
                   <template slot-scope="scope">
                  <div class="demo-image">
                    <div class="block" >
                      <!-- <span class="demonstration">{{ fit }}</span> -->
                      <el-image
                        style="width: 60px; height: 60px"
                        :src="tableData[scope.$index].imgUrl"
                        ></el-image>
                        <!-- :fit="fit" -->
                    </div>
                  </div>
                   </template>
                  </el-table-column>
                  <el-table-column
                    label="商品描述"
                    prop="goodsDesc">
                  </el-table-column>
                  <el-table-column
                   fixed="right"
                   label="操作"
                   width="200">
                   <template slot-scope="scope">
                    <!-- <el-button type="success" @click="edit(scope.$index,tableData)" v-if='edit_flag[scope.$index]'>完成</el-button> -->
                     <el-button @click="handleEdit(scope.$index,tableData)"  type="primary">编辑</el-button>
                     <el-button @click="handleDelete(scope.$index,tableData)" type="danger">删除</el-button>
                  </template>
                 </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="restotal">
                </el-pagination>  
                 <el-dialog
                    title="添加分类"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                    <p>商品名称:<el-input v-model="edit.name"></el-input></p>
                    <p>商品分类:<el-input v-model="edit.category"></el-input></p>
                    <p>商品价格:<el-input v-model="edit.price"></el-input></p>
                    <p>商品图片地址:<el-input v-model="edit.imgUrl"></el-input></p>
                    <p>商品描述:<el-input v-model="edit.goodsDesc"></el-input></p>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="editgoods">确 定</el-button>
                    </span>
                  </el-dialog>
                </div>
    </div>
</template>

<script>
    import{Api_getgoodslist,Api_Delgoods,Api_editgoods,serveIP} from '../../api/apis'
    export default {
        data(){
            return{
              currentPage: 1,
              pagesize:10,
              tableData:[],
              restotal:1,
              dialogVisible:false,
              edit:{},
              serveIP:serveIP
            }
        },
        methods:{
          getlist(){
            Api_getgoodslist(this.currentPage,this.pagesize).then((res)=>{
               this.restotal=res.data.total
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
                  i.imgUrl=this.serveIP+"/upload/imgs/goods_img/"+i.imgUrl
                  console.log(i.imgUrl)
              }
              for(let i of this.tableData){
                i.ctime=resolvingDate(i.ctime)
              }
            })
          },
          handleSizeChange(val){
            this.pagesize=val
            this.getlist()
          },
          handleCurrentChange(val){
            this.currentPage=val
            this.getlist()
          },
          // getindex(row,event,colum){
          //   console.log(row,event,colum)
          // },
          handleEdit(index, rows) {
            // console.log(index, row);
            this.dialogVisible = true;
            this.edit=rows[index]
          },
          editgoods(){
            Api_editgoods(this.edit).then((res)=>{
              if(res.data.code==0){
                this.$message({message: '修改成功',type: 'success'})
                this.dialogVisible = false
                this.getlist()
                }else{
                this.$message.error('修改失败，请稍后重试')
                }
            })
          },
          handleDelete(index, rows) {
            Api_Delgoods(rows[index].id).then((res)=>{
              if(res.data.code==0){
                this.$message({message: '删除成功',type: 'success'})
                this.getlist()
                }else{
                  this.$message.error('删除失败，请稍后重试')
                }
            })
          }
        },
        created(){
          this.getlist()
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
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 20px;
            h4{
                height: 50px;
                padding-left: 20px;
                line-height: 50px;
                border-bottom:1px solid #F0F2F5 ;
            }
            .el-pagination{
                margin-left: 20px;
            }
            .demo-table-expand {
               font-size: 0;
            }
            .demo-table-expand label {
               width: 90px;
               color: #99a9bf;
            }
            .demo-table-expand .el-form-item {
               margin-right: 0;
               margin-bottom: 0;
               width: 50%;
            }
        }
    }
</style>