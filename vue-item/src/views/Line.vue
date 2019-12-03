<template>
  <div class="towar">
    <!-- 查询线路 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>电力巡检系统</el-breadcrumb-item>
      <el-breadcrumb-item>线路管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chaxun">
      <div class="bianhao">
        <span>所属线路:</span>
        <el-input v-model="submit.id" placeholder="请输入编号" class="in-bianhao"></el-input>
      </div>

      <div class="error">
        <span>是否启用:</span>
        <el-select
          v-model="submit.error"
          placeholder="请选择"
          class="in-error"
          :class="{inErrorMin:submit.error}"
        >
          <el-option label="启用" value="yes"></el-option>

          <el-option label="停用" value="no"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()">查询</el-button>
    </div>

    <!-- 添加线路类型 -->
    <div class="add-btn">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="dialogFormVisible = true">
              <i class="el-icon-circle-plus-outline"></i>添加线路
            </button>
            <el-dialog title="添加线路" :visible.sync="dialogFormVisible">
              <el-form :inline="true" :model="revaTable" class="demo-form-inline">
                <el-form-item label="线路编码" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.lineId" placeholder="请输入线路编码"></el-input>
                </el-form-item>
                <el-form-item label="线路名称" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.lineName" placeholder="请输入线路名称"></el-input>
                </el-form-item>
                <el-form-item label="线路长度" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.lineLength" placeholder="请输入线路长度"></el-input>
                </el-form-item>
                <el-form-item label="回路长度" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.loopLength" placeholder="请输入回路长度"></el-input>
                </el-form-item>
                <el-form-item label="搬运日期" :label-width="formLabelWidth">
                  <el-date-picker
                    style="width:202px"
                    v-model="revaTable.value"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="电压等级" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.voltage" placeholder="请输入电压等级"></el-input>
                </el-form-item>
                <el-form-item label="起始杆号" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.start" placeholder="请输入起始杆号"></el-input>
                </el-form-item>
                <el-form-item label="终止杆号" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.end" placeholder="请输入终止杆号"></el-input>
                </el-form-item>
                <el-form-item label="塔基数" :label-width="formLabelWidth">
                  <el-input v-model="revaTable.towerBase" placeholder="请输入塔基数"></el-input>
                </el-form-item>
                <el-form-item label="启动状态" :label-width="formLabelWidth">
                  <el-select v-model="revaTable.state" placeholder="请选启动状态" style="width:202px">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" class="ok-btn">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 修改线路模态框 -->
    <el-dialog title="修改线路" :visible.sync="dialogVisible" width="675px">
      <el-form :inline="true" :model="revaTable" class="demo-form-inline">
        <el-form-item label="线路编码" :label-width="formLabelWidth">
          <el-input v-model="revaTable.lineId" placeholder="请输入线路编码"></el-input>
        </el-form-item>
        <el-form-item label="线路名称" :label-width="formLabelWidth">
          <el-input v-model="revaTable.lineName" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="线路长度" :label-width="formLabelWidth">
          <el-input v-model="revaTable.lineLength" placeholder="请输入线路长度"></el-input>
        </el-form-item>
        <el-form-item label="回路长度" :label-width="formLabelWidth">
          <el-input v-model="revaTable.loopLength" placeholder="请输入回路长度"></el-input>
        </el-form-item>
        <el-form-item label="搬运日期" :label-width="formLabelWidth">
          <el-date-picker
            style="width:202px"
            v-model="revaTable.value"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="电压等级" :label-width="formLabelWidth">
          <el-input v-model="revaTable.voltage" placeholder="请输入电压等级"></el-input>
        </el-form-item>
        <el-form-item label="起始杆号" :label-width="formLabelWidth">
          <el-input v-model="revaTable.start" placeholder="请输入起始杆号"></el-input>
        </el-form-item>
        <el-form-item label="终止杆号" :label-width="formLabelWidth">
          <el-input v-model="revaTable.end" placeholder="请输入终止杆号"></el-input>
        </el-form-item>
        <el-form-item label="塔基数" :label-width="formLabelWidth">
          <el-input v-model="revaTable.towerBase" placeholder="请输入塔基数"></el-input>
        </el-form-item>
        <el-form-item label="启动状态" :label-width="formLabelWidth">
          <el-select v-model="revaTable.state" placeholder="请选启动状态" style="width:202px">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行状态" :label-width="formLabelWidth">
          <el-select v-model="revaTable.state" placeholder="请选运行状态" style="width:202px">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="检修中" value="检修中"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 线路表单 -->
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column prop="circuitryNo" label="线路编号" width="100" align="center"></el-table-column>
      <el-table-column prop="circuitryName" label="线路名称" width="100" align="center"></el-table-column>
      <el-table-column prop="startPole.poleNo" label="起始杆号" width="100" align="center"></el-table-column>
      <el-table-column prop="endPole.poleNo" label="终止杆号" width="100" align="center"></el-table-column>
      <el-table-column prop="poleNumber" label="塔基数" width="100" align="center"></el-table-column>
      <el-table-column prop="runningStatus" label="运行状态" width="100" align="center"></el-table-column>
      <el-table-column prop="systemPropertiesValue.sysProValueName" label="状态(启动/未启动)" width="200" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <el-button type="text" @click="block">停用</el-button>
        <el-button type="text" size="small" @click="Edit(dialogVisible = true)">修改</el-button>
        <el-button type="text" @click="del">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination 
        class="pages"
        layout="prev, pager, next" 
        :total="countPage" 
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "towar",
  data() {
    return {
      //查询
      title: "线路",
      name: "xun",
      submit: {
        id: "",
        error: "",
        currentPage: 1
        },
      countPage:5, //初始页
      pageSize: 5, //    每页的数据
      //模拟表格数据
      tableData: [
        
      ],
      //修改和添加
      dialogFormVisible: false,
      dialogVisible: false,
      revaTable: {
        lineId: "",
        lineName: "",
        lineLength: "",
        loopLength: "",
        value: "",
        voltage: "",
        start: "",
        end: "",
        towerBase: "",
        state: ""
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "100px",
      dialogVisibleWidth: "120px"
    };
  },
  components: {},
  methods: {
    //查询
    chaxun() {
      window.console.log(this.submit);
    },
    onSubmit() {
      window.console.log("submit!");
    },
    //分页
    handleCurrentChange: function(currentPage) {
      window.console.log(currentPage); //点击第几页
      this.submit.currentPage = currentPage;
      this.fenClick();
    },
    fenClick() {
      this.axios
        .post("http://192.168.6.184:8080/circuitryOrchid/getCirByPage", {
          currentPage:this.submit.currentPage,
          pageSize:this.pageSize
        })
        .then(res => {
          window.console.log(res.data);
          this.countPage = res.data.data.count;
          this.tableData = res.data.data.circuitries
          window.console.log(this.tableData);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
 
    //删除
    del() {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //停用
    block() {
      this.$confirm("是否停用/启用", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "停用/启用成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用/启用"
          });
        });
    },
  },
  created() {
    this.fenClick();   
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5ee4e4;
.towar {
  width: 998px;
  height: 500px;
  float: right;
  border: 1px solid rgb(218, 218, 218);
}
/* 导航栏 */
.nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #606266;
  span {
    float: right;
    margin-right: 30px;
    cursor: pointer;
  }
  span:nth-of-type(1) {
    margin-right: 50px;
  }
  span:hover {
    color: #000000;
  }
}
/* 选中状态 */
.select {
  font-weight: 700;
  color: black;
}

/* 路径提示  */
.lu {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(218, 218, 218);
  span:nth-of-type(1) {
    margin-left: 20px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}

/* 查询 */
.chaxun {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid rgb(218, 218, 218);
}
/* 查询中的Div */
.chaxun > div {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  span {
    width: 100px;
    float: left;
    color: #000000;
  }
}

/* 编号查询 */
.in-bianhao {
  width: 190px;
  float: left;
  font-size: 14px;
}

/* 是否为错误查询 */
.in-error {
  width: 90px;
  float: left;
}
/* 选择后 */
.inErrorMin {
  width: 100px;
  float: left;
}

/* 查询按钮 */
.chaxun-btn {
  border-color: @mainColor;
  background-color: @mainColor;
}

/*添加杆塔*/
.btn-query {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background: rgb(94, 228, 228);
  border: 0;
  border-radius: 5px;
  color: #fff;
  padding: 0 15px;
  outline: none;
  font-size: 18px;
}
.add-btn {
  float: right;
  margin-right: 20px;
  padding: 20px 0;
  font-size: 16px;
}
.long {
  width: 200px;
}
.pages {
  float: right;
}
</style>
