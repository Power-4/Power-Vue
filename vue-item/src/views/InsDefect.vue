<template>
  <div class="insdefect">
    <div class="search-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
              <el-input
                placeholder="请输入内容"
                v-model="taskNo"
                clearable>
              </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
              <el-input
                placeholder="请输入内容"
                v-model="circuitryId"
                clearable>
              </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷类型：</label>
              <el-select v-model="defectName" clearable placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷级别：</label>
              <el-select v-model="defectLevel" clearable placeholder="请选择">
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>发现时间：</label>
              <el-date-picker
                v-model="foundDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
              <el-date-picker
                v-model="createDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple bg-add"> 
            <el-button type="primary">导出EXCEL</el-button>   
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="taskId"
        label="任务编号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="lineId"
        label="线路编号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="towerId"
        label="杆塔编号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="defectLevel"
        label="缺陷级别"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="defectType"
        label="缺陷类型"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="foundPerson"
        label="发现人"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="foundTime"
        label="发现时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="issuePerson"
        label="下发人"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="issueTime"
        label="下发时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="intactRate"
        label="完好率"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="defectDescribe"
        label="缺陷描述"
        align= "center">
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="5">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          taskId: 'RW0245',
          lineId: 'XW001',
          towerId: 'XW0001',
          defectLevel: '一般',
          defectType: '断裂',
          foundPerson: '测试1',
          foundTime: '2013/02/01',
          issuePerson: '管理员1',
          issueTime: '2013/02/03',
          intactRate: '78%',
          defectDescribe: '断裂'
        }
      ],
      total: 10,
      pagesize:5,
      currentPage:1,
      taskNo: '',
      circuitryId: '',
      defectName: '',
      typeOptions: [
        {
          value: '选项1',
          label: '叉梁断裂'
        }, {
          value: '选项2',
          label: '拦河线断裂'
        }, {
          value: '选项3',
          label: '绝缘子爆破'
        }, {
          value: '选项4',
          label: '杆塔倾斜'
        }, {
          value: '选项4',
          label: '吊杆变形'
        }, {
          value: '选项4',
          label: '其他'
        }
      ],
      defectLevel: '',
      levelOptions: [
        {
          value: '选项1',
          label: '一般'
        }, {
          value: '选项2',
          label: '严重'
        }, {
          value: '选项3',
          label: '其他'
        } 
      ],
      foundDate: '',
      createDate: ''
    }
  }
  
}
</script>

<style lang="less" scoped>
.insdefect {
  width: 100%;

  .search-box {
    margin: 20px 0;

    .el-row {
      margin: 10px 0;

      .bg-add {
        text-align: right;
      }

      label {
        display: inline-block;
        width: 80px;
      }
      
      .el-input {
        width: 150px;
      }

      .el-select {
        width: 150px;
      }

    }


  }

  .el-table {
    margin: 0 auto;

    .el-button:hover {
      cursor: pointer;
    }
  }

  .pagination {
    margin: 10px 0 0;
    text-align: right;
  }
}

</style>