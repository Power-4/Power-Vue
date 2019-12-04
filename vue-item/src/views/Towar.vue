<template>
  <div class="towar">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>电力巡检系统</el-breadcrumb-item>
      <el-breadcrumb-item>杆塔管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询杆塔 -->
    <div class="chaxun">
      <div class="bianhao">
        <span>所属线路:</span>
        <el-input
          v-model="submit.circuitryName"
          placeholder="请输入线路"
          class="in-bianhao"
          @change="chaxun"
        ></el-input>
      </div>

      <div class="activate" @input="chaxun">
        <span>是否启用:</span>
        <el-select
          v-model="submit.activate"
          placeholder="请选择"
          class="in-error"
          :class="{inErrorMin:submit.activate}"
          @change="chaxun"
        >
          <el-option label="启用" value="启用"></el-option>

          <el-option label="停用" value="停用"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()">查询</el-button>
    </div>

    <!-- 添加杆塔 -->
    <div class="add-btn">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="dialogFormVisible = true">
              <i class="el-icon-circle-plus-outline"></i>添加杆塔
            </button>
            <el-dialog title="添加杆塔" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="杆塔编号" :label-width="formLabelWidth">
                  <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="线路名称" :label-width="formLabelWidth">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="启动状态" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选启动状态">
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

    <!-- 修改杆塔模态框 -->
    <el-dialog title="修改杆塔" :visible.sync="dialogVisible" width="45%">
      <el-form :model="revaTable">
        <el-form-item label="杆塔编号" :label-width="dialogVisibleWidth">
          <el-input v-model="revaTable.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启动状态" :label-width="dialogVisibleWidth">
          <el-select v-model="revaTable.state" placeholder="请选启动状态">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 杆塔表单 -->
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column prop="poleNo" label="杆塔编号" width="300" align="center"></el-table-column>
      <el-table-column prop="circuitry.circuitryName" label="所属路线" width="200" align="center"></el-table-column>
      <el-table-column
        prop="systemPropertiesValue.sysProValueName"
        label="状态(启动/未启动)"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
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
      title: "杆塔",
      name: "xun",
      submit: {
        id: "",
        error: "",
        currentPage: 1,
        circuitryName: "",
        activate: ""
      },
      countPage: null,
      pageSize: 5,

      //模拟表格数据

      tableData: [],
      options: [
        {
          value: "XW00001",
          label: "西渭线"
        },
        {
          value: "XW00002",
          label: "东渭线"
        }
      ],
      value: "",

     
      dialogFormVisible: false,
      dialogVisible: false,
      revaTable: { id: "", state: "" },
      form: {
        id: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      dialogVisibleWidth: "120px"
    };
  },
  components: {},
  methods: {
    //查询
    chaxun() {
      this.axios
        .get("http://192.168.6.184:8080/poleOrchid/getPolePageByCirIdAndActivate",{
          params: {
            currentPage: this.submit.currentPage,
            pageSize: this.pageSize,
            circuitryName: this.submit.circuitryName,
            activate: this.submit.activate
          }
        })
        .then(res => {
          window.console.log(this.submit.circuitryName);
          window.console.log(this.submit.activate);
          window.console.log(res.data);
          window.console.log(this.tableData);
          this.countPage = res.data.data.count;
          this.tableData = res.data.data.poles;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    //修改
    xiugai() {
      this.axios
        .get("http://192.168.6.184:8080/poleOrchid/updatePoleById",{
          params: {
            currentPage: this.submit.currentPage,
            pageSize: this.pageSize,
            circuitryName: this.submit.circuitryName,
            activate: this.submit.activate
          }
        })
        .then(res => {
          window.console.log(this.submit.circuitryName);
          window.console.log(this.submit.activate);
          window.console.log(res.data);
          window.console.log(this.tableData);
          this.countPage = res.data.data.count;
          this.tableData = res.data.data.poles;
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
    handleCurrentChange: function(currentPage) {
      window.console.log(currentPage); //点击第几页
      this.submit.currentPage = currentPage;
      this.fenClick();
    },
    //分页
    fenClick() {
      this.axios
        .post("http://192.168.6.184:8080/poleOrchid/getPoleByPage", {
          currentPage: this.submit.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          window.console.log(this.submit.currentPage);
          window.console.log(res.data);
          this.countPage = res.data.data.count;
          this.tableData = res.data.data.poles;
          window.console.log(this.tableData);
        })
        .catch(err => {
          window.console.log(err);
        });
    }
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
.pages {
  float: right;
}
</style>
