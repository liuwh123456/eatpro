<template>
    <div class="main">
            <div class="content">
                <h4>商品分类 <el-button type="primary" @click="dialogVisible = true">添加分类</el-button></h4>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="序号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="cateName"
                    label="分类名称"
                    width="380">
                  <!-- <template slot-scope="scope"> -->
                  <template slot-scope="scope" >
                    <el-input v-model="newname" v-if="edit_flag[scope.$index]"></el-input>
                    <span v-else>{{tableData[scope.$index].cateName}}</span>
                  </template>

                  <!-- </template> -->
                  </el-table-column>
                  <el-table-column
                    label="是否启用"
                    width="380">
                  <template slot-scope="scope" >
                    <el-switch
                      v-model="statearr[scope.$index]"
                      active-color="#13ce66"
                      inactive-color="#ff4949" >
                    </el-switch>
                  </template>
                  </el-table-column>
                  <el-table-column
                   fixed="right"
                   label="操作"
                   width="400">
                   <template slot-scope="scope">
                     <el-button type="success" @click="editcate(scope.$index)" v-if='edit_flag[scope.$index]'>完成</el-button>
                     <el-button @click="handleEdit(scope.$index,tableData)" v-else>编辑</el-button>
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
              :total="total">
            </el-pagination>
            <el-dialog
              title="添加分类"
              :visible.sync="dialogVisible"
              width="30%"
              >
            <p>分类名称：<el-input v-model="cateName_input" placeholder="分类名称"></el-input></p>
            <p>是否启用：<el-switch
                          v-model="state_value"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                           >
                        </el-switch></p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addcate">确 定</el-button>
              </span>
            </el-dialog>
            </div>
    </div>
</template>

<script>
    import{Api_getcatelist,Api_addcate,Api_Delcate,Api_editcate} from '../../api/apis'
    export default {
      data(){
                    return{
          currentPage:1,
          pagesize:10,
          tableData:[],
          total:0,
          cateName_input:'',
          dialogVisible: false,
          state:false,
          state_value:true,
          edit_flag:[],
          newname:'',
          newsate:'',
          statearr:[]

        }
      },
      methods:{
        getcatelist(currentPage){
          Api_getcatelist(currentPage,this.pagesize).then((res)=>{
            this.tableData=res.data.data
            this.total=res.data.total
          for(let i = 0 ; i<this.tableData.length;i++){
              this.edit_flag.push(false)
            }
            this.statearr=this.tableData.map(item=>item.state)
          for(let i = 0;i<this.statearr.length;i++){
            this.statearr[i]=Boolean(this.statearr[i])
          }
          })
        },
        handleSizeChange(val){
          this.pagesize = val
         this.getcatelist(this.currentPage)

        },
        handleCurrentChange(val){
          this.currentPage = val
          this.getcatelist(this.currentPage)
        },
        addcate(){
          this.state_value=this.state_value.toString()
          Api_addcate(this.cateName_input,this.state_value.toString()).then((res)=>{
            if(res.data.code==0){
              this.$message({message: '添加成功',type: 'success'})
              this.getcatelist(this.currentPage)
            }else{
              this.$message.error('添加失败，请稍后重试')
              this.getcatelist(this.currentPage)
            }
          })
        },
        handleEdit(index, rows) {
          for(let i = 0;i<this.edit_flag.length;i++){
            this.edit_flag[i]=false
          }
          this.edit_flag.splice(index, 1, true)
          this.newname=rows[index].cateName
          },
          handleDelete(index,rows) {
            Api_Delcate(rows[index].id).then((res)=>{
               if(res.data.code==0){
                    this.$message({message: '删除成功',type: 'success'})
                    this.getcatelist(this.currentPage)
                    }else{
                    this.$message.error('删除失败，请稍后重试')
                  }
            })
          },
          editcate(index){
            this.newsate=this.statearr[index].toString()
            Api_editcate(this.tableData[index].id,this.newname,this.newsate).then((res)=>{
              if(res.data.code==0){
                this.$message({message: '修改成功',type: 'success'})
                this.edit_flag.splice(index, 1, false)
                this.getcatelist(this.currentPage)
                }else{
                this.$message.error('修改失败，请稍后重试')
                }
            })
          },
        },
      created(){
         this.getcatelist(this.currentPage)
      }
    }
</script>

<style lang="less" scoped>
    .main{
        .content{
            width: 100%;
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
              .el-button{
                float: right;
                margin-right: 40px;
              }
            }
            p{
              margin-top:20px;
              .el-input{
                width: 300px;
              }
            }
        }
    }
</style>