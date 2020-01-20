<template>
  <div class="afterSale">
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
      <el-tab-pane label="全部" name="first" v-loading.body="tableLoading" element-loading-text="加载中" fit highlight-current-row>
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="申请退款时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <!-- <el-table-column prop="fruitStatus" label="货物状态"></el-table-column> -->
          <el-table-column prop="refundReason" label="退款原因"></el-table-column>
          <el-table-column label="退款金额">
            <template slot-scope="scope">
              <p>￥{{scope.row.refundFee}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="refundUrl" label="凭证">
            <template slot-scope="scope">
              <img v-for="item in scope.row.refundUrl" :src="item" class="refundUrlImg" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-tooltip content="修改退款金额" placement="top" v-show="scope.row.orderStatus==6">
                <img src="../img/compile.png" alt="修改退款金额" @click="handleAmend(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="接受申请" placement="top" v-show="scope.row.orderStatus==6 || scope.row.orderStatus==5">
                <img src="../img/correct.png" alt="接受申请" @click="handleAccept(scope.$index,scope.row,1)" />
              </el-tooltip>
              <el-tooltip content="拒绝申请" placement="top" v-if="!hasRole(scope.row)" v-show="scope.row.orderStatus==6">
                <img src="../img/srror.png" alt="拒绝申请" @click="handleSrror(scope.$index,scope.row,0)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second" v-loading.body="tableLoading" element-loading-text="加载中" fit highlight-current-row>
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="申请退款时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <!-- <el-table-column prop="fruitStatus" label="货物状态"></el-table-column> -->
          <el-table-column prop="refundReason" label="退款原因"></el-table-column>
          <el-table-column label="退款金额">
            <template slot-scope="scope">
              <p>￥{{scope.row.refundFee}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="refundUrl" label="凭证">
            <template slot-scope="scope">
              <img v-for="item in scope.row.refundUrl" :src="item" width="90%" height="80" class="refundUrlImg" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未处理" name="third" v-loading.body="tableLoading" element-loading-text="加载中" fit highlight-current-row>
        <el-table :data="tableData" border>
          <el-table-column prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column prop="fruitName" label="订单名称"></el-table-column>
          <el-table-column prop="orderStatus" :formatter="formatterOrderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="createTime" label="申请退款时间" :formatter="formatterCreateTime"></el-table-column>
          <el-table-column prop="phone" label="买家电话"></el-table-column>
          <!-- <el-table-column prop="fruitStatus" label="货物状态"></el-table-column> -->
          <el-table-column prop="refundReason" label="退款原因"></el-table-column>
          <el-table-column label="退款金额">
            <template slot-scope="scope">
              <p>￥{{scope.row.refundFee}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="refundUrl" label="凭证" class="refundUrl">
           <template slot-scope="scope">
             <img v-for="item in scope.row.refundUrl" :src="item" width="90%" height="80" class="refundUrlImg" />
           </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-tooltip content="修改退款金额" placement="top" v-show="scope.row.orderStatus==6">
                <img src="../img/compile.png" alt="修改退款金额" @click="handleAmend(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="接受申请" placement="top">
                <img src="../img/correct.png" alt="接受申请" @click="handleAccept(scope.$index,scope.row,1)" />
              </el-tooltip>
              <el-tooltip content="拒绝申请" placement="top" v-if="!hasRole(scope.row)" v-show="scope.row.orderStatus==6">
                <img src="../img/srror.png" alt="拒绝申请" @click="handleSrror(scope.$index,scope.row,0)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页---begin -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePage.current"
      :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.total">
    </el-pagination>
    <!-- 分页---end -->
    <!-- 弹框（修改退款金额） -->
    <el-dialog title="修改退款金额" :visible.sync="handleCancel" width="30%" v-dialogDrag center>
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px">
        <el-form-item label="修改退款金额" prop="refundFee">
          <el-input v-model="temp.refundFee"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel = false">取消</el-button>
        <el-button type="primary" @click="handleAffirm()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import afterSaleApi from '@/api/afterSale'
  import {parseTime,resetTemp} from '@/utils'
  import {pageParamNames,confirm,root} from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import {billOrderStatus} from '@/utils/bill'
  import store from "@/store"
  import {getToken} from "@/utils/auth"
  import axios from "axios"
  export default {
    name: 'afterSale',
    data() {
      return {
        billOrderStatus: billOrderStatus,
        activeName: 'first',
        query: '',
        pagenum: 1,
        pagesize: 20,
        value: true,
        tableData: [],
        img: '',
        tableQuery: {
          orderNo: null,
          fruitName: null,
          isHandle: null,
        },
        tablePage: {
          current: null,
          pages: null,
          size: null,
          total: null,
        },
        orderNo: null, //订单编号
        fruitName: null, //订单名称
        orderStatus: null, //订单状态
        createTime:null,//申请时间
        phone: null, //买家电话
        fruitStatus: null, //货物状态
        refundReason: null, //退款原因
        refundFee: null, //退款金额
        refundUrl: null, //凭证
        handleCancel: false, //取消
        temp: {
          idx: null, //tableData中的下标
          id: null,
          isAgree:null,
          orderNo: null, //订单编号
          fruitName: null, //订单名称
          orderStatus: null, //订单状态
          phone: null, //买家电话
          fruitStatus: null, //货物状态
          refundReason: null, //退款原因
          refundFee: null, //退款金额
          refundUrl:null,
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
        if(this.activeName == 'first'){
          this.tableQuery.isHandle=null
        }else if (this.activeName == 'second') {
          this.tableQuery.isHandle=1
        } else if (this.activeName == 'third') {
          this.tableQuery.isHandle=0
        }
        afterSaleApi.queryAfterSaleList(this.tableQuery, this.tablePage,).then(res => {
          console.log(res.data)
          this.tableData = res.data.data.data
          this.tableLoading = false;
          var len = this.tableData.length;
          for(var i = 0; i < len; i ++){
            if(this.tableData[i].refundUrl){
              this.tableData[i].refundUrl =  this.tableData[i].refundUrl.split(';');
            }else{
              this.tableData[i].refundUrl = [];
            }
          }
          //设置后台返回的分页参数
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
        })
      },
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
      // 凭证
      formatterRefundUrl: function(row, column, value) {
        return value.split(';');
      },
      // 修改退款金额
      handleAmend(idx, row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.idx = idx;
        this.handleCancel = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      // 确认修改退款金额
      handleAffirm() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return
          let formData = new FormData();
          //表单的数据
          formData.append('id', this.temp.id);
          formData.append('refundFee', this.temp.refundFee);
          var url = '/orderRefund/update';
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          if (store.getters.token) {
            config.headers['authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          }
          axios.defaults.withCredentials = true
          axios.post(process.env.BASE_API + url, formData, config, {
            withCredentials: true
          }).then(res => {
            console.log(res.data)
            this.handleCancel = false
            if (res.data.code == 1000) {
              this.$message.success("退款金额修改成功")
              window.location.reload();
            } else {
              this.$message.error("退款金额修改失败")
            }
          });
        })
      },
      //是否同意退款
      //接受退款申请
      handleAccept(idx, row, value) {
        let massge = "您确定要接受退款申请？";
        this.$confirm(massge, '提示', confirm).then(() => {
          afterSaleApi.isAgree({
            id: row.id,
            isAgree: value
          }).then(res => {
            if (res.data.code == 1000 && value=='1') {
              this.$message.success('接受退款申请成功');
            } else {
              this.$message.error('接受退款申请失败');
            }
            window.location.reload();
          })
        }).catch(() => {
          this.$message.info('已取消接受退款申请操作')
        })
      },
      //拒绝退款申请
      handleSrror(idx, row, value) {
        let massge = "您确定要拒绝退款申请？";
        this.$confirm(massge, '提示', confirm).then(() => {
          afterSaleApi.isAgree({
            id: row.id,
            isAgree: value
          }).then(res => {
            if (res.data.code == 1000 && value=='0') {
              this.$message.success('拒绝退款申请成功');
            } else {
              this.$message.error('拒绝退款申请失败');
            }
            window.location.reload();
          })
        }).catch(() => {
          this.$message.info('已取消拒绝退款申请操作')
        })
      },
    }
  };
</script>
<style scoped>
  .afterSale {
    position: relative;
  }
  .inquire {
    position: absolute;
    right: 0;
    top: -66px;
    margin-bottom: 20px;
  }
  .refundUrlImg{
    display: block;
    width: 90%;
    height: 80px;
  }
  .refundUrlImg+.refundUrlImg{
    height: 0;
    transition: all .5s ease-in-out;
  }
  .el-table tr:hover .refundUrlImg+.refundUrlImg{
    height: 80px;
    margin-top: 10px;
  }
  /* .el-table__body td{
    position: relative;
  }
  .refundUrlImg:nth-of-type(2){
    position: absolute;
    left: -85%;
  } */
</style>
