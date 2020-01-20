<template>
  <div class="orderForm">
    <!--查询-->
    <el-row class="inquire">
      <el-input style="width:200px;" v-model="tableQuery.orderNo" placeholder="订单编号"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-input style="width:200px;" v-model="tableQuery.fruitName" placeholder="订单名称"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
      </el-tooltip>
    </el-row>
    <!-- 列表 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" v-loading.body="tableLoading" element-loading-text="加载中">
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="订单创建时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="fruitCount" label="订单数量"></el-table-column>

          <el-table-column prop="orderInfoType" :formatter="formatterOrderInfoType" label="订单类型"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <el-table-column prop="address" label="收货地址"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip content="接收订单" placement="top" v-show="scope.row.orderStatus==1">
                <img src="../img/correct.png" alt="接受订单" @click="handleOrderAccept(scope.$index,scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="second" v-loading.body="tableLoading" element-loading-text="加载中">
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="订单创建时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="fruitCount" label="订单数量"></el-table-column>
          <el-table-column prop="orderInfoType" :formatter="formatterOrderInfoType" label="订单类型"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <el-table-column prop="address" label="收货地址"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip content="接收订单" placement="top">
                <img src="../img/correct.png" alt="接受订单" @click="handleOrderAccept(scope.$index,scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已发货" name="third" v-loading.body="tableLoading" element-loading-text="加载中">
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="订单创建时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="fruitCount" label="订单数量"></el-table-column>
          <el-table-column prop="orderInfoType" :formatter="formatterOrderInfoType" label="订单类型"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <el-table-column prop="address" label="收货地址"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已签收" name="fourth" v-loading.body="tableLoading" element-loading-text="加载中">
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="订单创建时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="fruitCount" label="订单数量"></el-table-column>
          <el-table-column prop="orderInfoType" :formatter="formatterOrderInfoType" label="订单类型"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <el-table-column prop="address" label="收货地址"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页---begin -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePage.current"
      :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.total">
    </el-pagination>
    <!-- 分页---end -->
  </div>
</template>
<script>
  import orderFormApi from '@/api/orderForm'
  import {parseTime,resetTemp} from '@/utils'
  import {pageParamNames,confirm,root} from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import {billOrderStatus} from '@/utils/bill'
  import {orderType} from '@/utils/type'
  import store from "@/store"
  import {getToken} from "@/utils/auth"
  import axios from "axios"
  export default {
    name:'orderForm',
    data() {
      return {
        billOrderStatus:billOrderStatus,
        orderType:orderType,
        activeName: 'first',
        query: '',
        pagenum: 1,
        pagesize: 20,
        value: true,
        tableData: [],
        tableQuery: {
          orderNo: null,//订单编号
          fruitName: null,//订单名称
        },
        tablePage: {
          current: null,
          pages: null,
          size: null,
          total: null,
        },
        orderNo:null,//订单编号
        fruitName:null,//订单名称
        orderStatus:null,//订单状态
        createTime:null,//订单创建时间
        fruitCount:null,//订单数量
        orderInfoType:null,//订单类型
        phone:null,//买家电话
        address:null,//收货地址
        handleAmend: false, //取消
        temp: {
          idx: null, //tableData中的下标
          id: null,
          orderNo:null,//订单编号
          fruitName:null,//订单名称
          orderStatus:null,//订单状态
          createTime:null,//订单创建时间
          fruitCount:null,//订单数量
          orderInfoType:null,//订单类型
          phone:null,//买家电话
          address:null,//收货地址
        },
        rules: {
          content: [{
            validator: validateContent,
            trigger: 'blur'
          }],
        },
      };
      let validateContent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else {
          callback();
        }
      };
    },
    // 查询
    created() {
      this.fetchData()
    },
    watch: {
      //延时查询
      'tableQuery.orderNo': debounce(function() {
        this.fetchData()
      }, 500),
      'tableQuery.fruitName': debounce(function() {
        this.fetchData()
      }, 500),
    },
    methods: {
      hasRole(row) {
        return row && row.rval == root.rval
      },
      handleClick(tab, event) {
        this.fetchData()
      },
      // 分页
      handleSizeChange(val) {
        this.tablePage.size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.tablePage.current = val;
        this.fetchData();
      },
      // 数据接口
      fetchData() {
        this.tableLoading = true
        if (this.activeName == "first") {
          this.tableQuery.orderStatus = null
        }else if (this.activeName == "second") {
          this.tableQuery.orderStatus = 1
        } else if (this.activeName == "third") {
          this.tableQuery.orderStatus = 2
        } else if (this.activeName == "fourth") {
          orderFormApi.signedList(this.tableQuery, this.tablePage).then(res => {
            console.log(res.data)
            this.tableData = res.data.data.data
            this.tableLoading = false
            //设置后台返回的分页参数
            pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
          })
          return;
        }
        orderFormApi.queryOrderForm(this.tableQuery, this.tablePage).then(res => {
          console.log(res.data)
          this.tableData = res.data.data.data
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
        })

      },
      // 时间
      formatterCreateTime: function(row, column, value){
        return value.substring(0,4)+"-"+ value.substring(4,6)+"-"+ value.substring(6,8)+" "+value.substring(8,10)+":"+value.substring(10,12)+":"+value.substring(12);
      },
      // 订单状态
      formatterOrderStatus: function(row, column, value) {
        for (let i = 0; i < billOrderStatus.length; i++) {
          if (value == billOrderStatus[i].value) {
            return billOrderStatus[i].lable;
          }
        }
      },
      // 订单类型
      formatterOrderInfoType: function(row, column, value) {
        for (let i = 0; i < orderType.length; i++) {
          if (value == orderType[i].value) {
            return orderType[i].lable;
          }
        }
      },
      // 接受订单
      handleOrderAccept(idx,row){
        let massge = "您确定要接受该订单？";
        this.$confirm(massge, '提示', confirm).then(() => {
          orderFormApi.deliverGoods({orderNo :row.orderNo}).then(res => {
            console.log(res.data);
            if (res.data.code == 1000) {
              this.$message.success('接受订单成功');
            } else {
              this.$message.error('接受订单失败');
            }
            window.location.reload();
          })
        }).catch(() => {
          this.$message.info('已取消接受订单操作')
        })
      },
    }
  };
</script>
<style scoped>
  .orderForm {
    position: relative;
  }
  .inquire {
    position: absolute;
    right: 0;
    top: -66px;
    margin-bottom: 20px;
  }
</style>
