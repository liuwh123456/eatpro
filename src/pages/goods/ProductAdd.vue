<template>
    <div class="main">
        <div class="content">
            <h4>商品添加</h4>
            <p>商品名称<el-input v-model="goods_name" placeholder="商品名称"></el-input></p>
            <el-form :inline="false"  class="demo-form-inline">
                <el-form-item label="商品分类">
                    <el-select v-model="categories_value" placeholder="请添加商品分类">
                        <el-option v-for="(item,index) in categorieslist" :key="index" :value="item" :label="item.cateName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-input-number v-model="price" @change="handleChange" :min="1" :max="10" label="商品价格"></el-input-number>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-input class="dis"
              type="textarea"
              :rows="2"
              placeholder="商品描述"
              v-model="description">
            </el-input>
            <el-button  type="primary" @click="add">添加商品</el-button>
        </div>
    </div>
</template>

<script>
    import{Api_categories,Api_goodsadd} from '../../api/apis'
    export default {
        data(){
            return{
                categories_value:'',
                price: 1,
                description:'',
                goods_name:'',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                categorieslist:[],
                imageUrl:'',
                imgUrl:''
            }
        },
        methods:{
            handleChange(value) {
                this.price=value
            },
            handleAvatarSuccess(res,file) {
                 this.imageUrl = URL.createObjectURL(file.raw);
               this.imgUrl = res.imgUrl;
               console.log(res)
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
            add(){
                this.params={
                    name:this.goods_name,
                    category:this.categories_value,
                    price:this.price,
                    imgUrl:this. imgUrl,
                    goodsDesc:this. description
                }
                Api_goodsadd(this.params).then((res)=>{
                    if(res.data.code==0){
                        this.$message({message: '添加成功',type: 'success'})
                        this.goods_name='',
                        this.categories_value='',
                        this.price='',
                        this. imgUrl='',
                        this. description=''
                    }else{
                      this.$message.error('添加失败，请稍后重试')
                    }
                })
            }
        },
        created(){
            Api_categories().then((res)=>{
                this.categorieslist=res.data.categories
            })
        }
    }
</script>

<style lang="less" scoped>
    .main{
        width: 100%;
        .content{
            height: 100%;
            background-color: white;
            padding-bottom: 20px;
            padding-top: 20px;
            padding-left: 20px;
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
            h4{
                height: 50px;
                padding-left: 20px;
                line-height: 50px;
                border-bottom:1px solid #F0F2F5 ;
            }
            p{
                font-size:14px ;
                height: 40px;
                color: #7A7BB5;
                line-height: 40px;
                margin-top: 20px;
                margin-bottom: 20px;
                .el-input{
                    width: 400px;
                    margin-left: 10px;
                }
            }
            .el-input-number{
                margin-bottom: 20px;
            }
            .dis{
                margin-top: 20px;
                width: 400px;
            }
            .el-button {
                display: block;
                margin-top: 20px;
                
            }
        }
    }
</style>