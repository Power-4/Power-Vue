<template>
  <div class="enact-add">
    <p class="add-title">
      <span><router-link to="/inspect/insenact">巡检任务的制定与分配 >> </router-link></span>
      <span>制定巡检任务</span>

    </p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="任务编码">
        <el-input v-model="form.taskNo"></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="form.taskName"></el-input>
      </el-form-item>
      <el-form-item label="巡检线路">
        <el-select v-model="form.circuitryName" clearable placeholder="请选择">
          <el-option
            v-for="item in form.nameOptions"
            :key="item.id"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡检员">
        <el-input type="textarea" v-model="form.inspectPerson"></el-input>
      </el-form-item>
      <el-form-item label="起始杆号">
        <el-input v-model="form.startPoleId"></el-input>
      </el-form-item>
      <el-form-item label="终止杆号">
        <el-input v-model="form.endPoleId"></el-input>
      </el-form-item>
      <el-form-item label="下发人">
        <el-input v-model="form.userName" :disabled="edit"></el-input> 
      </el-form-item>
      <el-form-item label="下发日期">
        <el-input v-model="form.createDate" :disabled="edit"></el-input> 
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">保存</el-button>
        <el-button type="primary" @click="clear">重置</el-button>
        <el-button @click="backto">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'enactadd',
  data() {
    return {
      edit: true,
      form: {
        taskNo: this.$route.query.taskNo,
        taskName: this.$route.query.taskName,
        circuitryName: this.$route.query.circuitryName,
        nameOptions: [
          {
            id: 1,
            label: '西邻一线'
          },
          {
            id: 2,
            label: '西邻二线'
          }

        ],
        inspectPerson: '',
        startPoleId: this.$route.query.startPoleId,
        endPoleId: this.$route.query.endPoleId,
        userName: 'mi',
        createDate: '2013/02/01',
        describe: ''
      }
    }
  },
  created() {
    this.getParams();
  },
  watch: {
    '$route':'getParams'
  },
  methods:{
    getParams(){
      var routerParams = this.$route.query.taskNo;
      window.console.log("传来的参数=="+routerParams);
    },
    add() {
      // let params = {
      //   taskNo: form.taskNo
      // }
      // this.$router.push({
      //   path: '/inspect/insenact',
      //   name: 'enactadd',
      //   params: params
      // })
      // console.log(this.form.circuitryName);
      // this.addinspectData({

      //   taskId: this.form.taskId,
      //   taskName: this.taskName,
      //   circuitryName: this.inspectLine,
      //   inspectPerson: this.inspectPerson,
      //   startNumber: this.startNumber,
      //   endNumber: this.endNumber,
      //   issuePerson: this.issuePerson,
      //   issueDate: this.issueDate,
      //   describe: this.describe
      // })

        this.form.taskNo = '',
        this.form.taskName = '',
        this.form.circuitryName = '',
        this.form.inspectPerson = '',
        this.form.startPoleId = '',
        this.form.endPoleId = '',
        this.form.userName = '',
        this.form.createDate = '',
        this.form.describe = ''

    },
    clear() {
      this.form.taskNo = '',
      this.form.taskName = '',
      this.form.circuitryName = '',
      this.form.inspectPerson = '',
      this.form.startPoleId = '',
      this.form.endPoleId = '',
      this.form.describe = ''
    },
    backto() {
      this.$router.push('/inspect/insenact')
    }

  }
  
}
</script>

<style lang="less" scoped>

.enact-add {

  .add-title {
    font-size: 14px;
  }

  .el-form {
    width: 400px;
    margin-left: 50px;

    .el-form-item {
      margin-bottom: 10px;
    }
  }
}

</style>