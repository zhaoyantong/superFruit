<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in swiper" :key="item" ><img :src="item" alt=""></div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" style="top: 164px;"></div>
    <!-- 如果需要导航按钮 -->
	    <!-- <div class="swiper-button-prev"></div>
	    <div class="swiper-button-next"></div> -->
  </div>
</template>
<script>
  // npm install swiper --save
  import Swiper from 'swiper'
  import "swiper/css/swiper.css"

  export default {
    name: 'swiper',
    data() {
      return {
        mySwiper: null
      }
    },
    props: ['swiper'], //swiper的就是test这个数据传递来的
    methods: {
      _initSwiper() {
        if (this.mySwiper != null) return;
        this.mySwiper = new Swiper('.swiper-container', {
         loopAdditionalSlides: 3,
            loop: true,
            speed: 2000,
            autoplay: {// 自动滑动
              delay: 1000, //1秒切换一次
              // disableOnInteraction: false
            },
            pagination: {// 如果需要分页器
              el: '.swiper-pagination',
              // clickable: true,
            },

        autoplayDisableOnInteraction: false,
        observer: true, // 启动动态检查器(OB/观众/观看者)
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
        })
      },
      _updateSwiper() {
        this.$nextTick(() => {
          // this.mySwiper.update(true); //swiper update的方法
         this._initSwiper(); //创建
        })
      },
      swiperUpdate() {
        if (this.mySwiper) { //节点存在
          this._updateSwiper(); //更新
        } else {
          this._initSwiper(); //创建
        }
      }
    },
    watch: {
      //通过props传来的数据 和 组件一加载节点就创建成功 二者不是同步，实时监听的swiper(传递的值)的变化
      swiper() {
        this.swiperUpdate();
      }
    },
    mounted() {
      this.swiperUpdate(); //页面一加载拉去数据创建节点
    },

  }
</script>

<style lang="less" scoped>
  .swiper-container {
    width: 60%;
    height: 200px;
    margin-top: 10px;
    float: left;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      .swiper-slide {
        background-size: cover;
        width: 100%;
        height: 200px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
