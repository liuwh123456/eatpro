<template>
    <div class="main">
        <div class="content">
            <h4>账户列表</h4>
              <el-table
                     ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="account"
                      label="账号"
                      width="350">
                    <template slot-scope="scope" >
                      <el-input v-model="account" v-if="edit_flag[scope.$index]"></el-input>
                      <span v-else>{{tableData[scope.$index].account}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="userGroup"
                      label="用户组"
                      width="350">
                    <template slot-scope="scope" >
                      <!-- <el-form :inline="false"  class="demo-form-inline"> -->
                        <!-- <el-form-item label="商品分类"> -->
                          <!-- {{edit_flag[scope.$index]}} -->

                          <el-select v-model="usergroup_value" v-if="edit_flag[scope.$index]">
                          <el-option label="超级管理员" value="超级管理员"></el-option>
                          <el-option label="普通管理员" value="普通管理员"></el-option>
                          </el-select>
                        <span v-else>{{tableData[scope.$index].userGroup}}</span>
                      <!-- </el-form-item> -->
                    <!-- </el-form> -->
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="ctime"
                      label="创建时间"
                      width="450">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                   <template slot-scope="scope">
                     <el-button type="success" @click="edit(scope.$index,tableData)" v-if='edit_flag[scope.$index]'>完成</el-button>
                     <el-button @click="handleEdit(scope.$index,tableData )" v-else>编辑</el-button>
                     <el-button @click="handleDelete(scope.$index,tableData)" type="danger">删除</el-button>
                   </template>
             </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1,5,10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
              <el-button type="danger" @click="delmany">批量删除</el-button><el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
    import{Api_Getacc,Api_edit,Api_Delacc,Api_Delaccs} from '../../api/apis'
    export default {
        data(){
            return{
              account:'',
              currentPage:1,
              pagesize:5,
              tableData:[],
              total:0,
              dellist:[],
              edit_flag:[],
              usergroup_value:'',
              multipleSelection:[]
            }
        },
        methods:{
          getacclist(){
            Api_Getacc(this.currentPage,this.pagesize).then((res)=>{
            this.total=res.data.total
            this.tableData=res.data.data
            for(let i = 0 ; i<this.tableData.length;i++){
              this.edit_flag.push(false)
            }
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
                i.ctime=resolvingDate(i.ctime)
              }
            })
          },
          handleSizeChange(val) {
            this.pagesize = val
            this.getacclist()
          },
          handleCurrentChange(val) {
            this.currentPage = val
          this.getacclist()
          },
          handleEdit(index, rows) {
            // console.log(index, rows[index].id);
            for(let i = 0;i<this.edit_flag.length;i++){
            this.edit_flag[i]=false
          }
          this.edit_flag.splice(index, 1, true)
          this.account=rows[index].account
          this.usergroup_value=rows[index].userGroup
          },
          edit(index,rows){
            this.params={
              id:rows[index].id,
              account:this.account,
              userGroup:this.usergroup_value
            }
            Api_edit(this.params).then((res)=>{
              if(res.data.code==0){
                this.$message({message: '修改成功',type: 'success'})
                this.edit_flag.splice(index, 1, false)
                this.getacclist()
                }else{
                this.$message.error('修改失败，请稍后重试')
                }
            })
          },
          handleDelete(index,rows) {
            Api_Delacc(rows[index].id).then((res)=>{
               if(res.data.code==0){
                        this.$message({message: '删除成功',type: 'success'})
                         this.getacclist()
                    }else{
                    this.$message.error('删除失败，请稍后重试')
                  }
            })
          },
          unique (arr) {
            return Array.from(new Set(arr))
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
            for(let obj of val){
              this.dellist.push(obj.id)
            }
            //得到被选中的id
              this.dellist=this.unique(this.dellist)
          },
          delmany(){
           if(this.dellist.length==1){
             this.$message.error('请至少选择两项')
           }else{
              Api_Delaccs(this.dellist).then((res)=>{
               if(res.data.code==0){
                  this.$message({message: '删除成功',type: 'success'})
                 this.getacclist()
                    }else{
                    this.$message.error('删除失败，请稍后重试')
                  }
            })
           }
          },
          clearSelection(){},
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          }

        },
        created(){
          this.getacclist()
        }
    }
</script>

<style lang="less" scoped>
    .main{
        .content{
            width:96%;
            height: 100%;
            background-color: white;
            margin-top: 1%;
            margin-left: 1%;
            padding-top: 20px;
            padding-left: 20px;
            padding-bottom: 20px;
            h4{
                height: 50px;
                padding-left: 20px;
                line-height: 50px;
                border-bottom:1px solid #F0F2F5 ;
            }
            .el-button{
              margin-top: 20px;
            }
        }
    }
</style>