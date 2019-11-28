<template>
  <div class="execute-enter">
    <p>巡检任务回执录入</p>
    <div class="info-details">
      <div class="lines">
        <el-tree
          :data="lines"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="details">
        <el-form>
          <el-form-item label="线路编码：">
            <el-input v-model="form.circuitryNo" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="杆塔编码：">
            <el-input v-model="form.poleNo" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="缺陷类型：">
            <el-select v-model="form.defectName" clearable placeholder="请选择">
              <el-option
                v-for="item in form.typeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺陷级别：">
            <el-select v-model="form.defectLevel" clearable placeholder="请选择">
              <el-option
                v-for="item in form.levelOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完好率：">
            <el-input v-model="form.completionRate"></el-input>
          </el-form-item>
          <el-form-item label="发现时间：">
            <el-input v-model="form.findDate" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="发现人员：">
            <el-input v-model="form.foundPerson" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="缺陷描述：">
            <el-input type="textarea" v-model="form.defectsDescribe" class="area"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button type="primary" @click="upLoad">上传回执</el-button>
    <el-button type="primary" @click="clear">重置</el-button>
    <el-button type="primary" @click="backto">返回</el-button>



  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: [
        {
          label: '一号线',
          children: [
            {
              id: 1,
              label: 'xw0001'
            },
            {
              id: 2,
              label: 'xw0002'
            },
            {
              id: 3,
              label: 'xw0003'
            },
            {
              id: 4,
              label: 'xw0004'
            },
            {
              id: 5,
              label: 'xw0005'
            },
            {
              id: 6,
              label: 'xw0006'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        circuitryNo: '',
        poleNo: '',
        completionRate: '',
        findDate: '',
        foundPerson: '',
        defectsDescribe: '',
        defectName: '',
        typeOptions: [
          {
            id: 1,
            label: '叉梁断裂'
          }, {
            id: 2,
            label: '拦河线断裂'
          }, {
            id: 3,
            label: '绝缘子爆破'
          }, {
            id: 4,
            label: '杆塔倾斜'
          }, {
            id: 5,
            label: '吊杆变形'
          }, {
            id: 6,
            label: '其他'
          }
        ],
        defectLevel: '',
        levelOptions: [
          {
            id: 1,
            label: '一般'
          }, {
            id: 2,
            label: '严重'
          }, {
            id: 3,
            label: '其他'
          } 
        ],
      }
    }
  },
  methods: {
    backto() {
      this.$router.push('/inspect/insexecute')
    },
    handleNodeClick() {

    },
    upLoad() {

    },
    clear() {
      this.form.defectName = '',
      this.form.defectLevel = '',
      this.form.completionRate = '',
      this.form.defectsDescribe = ''
    }
  }
  
}
</script>

<style lang="less" scoped>
.execute-enter {
  padding: 0 30px 0;

  .info-details {
    width: 100%;
    display: flex;
    height: 500px;
    margin-bottom: 10px;
    justify-content: space-between;

    .lines {
      width: 20%;
      height: 100%;
      border: 1px solid #000;

      .el-tree {
        margin-top: 10px;
        text-align: center;
      }
    }

    .details {
      width: 75%;
      height: 100%;
      padding: 20px 50px;
      box-sizing: border-box;
      border: 1px solid #000;

      .el-form {

        .el-form-item {
          margin-bottom: 10px;

          .el-input {
            width: 220px;
            height: 30px;
          }

          .area {
            width: 220px;
          }

        }
      }
    }
  }
}



</style>