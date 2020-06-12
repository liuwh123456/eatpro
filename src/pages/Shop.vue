<template>
    <div class="main">
            <div class="content">
              <h4>
                  店铺管理<el-button type="primary" @click="onSubmit">保存</el-button>
              </h4>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="店铺名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
               <el-form-item label="公告">
                  <el-input type="textarea" v-model="form.bulletin" :rows="6"></el-input>
                </el-form-item>
                <el-form-item label="店铺头像">
                  <el-upload
                    class="avatar-uploader"
                    :action="serveIP+'/shop/upload'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!-- <el-image
                  style="width: 100px; height: 100px"
                  :src="form.avatar"></el-image> -->
                </el-form-item>
                 <el-form-item label="店铺图片">
                  <el-upload
                  :action="serveIP+'/shop/upload'"
                  list-type="picture-card"
                  :on-success='success'
                  :file-list="fileList">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="form.dialogImageUrl">
                </el-dialog>
                </el-form-item>
                 <el-form-item label="配送费">
                  <el-input v-model="form.deliveryPrice"></el-input>
                </el-form-item>
                 <el-form-item label="配送时间">
                  <el-input v-model="form.deliveryTime"></el-input>
                </el-form-item>
                 <el-form-item label="配送描述">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
                 <el-form-item label="店铺评分">
                  <el-input v-model="form.score"></el-input>
                </el-form-item> <el-form-item label="销量">
                  <el-input v-model="form.sellCount"></el-input>
                </el-form-item>
                <el-form-item label="活动">
                  <el-checkbox-group v-model="form.supports">
                    <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
                    <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
                    <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
                    <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
                    <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                  <el-time-picker
                  is-range
                  v-model="form.date"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  >
                </el-time-picker>
              </el-form>
            </div>
    </div>
</template>

<script>
  
  import{Api_getshopinfo,Api_editshop,serveIP} from '../api/apis'
  export default {
        data(){
            return{
            form: {
              id:1,
              name:"",
              bulletin: '',
              avatar: '',
              deliveryPrice: '',
              deliveryTime: '',
              description:'',
              score: '',
              sellCount:'',
              supports:[],
              pics:[],
              date:[],
            },
            imageUrl:'',
            dialogVisible: false,
            serveIP:serveIP,
            fileList:[]
            }
        },
        methods:{
          // 获取店铺详情
          getinfo(){
            Api_getshopinfo().then((res)=>{
              this.form=res.data.data
              // console.log(res.data.data.avatar)
              this.imageUrl=this.serveIP+"/upload/shop/"+res.data.data.avatar
              this.fileList=res.data.data.pics.map((url)=>{return this.serveIP+"/upload/shop/"+url})
              this.fileList=this.fileList.map((i)=>{return ("{"+'url: '+"'"+ i +"'"+"}")})
              this.fileList=this.fileList.map((i)=>{return (eval("(" + i + ")"))})
            })
          },
           handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res.imgUrl)
            this.form.avatar=res.imgUrl
            console.log(this.form.avatar)
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          success(res){
            this.form.pics.push(res.imgUrl)
          },
          onSubmit() {
            this.form={
              id:1,
              name:this.form.name,
              bulletin: this.form.bulletin,
              avatar: this.form.avatar,
              deliveryPrice: this.form.deliveryPrice,
              deliveryTime: this.form.deliveryTime,
              description:this.form.description,
              score: this.form.score,
              sellCount:this.form.sellCount,
              supports:JSON.stringify(this.form.supports),
              pics:JSON.stringify(this.form.pics),
              date:JSON.stringify(this.form.date)
            }
            console.log(this.form);
            Api_editshop(this.form).then((res)=>{
              if(res.data.code==0){
                  this.$message({message: '修改成功',type: 'success'})
                  this.getinfo()
                }else{
                this.$message.error('修改失败，请稍后重试')
                }
            })
          }
        },
        created(){
          this.getinfo()
        }
      }
</script>

<style lang="less" scoped>
    .main{
        .content{
            width:98%;
            height: 100%;
            background-color: white;
            margin-top: 1%;
            margin-left: 1%;
            padding-top: 20px;
            padding-bottom: 20px;
            h4{
              padding-left: 20px;
              padding-right: 20px;
              height: 50px;
              line-height: 40px;
              border-bottom: 1px solid #cccccc;
              margin-bottom: 10px;
              .el-button{
                float: right;
              }
            }
            .shopimg{
                padding-left: 30px;
                div{
                    display: inline-block;
                    margin-left: 20px;
                }
            }
            .el-input,.el-textarea{
              width: 400px;
            }
            .el-textarea{
              height: 150px;
            }
            .el-date-editor{
              margin-left: 20px;
            }
            .el-checkbox-group{
                margin-top: 20px;
                margin-left: 20px;
            }
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #409EFF;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .avatar {
              width: 178px;
              height: 178px;
              display: block;
            }
          // .el-button{
          //       margin-top: 20px;
          // }
        }
    }
</style>