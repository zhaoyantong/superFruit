<template>
  <div class="app-container">
    <el-form class="detail-form" autocomplete="on" :model="fruitForm" ref="fruitForm" label-position="left" label-width="100px">
      <div class="bread">
        <span class="btn" @click="returnPage">商品管理</span>
        <span class="line"> >> </span>
        <span class="btn1">商品查看</span>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="fruitName" label="商品名称：">{{fruitForm.fruitName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fruitType" :formatter="formatterFruitType" label="商品种类：">{{fruitForm.fruitType}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="fruitNum" label="商品重量：">{{fruitForm.fruitNum}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="fruitPacking" label="商品包装：">{{fruitForm.fruitPacking}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品价格">
            <el-form-item prop="fruitVipPrice" label="会员：" label-width="75px" class="member">{{fruitForm.fruitVipPrice}}</el-form-item>
            <el-form-item prop="fruitPrice" label="非会员：" label-width="75px">{{fruitForm.fruitPrice}}</el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="message">
        <el-col :span="24">
          <el-form-item label="商品信息">
            <el-row>
              <el-col :span="3">
                <el-form-item prop="fruitOriginPlace" label="产地：" label-width="60px">{{fruitForm.fruitOriginPlace}}</el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitSpecifications" label="规格：" label-width="60px">{{fruitForm.fruitSpecifications}}</el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitPacking" label="包装：" label-width="60px">{{fruitForm.fruitPacking}}</el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="fruitQuality" label="保鲜期：" label-width="70px">{{fruitForm.fruitQuality}}</el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="fruitStorageMode" label="储存方式：" label-width="100px">{{fruitForm.fruitStorageMode}}</el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="fruitPictureUrl" label="列表图片">
            <img :src="fruitForm.fruitPictureUrl" style="width: 200px; height: 200px;">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="fruitDetailCarousel" label="轮播图">
            <swiper :swiper="slideShow" v-if="slideShow.length"></swiper>
            <!-- {{fruitForm.fruitDetailCarousel}} -->
          </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="fruitDetail" label="详情页">
            <swiper :swiper="detailPage" v-if="detailPage.length"></swiper>
            <!-- {{fruitForm.fruitDetail}} -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import fruitApi from "@/api/fruit"
  import store from "@/store"
  import { getToken } from '@/utils/auth'
  import {updateCommodity} from "@/utils/commodity"
  import Swiper from '../components/Swiper/Swiper'
  export default {
    name: "selectFruit",
    components: {
      Swiper
    },
    data() {
      return {
        fruitForm: {
          id: null,
          fruitName: null, //商品名称
          // updateCommodity: null, //商品种类
          fruitNum: null, //商品重量
          fruitWeight: null, //商品标签
          fruitVipPrice: null, //商品价格（会员）
          fruitPrice: null, //商品价格（非会员）
          fruitOriginPlace: null, //商品信息-产地
          fruitSpecifications: null, //商品信息-规格
          fruitPacking: null, //商品信息-包装
          fruitQuality: null, //商品信息-保鲜期
          fruitStorageMode: null, //商品信息-存储方式
          fruitType: null,
          fruitPictureUrl: null, //列表图片
          fruitDetailCarousel: null, //轮播图
          fruitDetail: null, //详情页
        },
        slideShow:[],
        detailPage:[],
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        //格式化活动表单
        let id = this.$route.params.id;
        if (!id) id = 1;
        fruitApi.selectFruit(id).then(res => {
          if (res.data.code == 1000) {
            this.fruitForm = res.data.data;
            this.fruitForm.fruitType = this.getUpdateCommodityLable(this.fruitForm.fruitType);
            this.slideShow=this.fruitForm.fruitDetailCarousel.split(';');
            this.detailPage=this.fruitForm.fruitDetail.split(';');
          }
        });
      },
      colseForm() {
        this.$store.dispatch("delVisitedViews", this.$route);
        this.$router.go(-1);
      },
      // 转码
      escapeStringHTML(str) {
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
        return str;
      },
      // 商品种类
      getUpdateCommodity(value) {
        for (let i = 0; i < updateCommodity.length; i++) {
          if (value == updateCommodity[i].lable) {
            return updateCommodity[i].value;
          }
        }
      },
      getUpdateCommodityLable(value) {
        for (let i = 0; i < updateCommodity.length; i++) {
          if (value == updateCommodity[i].value) {
            return updateCommodity[i].lable;
          }
        }
      },
      formatterFruitType: function(row, column, value) {
        for (let i = 0; i < updateCommodity.length; i++) {
          if (value == updateCommodity[i].value) {
            return updateCommodity[i].lable;
          }
        }
      },
      returnPage() {
        this.$store.dispatch("delVisitedViews", this.$route);
        this.$router.go(-1);
      },
    }
  };
</script>
<style scoped>
  .member {
    margin-bottom: 10px;
  }

  .el-select,
  .width170 {
    width: 170px;
  }

  .width100 {
    width: 100px;
  }

  .width110 {
    width: 110px;
  }

  .width250 {
    width: 250px;
  }

  .message {
    margin-bottom: 20px;
  }

  span {
    display: inline-block;
  }

  .btn {
    cursor: pointer;
  }

  .btn,
  .btn1 {
    width: 100px;
    font-size: 14px;
    color: #ffffff;
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
  .line {
    font-weight: 550;
  }
</style>
