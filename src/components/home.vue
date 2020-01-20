<template>
  <div class="home">
    <div class="sidebar">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div>
            <el-menu :default-active="sign?sign:'1'" class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
              <el-menu-item index="1" @click="cut">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="commodity" v-if="sign==1" />
                  <svg-icon icon-class="commodity2" v-else />
                </span>
                <span slot="title">商品管理</span>
              </el-menu-item>
              <el-menu-item index="2" @click="cut">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="orderFrom" v-if="sign==2" />
                  <svg-icon icon-class="orderFrom2" v-else />
                </span>
                <span slot="title">订单管理</span>
              </el-menu-item>
              <el-menu-item index="3" @click="cut">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="afterSale" v-if="sign==3" />
                  <svg-icon icon-class="afterSale2" v-else />
                </span>
                <span slot="title">退款/售后</span>
              </el-menu-item>
              <el-menu-item index="4" @click="cut">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="bill" v-if="sign==4" />
                  <svg-icon icon-class="bill2" v-else />
                </span>
                <span slot="title">账单</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="content_bg"></div>
      <div class="header">
        <span class="demonstration">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              admin
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <span class="headPortrait">
              <img src="../img/icon.png" alt="头像" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item><span>个人信息</span></el-dropdown-item> -->
              <el-dropdown-item>
                <span @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
      <div class="content_con">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <!-- <div>
              <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item v-for="item in breadcrumbItems">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>-->
            <div style="margin-top:40px">
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        sign: sessionStorage.getItem("sign"),
        num: 0,
        ys: false
      };
    },
    methods: {
      cut() {
        this.sign = sessionStorage.getItem("sign")
      },
      handleSelect(key) {
        switch (key) {
          case "1":
            this.$router.push("/commodity");
            sessionStorage.setItem("sign", 1);
            break;
          case "2":
            this.$router.push("/orderForm");
            sessionStorage.setItem("sign", 2);
            break;
          case "3":
            this.$router.push("/afterSale");
            sessionStorage.setItem("sign", 3);
            break;
          case "4":
            this.$router.push("/bill");
            sessionStorage.setItem("sign", 4);
            break;
        }
      },
      // 退出
      logout() {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
        });
      }
    },
    computed: {
      //通过computed监听这个值的变化  任何重新赋值  发生改变以后出发computed
      sign() {
        return this.sign
      }
    },
    //本来通过watch监听sign 在重新赋值一下让computed执行的。。但。。貌似没什么用
    //但是呢 这个可以用来做父组件向子组件动态传参
    // watch: {
    //     sign(newV,oldV){
    //       console.log("监听到的是"+newV)
    //     }
    //   }
  };
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .lan {
    background-color: red;
  }

  .clearfix:after {
    display: block;
    content: "";
    height: 0;
    line-height: 0;
    visibility: hidden;
    clear: both;
  }

  /* sidebar---css---begin */
  .sidebar {
    position: fixed;
    width: 180px;
  }

  .sidebar ul {
    height: 100vh;
    background-color: #304156 !important;
    padding-top: 50px;
    padding-left: 30px;
  }
  .el-menu-item {
    padding-left: 0px !important;
  }

  .sidebar ul li {
    text-align: left;
  }

  .sidebar ul li+li {
    border-top: 2px solid #6d7988;
  }

  .svg-container {
    margin-right: 15px;
  }

  .svg-icon {
    font-size: 20px !important;
  }
  .sidebar ul li span+span {
    color: #fff;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent !important;
  }
  .el-menu-item.is-active span:nth-of-type(2) {
    color: #409eff;
  }
  /* sidebar---css---end */
  /* header/content---css---begin */
  .home .content {
    margin-left: 180px;
  }
  .content_bg {
    position: fixed;
    width: 91%;
    height: 100vh;
    background-color: #f0f2f5;
  }
  .header {
    padding: 50px 50px 0 50px;
  }
  span.demonstration {
    display: inline-block;
    width: 50%;
    text-align: left;
  }
  .el-dropdown-menu__item {
    list-style: none;
    line-height: 30px;
    font-size: 14px;
  }
  .content_con {
    padding: 0 50px;
  }
  .headPortrait {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 15px;
    float: left;
  }
  .headPortrait img {
    display: block;
    width: 100%;
    border-radius: 50% !important;
  }
  .el-dropdown-link {
    display: inline-block;
    line-height: 48px;
    float: right;
  }
  /* header/content---css---end */
</style>
