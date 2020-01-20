<template>
  <div class="app-container">
    <el-form class="detail-form" autocomplete="on" :model="fruitForm" :rules="fruitRules" ref="fruitForm" label-position="left" label-width="100px">
      <div class="bread">
        <span class="btn" @click="returnPage">商品管理</span>
        <span class="line"> >> </span>
        <span class="btn1">商品编辑</span>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="fruitName" label="商品名称">
            <el-input class="width250" name="fruitName" type="text" v-model="fruitForm.fruitName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fruitType" label="商品种类">
            <el-select v-model="fruitForm.fruitType" placeholder="请选择" :on-change="getUpdateCommodity(fruitForm.fruitType)">
              <el-option v-for="item in updateCommodity" :key="item.value" :lable="item.value" :value="item.lable"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="fruitNum" label="商品重量">
            <el-input class="width250" name="fruitNum" type="text" v-model="fruitForm.fruitNum" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fruitWeight" label="商品包装">
            <el-input class="width250" name="fruitWeight" type="text" v-model="fruitForm.fruitWeight" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品价格">
            <el-form-item prop="fruitVipPrice" label="会员" label-width="66px" class="member">
              <el-input class="width100" name="fruitVipPrice" type="text" v-model="fruitForm.fruitVipPrice" />
            </el-form-item>
            <el-form-item prop="fruitPrice" label="非会员" label-width="66px">
              <el-input class="width100" name="fruitPrice" type="text" v-model="fruitForm.fruitPrice" />
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商品信息">
            <el-row>
              <el-col :span="3">
                <el-form-item prop="fruitOriginPlace">
                  <p class="text">产地</p>
                  <el-input class="width110" name="fruitOriginPlace" type="text" v-model="fruitForm.fruitOriginPlace" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitSpecifications">
                  <p class="text">规格</p>
                  <el-input class="width110" name="fruitSpecifications" type="text" v-model="fruitForm.fruitSpecifications" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitPacking">
                  <p class="text">包装</p>
                  <el-input class="width110" name="fruitPacking" type="text" v-model="fruitForm.fruitPacking" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="fruitQuality">
                  <p class="text">保鲜期</p>
                  <el-input class="width110" name="fruitQuality" type="text" v-model="fruitForm.fruitQuality" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitStorageMode">
                  <p class="text">储存方式</p>
                  <el-input class="width110" name="fruitStorageMode" type="text" v-model="fruitForm.fruitStorageMode" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="fruitPictureUrl" label="列表图片">
            <el-upload ref="upload1" action :http-request="handleFile" :on-change="fruitPictureUrl_file" :multiple="false"
              :limit="1" :file-list="fruitPictureUrl" accept="image/jpeg, image/gif, image/png, image/bmp"
              :before-upload="beforeAvatarUpload" list-type="picture">
              <el-button size="small" type="primary" @click="clearUploadedImage('upload1')">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fruitDetailCarousel" label="轮播图">
            <el-upload ref="upload2" action :http-request="handleFile" :on-change="fruitDetailCarousel_file" :multiple="true"
              :limit="3" :file-list="fruitDetailCarousel" accept="image/jpeg, image/gif, image/png, image/bmp"
              :before-upload="beforeAvatarUpload" list-type="picture">
              <el-button size="small" type="primary" @click="clearUploadedImage('upload2')">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="fruitDetail" label="详情页">
            <el-upload ref="upload3" action :http-request="handleFile" :on-change="fruitDetail_file" :multiple="true"
              :limit="3" :file-list="fruitDetail" accept="image/jpeg, image/gif, image/png, image/bmp"
              :before-upload="beforeAvatarUpload" list-type="picture">
              <el-button size="small" type="primary" @click="clearUploadedImage('upload3')">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="dialog-footer" style="float:right;margin-right: 212px;">
        <el-button @click="colseForm">取消</el-button>
        <el-button @click="updateFruit" :disabled="isDisabled">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import fruitApi from "@/api/fruit";
  import {validateNum,validateDecimal} from "@/utils/validate";
  import {updateCommodity} from "@/utils/commodity";
  import store from "@/store";
  import {getToken} from "@/utils/auth";
  import axios from "axios";
  export default {
    name: "updateFruit",
    data() {
      return {
        updateCommodity: updateCommodity,
        fruitForm: {
          id: null,
          fruitName: null,//商品名称
          fruitType:null,//商品种类
          updateCommodity:null,
          fruitNum:null,//商品重量
          fruitWeight:null,//商品标签
          fruitVipPrice:null,//商品价格（会员）
          fruitPrice:null,//商品价格（非会员）
          fruitOriginPlace:null,//商品信息-产地
          fruitSpecifications:null,//商品信息-规格
          fruitPacking:null,//商品信息-包装
          fruitQuality:null,//商品信息-保鲜期
          fruitStorageMode:null,//商品信息-存储方式
        },
        fruitDetail: [],
        fruitPictureUrl: [],
        fruitDetailCarousel: [],
        fruitRules: {
          // 商品名称
          fruitName: [{
            required: true,
            trigger: "blur",
            message: "必填"
          }],
          // 商品种类
          updateCommodity:[{
            required: true,
            trigger: "blur",
            message: "必选"
          }],
          // 商品重量
          fruitNum: [{
            required: true,
            trigger: "blur",
            message: "必填"
          }],
          // 商品标签
          fruitWeight: [{
            required: true,
            trigger: "blur",
            message: "必填"
          }],
          // 商品价格（会员）
          fruitVipPrice: [{
            required: true,
            trigger: "blur",
            message: "必填"
          }],
          // 商品价格（非会员）
          fruitPrice: [{
            required: true,
            trigger: "blur",
            message: "必填"
          }]
        },
        isDisabled: false
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        //格式化表单
        let id = this.$route.params.id;
        if (!id) id = 1;
        fruitApi.selectFruit(id).then(res => {
          if (res.data.code == 1000) {
            this.fruitForm = res.data.data;
            this.fruitForm.fruitType=this.getUpdateCommodityLable(this.fruitForm.fruitType);
          }
        });
      },
      // listenToChild(val) {
      //   this.fruitForm.activityContent = val;
      // },
      handleFile() {},
      clearUploadedImage(type) {
        // 重新选择文件时清空文件列表
        if (type === "upload1") {
          this.$refs.upload1.clearFiles();
          this.fruitPictureUrl = [];
        } else if (type === "upload2") {
          this.$refs.upload2.clearFiles();
          this.fruitDetailCarousel = [];
        } else if (type === "upload3") {
          this.$refs.upload3.clearFiles();
          this.fruitDetail = [];
        }
      },
      fruitPictureUrl_file(file, fileList) {
        // 活动封面 on-change 事件
        this.fruitPictureUrl = fileList;
      },
      fruitDetailCarousel_file(file, fileList) {
        // 详情页图 on-change 事件
        this.fruitDetailCarousel = fileList;
      },
      fruitDetail_file(file, fileList) {
        // 详情页图 on-change 事件
        this.fruitDetail = fileList;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isGIF = file.type === "image/gif";
        const isPNG = file.type === "image/png";
        const isBMP = file.type === "image/bmp";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      },
      // 商品种类
      getUpdateCommodity(value) {
        for(let i = 0; i < updateCommodity.length; i++){
          if(value==updateCommodity[i].lable){
            console.log(updateCommodity[i].value)
            return updateCommodity[i].value;
          }
        }
      },
      getUpdateCommodityLable(value){
        for(let i = 0; i < updateCommodity.length; i++){
          if(value==updateCommodity[i].value){
            console.log(updateCommodity[i].value)
            return updateCommodity[i].lable;
          }
        }
      },
      updateFruit() {
        this.$refs.fruitForm.validate(valid => {
          if (valid) {
            this.isDisabled = true;
            let formData = new FormData();
            var formData = new window.FormData()
            //表单的数据
            formData.append("id", this.fruitForm.id);
            formData.append("fruitName", this.fruitForm.fruitName);//商品名称
            formData.append('fruitType', this.getUpdateCommodity(this.fruitForm.fruitType));//商品种类
            formData.append("fruitNum", this.fruitForm.fruitNum);//商品数量
            formData.append("fruitWeight", this.fruitForm.fruitWeight);//商品标签
            formData.append("fruitVipPrice", this.fruitForm.fruitVipPrice);//商品价格（会员）
            formData.append("fruitPrice", this.fruitForm.fruitPrice);//商品价格（非会员）
            formData.append("fruitOriginPlace", this.fruitForm.fruitOriginPlace);//商品信息-产地
            formData.append("fruitSpecifications", this.fruitForm.fruitSpecifications);//商品信息-规格
            formData.append("fruitPacking", this.fruitForm.fruitPacking);//商品信息-包装
            formData.append("fruitQuality", this.fruitForm.fruitQuality);//商品信息-保鲜期
            formData.append("fruitStorageMode", this.fruitForm.fruitStorageMode);//商品信息-储存方式
            formData.append("fruitPicture",this.fruitPictureUrl[0] ? this.fruitPictureUrl[0].raw : '');
            for(let i = 0; i < this.fruitDetailCarousel.length; i++){
              formData.append('fruitDetailCarousels', this.fruitDetailCarousel[i] ? this.fruitDetailCarousel[i].raw : '');
            }
            for(let i = 0; i < this.fruitDetail.length; i++){
              formData.append('fruitDetails', this.fruitDetail[i] ? this.fruitDetail[i].raw : '');
            }
            var url = "/fruit/updateFruit";
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            if (store.getters.token) {
              config.headers["authorization"] = getToken(); // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            }
            axios.defaults.withCredentials = true;
            axios.post(process.env.BASE_API + url, formData, config, {
                withCredentials: true
              }).then(res => {
                console.log(res.data);
                if (res.data.code == 1000) {
                  this.$message.success("信息修改成功");
                  this.colseForm();
                } else {
                  this.$message.error("信息修改失败");
                }
              });
          }
        });
      },
      colseForm() {
        this.$store.dispatch("delVisitedViews", this.$route);
        this.$router.go(-1);
      },
      returnPage(){
        this.$store.dispatch("delVisitedViews", this.$route);
        this.$router.go(-1);
      },
      // 转码
      escapeStringHTML(str) {
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
        return str;
      }
    }
  };
</script>
<style scoped>
  .member {
    margin-bottom: 10px;
  }
  .width100 {
    width: 100px;
  }
  .width110 {
    width: 110px;
  }
  .width250,.el-select {
    width: 250px;
  }
  p.text{
    width: 110px;
    color: #606266;
    text-align: center;
  }
  .bread{
    position: relative;
    width: 300px;
  }
  span{
    display: inline-block;
  }
  .btn{
    cursor: pointer;
  }
  .btn,.btn1{
    width: 100px;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 26px;
    text-align: center;
    margin-bottom: 35px;
    border: 1px solid #ccc;
    background-color: #304156;
    transition:all .5s;
  }
  .btn:hover,.btn1:hover{
    background-color: #409EFF;
  }
  .line{
    font-weight: 550;
  }
</style>
