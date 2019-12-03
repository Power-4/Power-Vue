<template>
  <div class="type">
    <!-- 添加缺陷类型模态框 -->
    <div class="add-btn">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="dialogFormVisible = true">
              <i class="el-icon-circle-plus-outline"></i>添加缺陷类型
            </button>
            <el-dialog title="添加缺陷类型" :visible.sync="dialogFormVisible">
              <el-form :model="addTable">
                <el-form-item label="缺陷类型名称" :label-width="formLabelWidth">
                  <el-input v-model="addTable.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="启动状态" :label-width="formLabelWidth">
                  <el-select v-model="addTable.region" placeholder="请选启动状态">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button 
                @click="dialogFormVisible = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="addType(dialogFormVisible = false)"
                  class="ok-btn"
                >确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 修改缺陷类型模态框 -->
    <el-dialog title="修改缺陷类型" :visible.sync="dialogVisible" width="45%">
      <el-form :model="revaTable">
        <el-form-item label="缺陷类型名称" :label-width="dialogVisibleWidth" >
          <el-input v-model="revaTable.type" autocomplete="off" :disabled="true"></el-input>
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
        <el-button type="primary" @click="amend(dialogVisible = false)" >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 缺陷类型表单 -->
    <el-table stripe style="width: 100%" align="center" :data="tableData">
      <el-table-column prop="defectsName" label="缺陷类型名称" width="300" align="center"></el-table-column>
      <el-table-column
        prop="systemPropertiesValue.sysProValueName"
        label="状态(启用/停用)"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="Edit(scope.$index, scope.row ,dialogVisible = true)"
          >修改</el-button>|
          <el-button type="text" size="small" @click="Delete(scope.$index, scope.row,del())">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        class="pages"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefectType",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogVisible: false,
      addTable: { name: "", region: "" },
      revaTable: { type: "", state: "" },
      formLabelWidth: "120px",
      dialogVisibleWidth: "120px",
      a: 0,
      // 分页数据 一页显示最大数，当前页数
      pagesize: 5,
      currpage: 1,
      count: null,
    };
  },
  methods: {
    //初始化加载函数
    Init(){
      this.axios
      .post("http://192.168.6.184:8080/defectsOrchid/getDefectsByPage", {
        currentPage: this.currpage,
        pageSize: this.pagesize
      })
      .then(res => {
        window.console.log(res.data);
        this.tableData = res.data.data.defects;
        this.count = res.data.data.count;
      })
      .catch(err => {
        window.console.log(err);
      });
    },
    // index 编号传入 scope.$index
    // rows 需要修改的数组

    //修改按钮
    Edit(index, row) {
      window.console.log(index, row);
      this.defectsId = this.tableData[index].defectsId;
      this.revaTable.state = this.tableData[index].systemPropertiesValue.sysProValueName;
      this.revaTable.type = this.tableData[index].defectsName;
    },
    //修改模态框确定按钮
    amend() {
      window.console.log(this.revaTable.type, this.revaTable.state);
      window.console.log("当前所修改的id", this.defectsId);
        this.axios.get("http://192.168.6.184:8080/defectsOrchid/updateDefectsState", {
          params:{
            defectsState:this.revaTable.state,
            defectsId:this.defectsId,
            defectsName:this.revaTable.type
          }
          })
          .then(res => {
            window.console.log(res.data);
            this.Init(); //调用初始化函数
          })
          .catch(err => {
            window.console.log(err);
          });
    },
    //删除按钮
    Delete(index, row) {
      window.console.log(index, row);
      this.defectsId = this.tableData[index].defectsId;
    },
    //添加类型模态框确定按钮
    addType() {
      window.console.log(this.addTable.name, this.addTable.region);
      
      this.axios.get("http://192.168.6.184:8080/defectsOrchid/addDefects", {
        params:{
          defectsName:this.addTable.name,
          defectsState:this.addTable.region
        }
        })
        .then(res => {
          window.console.log(res.data);
          this.Init(); //调用初始化函数
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        })
        .catch(err => {
          window.console.log(err);
          this.$message({
            type: "info",
            message: "添加失败！"
          });
        });

        // this.addTable.name="",
        // this.addTable.region=""
    },
    // 分页函数
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
      window.console.log(`每页 ${val} 条`);
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;

      window.console.log(`当前页: ${val}`);
      //分页请求
      this.axios
        .post("http://192.168.6.184:8080/defectsOrchid/getDefectsByPage", {
          currentPage: val,
          pageSize: this.pagesize
        })
        .then(res => {
          window.console.log(res.data);
          this.tableData = res.data.data.defects;
          this.count = res.data.data.count;
        })
        .catch(err => {
          window.console.log(err);
        });

    },
    //删除功能模态框
    del() {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        window.console.log("当前所删除的id",this.defectsId);
        this.axios.get("http://192.168.6.184:8080/defectsOrchid/deleteDefectsById", {
          params:{
            defectsId:this.defectsId,
          }
          })
          .then(res => {
            window.console.log(res.data);
            this.Init(); //调用初始化函数
          })
          .catch(err => {
            window.console.log(err);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.axios
      .post("http://192.168.6.184:8080/defectsOrchid/getDefectsByPage", {
        currentPage: this.currpage,
        pageSize: this.pagesize
      })
      .then(res => {
        window.console.log(res.data);
        this.tableData = res.data.data.defects;
        this.count = res.data.data.count;
      })
      .catch(err => {
        window.console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.type {
  padding: 0 20px;
}

.ok-btn {
  background: rgb(94, 228, 228);
  border: rgb(94, 228, 228);
}

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

.btn-query:active {
  background: rgb(31, 184, 184);
}

.el-icon-circle-plus-outline {
  font-size: 21px;
  margin: 10px 10px 0 0;
}

.add-btn {
  float: right;
  margin-right: 20px;
  padding: 20px 0;
  font-size: 16px;
}

.el-button--small {
  margin-right: 10px;
}

.pages {
  float: right;
  margin-right: 5px;
}
</style>