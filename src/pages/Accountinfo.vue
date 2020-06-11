<template>
    <el-card shadow="always">
      <p>管理员ID：{{info.id}}</p>
      <p>账号：{{info.account}}</p>
      <p>用户组：{{info.userGroup}}</p>
      <p>创建时间：{{info.ctime}}</p>
            <span class="demonstration">管理员头像:</span>
           <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="{id:this.id}"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
    </el-card>
</template>

<script>
    import {Api_accountinfo} from '../api/apis'
    export default {
        data(){
            return{
                info:{},
                imageUrl: '',
                id:localStorage.id                
            }
            },
        methods: {
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            window.location.reload()
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
          }
        },
        created(){
            Api_accountinfo(localStorage.id).then((res)=>{
            this.info=res.data.accountInfo 
            })
    }        
    }

</script>

<style lang="less" scoped>
    p{
        line-height: 60px;
        height: 60px;
        border-bottom: 1px solid #ccc;
    }
    
        .demonstration{
        line-height: 100px;
        
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
</style>