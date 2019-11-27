<template>
  <div class="level">
    <div class="action">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <input type="text" class="data"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
            <input type="text" class="data"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>塔杆编号：</label>
            <input type="text" class="data"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
            <label>发现人员：</label>
            <input type="text" class="data"/>
          </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷类型：</label>
            <select>
              <option value="--请选择--">--请选择--</option>
              <option value="叉梁断裂">叉梁断裂</option>
              <option value="拦河线断裂">拦河线断裂</option>
              <option value="绝缘子爆破">绝缘子爆破</option>
              <option value="塔杆倾斜">塔杆倾斜</option>
              <option value="吊杆变形">吊杆变形</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷级别：</label>
            <select>
              <option value="--请选择--">--请选择--</option>
              <option value="一般">一般</option>
              <option value="紧急">紧急</option>
              <option value="严重">严重</option>
            </select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>发现时间：</label>
            <input type="date"  class="data"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query">查 询</button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query">保 存</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form">
      <el-table :data="tableData" stripe style="width: 100%" align="center">
        <el-table-column prop="rankId" label="任务编号" width="100" align="center"></el-table-column>
        <el-table-column prop="circuitId" label="线路编号" width="100" align="center"></el-table-column>
        <el-table-column prop="poleId" label="塔杆编号" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="缺陷类型" width="100" align="center"></el-table-column>
        <el-table-column prop="rate" label="完好率" width="100" align="center"></el-table-column>
        <el-table-column prop="connect" label="缺陷描述" width="100" align="center"></el-table-column>
        <el-table-column prop="date" label="发现时间" width="100" align="center"></el-table-column>
        <el-table-column prop="people" label="发现人员" width="100" align="center"></el-table-column>
        <el-table-column prop="operate" label="缺陷级别"  align="center">
            <select class="selectOne">
              <option value="--请选择--">--请选择--</option>
              <option value="一般">一般</option>
              <option value="紧急">紧急</option>
              <option value="严重">严重</option>
            </select>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "inspect",
  data() {
    return {
      tableData: [
        {
          rankId:'LTX0245',
          date: "2016-05-02",
          name: "拦河线断裂",
          people: "巡检员测试用户01"
        },{},{},{},{},{},{}
      ],
      total: 14,
      pagesize: 7,
      currentPage: 1
    };
  },
  methods: {
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>


<style lang="less" scoped>

.level {
  padding: 0 20px;
}

.data {
  width: 120px;
  height: 26px;
}

select {
  width: 120px;
  height: 32px;
}

.el-row {
 padding:  20px 0 ;
}

.bg-purple {
  width: 220px;
}

.btn-query {
  width: 120px;
  height: 30px;
  background: rgb(94,228,228);
  border: 0;
  border-radius: 5px;
  color: #fff;
  padding: 0 15px;
  outline: none;
}

.btn-query:active {
  background: rgb(31, 184, 184);
}

.selectOne {
  border-radius: 5px
}
</style>