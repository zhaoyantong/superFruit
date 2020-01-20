<template>
  <div class="bill">
      <!--搜索查询---begin-->
      <el-row class="inquire">
        <el-input style="width:200px;" v-model="tableQuery.orderNo" placeholder="订单编号"></el-input>
        <span style="margin-right: 15px;"></span>
        <!-- <el-select style="width:200px;" v-model="tableQuery.fruitType" placeholder="商品种类" :on-change="getUpdateCommodity(tableQuery.fruitType)">
          <el-option v-for="item in updateCommodity" :key="item.value" :lable="item.value" :value="item.lable"></el-option>
        </el-select> -->
        <span style="margin-right: 15px;"></span>
        <el-tooltip class="item" content="搜索" placement="top">
          <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
        </el-tooltip>
      </el-row>
      <!--搜索查询---end-->
      <!-- 主体部分---begin -->
      <el-tabs>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="orderTime" label="销售时间" :formatter="formatterCreateTime"></el-table-column>
          <!-- <el-table-column prop="fruitType" :formatter="formatterFruitType" label="商品种类"></el-table-column> -->
          <el-table-column prop="fruitName" label="商品名称"></el-table-column>
          <el-table-column label="销售金额">
            <template slot-scope="scope">
              <p>￥{{scope.row.fruitAmountTotal}}</p>
            </template>
          </el-table-column>
          <el-table-column label="实际收入">
            <template slot-scope="scope">
              <p>￥{{scope.row.realIncome}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单结果"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
        </el-table>
      </el-tabs>
      <!-- 主体部分---end -->
      <!-- 分页---begin -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePage.current"
        :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
      <!-- 分页---end -->
  </div>
</template>
<script>
  import billApi from '@/api/bill'
  import {
    pageParamNames,
    confirm,
    root
  } from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import {
    updateCommodity
  } from "@/utils/commodity";
  import {
    billOrderStatus
  } from '@/utils/bill';
  export default {
    name: 'bill',
    data() {
      return {
        updateCommodity: updateCommodity,
        billOrderStatus: billOrderStatus,
        query: '',
        pagenum: 1,
        pagesize: 20,
        value: true,
        tableData: [],
        orderNo: null, // 订单编号
        orderTime : null, // 销售时间
        // fruitType: null, // 商品种类
        fruitName: null, // 商品名称
        fruitAmountTotal: null, // 销售金额
        realIncome: null, // 实际收入
        orderStatus: null, // 订单结果
        remarks: null, // 备注
        tableQuery: {
          orderNo: null,//订单编号
          fruitName: null//商品名称
        },
        tablePage: {
          current: null,
          pages: null,
          size: null,
          total: null,
        },
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
        billApi.queryBillList(this.tableQuery, this.tablePage).then(res => {
          console.log(res.data)
          this.tableData = res.data.data.data
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
        })
      },
      // 商品种类
      // getUpdateCommodity(value) {
      //   for (let i = 0; i < updateCommodity.length; i++) {
      //     if (value == updateCommodity[i].lable) {
      //       console.log(updateCommodity[i].value)
      //       return updateCommodity[i].value;
      //     }
      //   }
      // },
      // formatterFruitType: function(row, column, value) {
      //   for (let i = 0; i < updateCommodity.length; i++) {
      //     if (value == updateCommodity[i].value) {
      //       console.log(updateCommodity[i].value)
      //       return updateCommodity[i].lable;
      //     }
      //   }
      // },
      //订单结果
      formatterOrderStatus: function(row, column, value) {
        for (let i = 0; i < billOrderStatus.length; i++) {
          if (value == billOrderStatus[i].value) {
            return billOrderStatus[i].lable;
          }
        }
      },
      // 时间
      formatterCreateTime: function(row, column, value){
        return value.substring(0,4)+"-"+ value.substring(4,6)+"-"+ value.substring(6,8)+" "+value.substring(8,10)+":"+value.substring(10,12)+":"+value.substring(12);
      },
    }
  };
</script>
<style scoped>
  .bill {
    position: relative;
  }
  .inquire {
    position: absolute;
    right: 0;
    top: -66px;
    margin-bottom: 20px;
  }
</style>
