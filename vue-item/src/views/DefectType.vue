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
                    <el-option label="启动" value="启动"></el-option>
                    <el-option label="未启动" value="未启动"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible = false,addType()"
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
        <el-form-item label="缺陷类型名称" :label-width="dialogVisibleWidth">
          <el-input v-model="revaTable.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启动状态" :label-width="dialogVisibleWidth">
          <el-select v-model="revaTable.state" placeholder="请选启动状态">
            <el-option label="启动" value="启动"></el-option>
            <el-option label="未启动" value="未启动"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除模态框 -->
    <!-- <el-dialog title="提示" :visible.sync="delVisible" width="40%">
      <span>确定要删除嘛?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="delVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 缺陷类型表单 -->
    <el-table stripe style="width: 100%" align="center" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" >
      <el-table-column prop="type" label="缺陷类型名称" width="300" align="center"></el-table-column>
      <el-table-column prop="state" label="状态(启动/未启动)" width="300" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Edit(scope.$index, scope.row ,dialogVisible = true)"> 修改 </el-button>|
          <el-button type="text" size="small" @click="Delete(scope.$index, scope.row,del())">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.length"
        @size-change="handleSizeChange"
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
      tableData: [
        { type: "叉粱断裂", state: "启用" },
        { type: "叉粱断裂", state: "不启用" },
        { type: "断裂", state: "启用" },
        { type: "叉粱断裂", state: "不启用" },
        { type: "叉粱断裂", state: "不启用" },
        { type: "叉粱断裂", state: "不启用" },
        { type: "叉粱断裂", state: "不启用" }
      ],
      dialogFormVisible: false,
      dialogVisible: false,
      addTable: { name: "", region: "" },
      revaTable: { type: "", state: "" },
      formLabelWidth: "120px",
      dialogVisibleWidth: "120px",
      a: 0,
      // 分页数据 一页显示最大数，当前页数
      pagesize: 5,
      currpage: 1
    };
  },
  methods: {
    // index 编号传入 scope.$index
    // rows 需要修改的数组
    Edit(index, row) {
      window.console.log(index, row);
      this.revaTable.state = this.tableData[index].state;
      this.revaTable.type = this.tableData[index].type;
    },
    Delete(index, row) {
      window.console.log(index, row);
    },
    addType() {
      window.console.log(this.addTable);
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
    },
    //删除功能模态框
    del(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  }
};
</script>

<style lang="less" scoped>
.type {
  width: 1000px;
  float: left;
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