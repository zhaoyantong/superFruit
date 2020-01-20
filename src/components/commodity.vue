<template>
  <div class="commodity">
    <!--搜索查询---begin-->
    <el-row class="inquire">
      <el-input style="width:200px;" v-model="tableQuery.fruitName" placeholder="商品名称"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-select style="width:200px;" v-model="tableQuery.statusValue" placeholder="请选择">
        <el-option v-for="item in updateCommodity" :key="item.value" :lable="item.value" :value="item.lable"></el-option>
      </el-select>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
      </el-tooltip>
    </el-row>
    <!--搜索查询---end-->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 普通商品信息---begin -->
      <el-tab-pane label="普通商品" name="first" v-loading.body="tableLoading" element-loading-text="Loading">
        <!-- 商品上传---begin -->
        <el-button class="uploadingBtn" @click="uploadingBtn">普通商品上传</el-button>
        <!-- 商品上传---end -->
        <el-table :data="tableData" border>
          <el-table-column prop="fruitType" :formatter="formatterFruitType" label="商品种类"></el-table-column>
          <el-table-column prop="fruitName" label="商品名称"></el-table-column>
          <el-table-column label="商品价格">
            <template slot-scope="scope">
              <p>会员：￥{{scope.row.fruitPrice}}</p>
              <p>非会员：￥{{scope.row.fruitVipPrice}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="fruitNum" label="商品重量"></el-table-column>
          <el-table-column prop="fruitOriginPlace" label="商品信息">
            <template slot-scope="scope">
              <p>产地：{{scope.row.fruitOriginPlace}}</p>
              <p>规格：{{scope.row.fruitSpecifications}}</p>
              <p>包装：{{scope.row.fruitPacking}}</p>
              <p>保鲜期：{{scope.row.fruitQuality}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="fruitPictureUrl" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.fruitPictureUrl" width="90%" height="80" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="商品状态">
            <template  slot-scope="scope" >
                <el-tag :type="scope.row.status=='1' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.status=='1' ? '已上架' : '已下架'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="185">
            <template slot-scope="scope">
              <el-tooltip content="修改" placement="top">
                <img src="../img/compile.png" @click="handleUpdate(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="查看" placement="top" v-if="!hasRole(scope.row)">
                <img src="../img/see.png" @click="handleView(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="上架/下架" placement="top" v-if="!hasRole(scope.row)">
                <img src="../img/delete.png" @click="handleDelete(scope.$index,scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 普通商品信息---end -->

      <!-- 会员商品信息---begin -->
      <el-tab-pane label="会员福利" name="second" v-loading.body="tableLoading" element-loading-text="Loading">
        <!-- 会员福利商品上传---begin -->
        <el-button class="uploadingBtn" @click="memberAdd">会员福利添加</el-button>
        <!-- 会员福利商品上传---end -->
        <el-table :data="tableData" border>
          <el-table-column prop="fruitType" :formatter="formatterFruitType" label="商品种类"></el-table-column>
          <el-table-column prop="fruitName" label="商品名称"></el-table-column>
          <el-table-column prop="fruitPrice" label="商品价格">
            <template slot-scope="scope">
              <p>￥{{scope.row.fruitPrice}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="fruitNum" label="商品重量"></el-table-column>
          <el-table-column label="商品信息">
            <template slot-scope="scope">
              <p>产地：{{scope.row.fruitOriginPlace}}</p>
              <p>规格：{{scope.row.fruitSpecifications}}</p>
              <p>包装：{{scope.row.fruitPacking}}</p>
              <p>保鲜期：{{scope.row.fruitQuality}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="fruitPictureUrl" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.fruitPictureUrl" width="90%" height="80" />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="商品状态">
            <template  slot-scope="scope" >
              <el-tag :type="scope.row.status=='1' ? 'success' : 'danger'"
              disable-transitions>{{scope.row.status=='1' ? '已上架' : '已下架'}}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip content="修改" placement="top">
                <img src="../img/compile.png" @click="handleMemberUpdate(scope.$index,scope.row)" />
              </el-tooltip>
              <!-- <el-tooltip content="上架/下架" placement="top" v-if="!hasRole(scope.row)">
                <img src="../img/delete.png" @click="handleDelete(scope.$index,scope.row)" />
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 会员商品信息---end -->
      <!-- 分页---begin -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePage.current"
        :page-sizes="[10, 20, 30, 40, 50]" :page-size="tablePage.size" layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
      <!-- 分页---end -->
      <!--弹出窗口：会员福利添加-->
      <el-dialog title="会员福利添加" :visible.sync="dialogFormAdd" width="40%" v-dialogDrag center>
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px">
          <el-form-item label="水果ID" prop="fruitId">
            <el-select style="width:200px;" v-model="temp.fruitId" placeholder="请选择">
              <el-option v-for="item in fruitId" :key="item" :lable="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员商品剩余数量" prop="surplusNum">
            <el-input v-model="temp.surplusNum"></el-input>
          </el-form-item>
          <el-form-item label="今日剩余数量" prop="todaySurplusNum">
            <el-input v-model="temp.todaySurplusNum" disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取消</el-button>
          <el-button type="primary" @click="affirmAdd()">确定</el-button>
        </div>
      </el-dialog>
      <!--弹出窗口：会员福利修改-->
      <el-dialog title="会员福利修改" :visible.sync="dialogFormUpdate" width="40%" v-dialogDrag center>
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px">
          <el-form-item label="水果ID" prop="fruitId">
            <el-select style="width:200px;" v-model="temp.fruitId" placeholder="请选择" disabled="disabled">
              <el-option v-for="item in fruitId" :key="item" :lable="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员商品剩余数量" prop="surplusNum">
            <el-input v-model="temp.surplusNum"></el-input>
          </el-form-item>
          <el-form-item label="今日剩余数量" prop="todaySurplusNum">
            <el-input v-model="temp.todaySurplusNum" disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUpdate = false">取消</el-button>
          <el-button type="primary" @click="affirmUpdateAdd()">确定</el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
  import fruitApi from '@/api/fruit'
  import {pageParamNames,confirm,root} from '@/utils/constants'
  import {updateCommodity} from "@/utils/commodity"
  import debounce from 'lodash/debounce'
  import {parseTime,resetTemp} from '@/utils'
  import {getToken} from '@/utils/auth'
  import axios from 'axios'
  import store from '@/store'
  export default {
    name: 'commodity',
    data() {
      return {
        updateCommodity: updateCommodity,
        activeName: 'first',
        tableLoading: false,
        query: '',
        pagenum: 1,
        pagesize: 20,
        value: true,
        tableData: [],
        tableQuery: {
          fruitName: null,
          statusValue: null,
          fruitType: null,
        },
        tablePage: {
          current: null,
          pages: null,
          size: null,
          total: null
        },
        idx: null, //表格的下标
        fruitType: null, //商品种类
        fruitName: null, //商品名称
        fruitPrice: null, //商品价格
        fruitPacking: null, //商品包装
        fruitNum: null, //商品重量
        fruitOriginPlace: null, //商品信息
        fruitPictureUrl: null, //商品图片
        status:null,//商品状态
        dialogFormAdd: false, //取消（普通商品）
        dialogFormUpdate: false, //取消（会员福利）

        rules: {
          fruitName: [{
            validator: validateContent,
            trigger: 'blur'
          }]
        },
        temp: {
          idx: null, //tableData中的下标
          id: null,
          fruitId: null, //水果ID
          surplusNum: null, //会员剩余数量
          todaySurplusNum: 10, //今日剩余数量
        },
        fruitId: [],
      }
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
      this.initData()
    },
    watch: {
      //延时查询
      'tableQuery.fruitName': debounce(function() {
        this.fetchData()
      }, 500),
      'tableQuery.statusValue': debounce(function() {
        this.fetchData()
      }, 500),
    }, //watch
    methods: {
      initData() {
        fruitApi.queryIds().then(res => {
          this.fruitId = res.data.data
        })
      },
      hasRole(row) {
        return row && row.rval == root.rval
      },
      // 上传商品
      uploadingBtn() {
        this.$router.push({
          path: 'addFruit'
        });
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
      fetchData() {
        this.tableLoading = true
        if (this.tableQuery.statusValue != null) {
          let status = this.tableQuery.statusValue;
          this.tableQuery.fruitType = this.getCommodityStatus(status);
        }
        if (this.activeName == 'first') {
          fruitApi.queryFruit(this.tableQuery, this.tablePage).then(res => {
            console.log(res.data)
            this.tableData = res.data.data.data
            this.tableLoading = false
            //设置后台返回的分页参数
            pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
          })
        }else if (this.activeName == 'second') {
          fruitApi.queryMembershipBenefits(this.tableQuery, this.tablePage).then(res => {
            console.log(res.data)
            this.tableData = res.data.data.data
            this.tableLoading = false
            //设置后台返回的分页参数
            pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.data[name]))
          })
        }
      },
      formatterFruitType: function(row, column, value) {
        for (let i = 0; i < updateCommodity.length; i++) {
          if (value == updateCommodity[i].value) {
            return updateCommodity[i].lable;
          }
        }
      },
      // 商品种类
      getCommodityStatus: function(value) {
        for (let i = 0; i < updateCommodity.length; i++) {
          if (value == updateCommodity[i].lable) {
            return updateCommodity[i].value;
          }
        }
      },
      //修改
      handleUpdate(idx, row) {
        this.$router.push({
          name: 'updateFruit',
          params: {
            id: row.id
          }
        });
      },
      //查看
      handleView(idx, row) {
        this.$router.push({
          name: 'selectFruit',
          params: {
            id: row.id
          }
        });
      },
      //删除
      handleDelete(idx, row) {
        let massge="";
        let status;
        if(row.status=='-1'){
          massge="您确定要上架该商品？";
          status=1;
        }else{
          massge= "您确定要下架该商品？";
          status=-1;
        }
        this.$confirm(massge, '提示', confirm).then(() => {
          fruitApi.deleteFruit({id: row.id}).then(res => {
            if (res.data.code == 1000 && row.status=='1') {
              this.$message.success('商品已上架成功');
            } else {
              this.$message.success('商品已下架成功');
            }
            window.location.reload();
          })
        }).catch(() => {
          this.$message.info('已取消上架/下架操作')
        })
      },
      // 会员商品添加
      memberAdd() {
        this.initData()
        this.dialogFormAdd = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // 确认会员商品添加
      affirmAdd() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return
          let formData = new FormData();
          //表单的数据
          formData.append('fruitId', this.temp.fruitId)
          formData.append('surplusNum', this.temp.surplusNum)
          var url = '/membershipBenefits/add';
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
            this.dialogFormAdd = false
            if (res.data.code == 1000) {
              this.$message.success("会员福利增加成功")
              window.location.reload();
            } else {
              this.$message.error("会员福利增加失败")
            }
          });
        })
      },
      // 会员福利修改
      handleMemberUpdate(idx, row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.idx = idx
        this.dialogFormUpdate = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      // 确认会员福利修改
      affirmUpdateAdd() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return
          let formData = new FormData();
          //表单的数据
          formData.append('id', this.temp.id)
          formData.append('surplusNum', this.temp.surplusNum)
          var url = '/membershipBenefits/update';
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
            this.dialogFormUpdate = false
            if (res.data.code == 1000) {
              this.$message.success("会员福利修改成功")
              window.location.reload();
            } else {
              this.$message.error("会员福利修改失败")
            }
          });
        })
      },
    },
  };
</script>
<style scoped>
  .commodity {
    position: relative;
  }

  .inquire {
    position: absolute;
    right: 0;
    top: -66px;
    margin-bottom: 20px;
  }

  .uploadingBtn {
    padding: 12px 15px;
    background-color: #D8D8D8;
    font-size: 14px;
    color: #000;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99
  }
</style>
