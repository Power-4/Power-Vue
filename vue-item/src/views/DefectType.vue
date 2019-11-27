<template>
  <div class="type">
    <!-- 添加缺陷类型 -->
    <div class="add-btn">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="dialogFormVisible = true">
              <i class="el-icon-circle-plus-outline"></i>制定巡检任务
            </button>
            <el-dialog title="添加缺陷类型" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="缺陷类型名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="启动状态" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选启动状态">
                    <el-option label="启动" value="启动"></el-option>
                    <el-option label="未启动" value="未启动"></el-option>
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

    <!-- 缺陷类型表单 -->
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column prop="name" label="缺陷类型名称" width="300" align="center"></el-table-column>
      <el-table-column prop="state" label="状态(启动/未启动)" width="300" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <el-button type="text" size="small">修改</el-button>|
        <el-button type="text" size="small">取消</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "叉粱断裂",
          state: "启用"
        },{},{},{}
      ],
      dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    
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
  border:  rgb(94, 228, 228);
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
</style>