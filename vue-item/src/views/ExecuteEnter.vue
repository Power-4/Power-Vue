<template>
  <div class="execute-enter">
    <p class="title" v-if="isadd">巡检任务回执录入</p>
    <p class="title" v-else>巡检任务回执修改</p>
    <div class="info-details">
      <div class="lines">
        <el-tree
          :data="lines"
          default-expand-all
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="details">
        <el-form>
          <el-form-item label="任务编号：">
            <el-input v-model="form.taskNo" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="线路编码：">
            <el-input v-model="form.circuitryNo" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="杆塔编码：">
            <el-input v-model="form.poleNo" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="缺陷类型：">
            <el-select v-model="form.defectsName" clearable placeholder="请选择">
              <el-option
                v-for="item in form.typeOptions"
                :key="item.defectsId"
                :label="item.defectsName"
                :value="item.defectsId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发现时间：">
            <el-input v-model="form.findDate" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="发现人员：">
            <el-input v-model="form.foundPerson" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="缺陷描述：">
            <el-input type="textarea" v-model="form.defectsDescribe" class="area"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button v-if="isadd" type="primary" @click="addSave">新增保存</el-button>
    <el-button v-else type="primary" @click="modifySave">修改保存</el-button>
    <el-button type="primary" @click="backto">返回</el-button>
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  data() {
    return {
      taskId: '',
      temps: [],
      isadd: true,
      lines: [
        {
          id: 0,
          label: '',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        taskNo: '',
        circuitryNo: '',
        poleNo: '',
        nowPoleId: '',
        findDate: '',
        foundPerson: '巡检员01',
        defectsDescribe: '',
        defectsName: '',
        typeOptions: []
      },
      edit:true,

    }
  },
  created() {
    this.getParams();
    this.isadd = this.isAdd;
    
    // 渲染页面数据
    this.axios.get('/showTaskandPoles?',{params:{taskId: this.taskId}})
    .then((res) => {
      res.data.data.taskAndPoles.poles.forEach((item)=> {
        var i = {};
        i.id = item.poleId,
        i.label = item.poleNo;
        this.lines[0].children.push(i)
      })
      this.lines[0].label = res.data.data.taskAndPoles.task.circuitry.circuitryName;
      this.form.circuitryNo = res.data.data.taskAndPoles.task.circuitry.circuitryNo;
      window.console.log(res.data);
    })
    .catch((err) => { 
      window.console.log("错误",err)
    })

    // 请求缺陷类型
    this.axios.get('/getDefectsName?')
    .then((res) => {
      this.form.typeOptions = res.data.data.defects;
      window.console.log(res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })
  },
  computed: {
    ...mapState([
      'isAdd'
    ]),
  },
  watch: {
    '$route': 'getParams'
  },
  mounted() {
    // 页面加载完后显示当前时间
    this.form.findDate = this.addDate()
  },
  methods: {
    // 获取基本信息
    getParams() {
      this.taskId = this.$route.query.taskId;
      this.form.taskNo =  this.$route.query.taskId;
    },
    // 获取时间
    addDate() {
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1;
      month = month < 10 ? '0' + month:month;
      var today = nowDate.getDate();
      today = today < 10? '0' + today:today;

      let systemDate = year + '-' + month + '-' + today;
      return systemDate;
    },
    // 返回上一页
    backto() {
      this.$router.go(-1);
    },
    // 点击杆号
    handleNodeClick(lines) {
      this.form.nowPoleId = lines.id;

      // 判断点击的杆塔编号
      if(lines.id !== 0) {
        this.form.poleNo = lines.label;
      } else {
        this.form.poleNo= '';
      }
      // 判断是否编辑
      var flags = false;
      if(this.temps.length==0) {
        window.console.log(flags)
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == lines.label) {
            this.form.defectName = this.temps[i].defectName;
            this.form.defectLevel = this.temps[i].defectLevel;
            this.form.defectsDescribe = this.temps[i].defectsDescribe;
            flags=true;
          }
        }

        if(flags==false) {
          this.form.defectsName = '';
          this.form.defectsDescribe = '';
        }
      }

      if(!this.isadd) {
        this.axios.get('/selectRecord?',{params:{poleId: lines.id}})
        .then((res) => {
            this.form.defectsName = res.data.data.circuitryPoleRecordVO.damageRecord.defects.defectsName;
            this.form.defectsDescribe = res.data.data.circuitryPoleRecordVO.damageRecord.defectsDescribe;
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      }
    },

    // 保存
    addSave() {
      let msg = {
        poleNo: this.form.poleNo,
        defectsName: this.form.defectsName,
        defectsDescribe: this.form.defectsDescribe
      }

      // 判断数组是否存在（之前保存过）
      var  flag = false;
      if(this.temps.length==0) {
        this.temps.push(msg);
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == this.form.poleNo) {
            this.temps.splice(i, 1, msg);
            flag=true;
          }
        }

        if(flag==false) {
          this.temps.push(msg);
        }
      }
       
      // 回执录入请求
      this.axios.get('/insertRecord?',{params:{
        taskNo: this.form.taskNo,
        poleId:  this.form.nowPoleId,
        defectsId: this.form.defectsName,
        findDate: this.form.findDate,
        defectsDescribe: this.form.defectsDescribe
      }})
      .then((res) => {
        
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })
    },
    modifySave() {
      let msg = {
        poleNo: this.form.poleNo,
        defectsName: this.form.defectName,
        defectsDescribe: this.form.defectsDescribe
      }

      // 判断数组是否存在（之前保存过）
      var  flag = false;
      if(this.temps.length==0) {
        this.temps.push(msg);
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == this.form.poleNo) {
            this.temps.splice(i, 1, msg);
            flag=true;
          }
        }

        if(flag==false) {
          this.temps.push(msg);
        }
      }

      // 回执修改请求
      this.axios.get('http://192.168.6.184:8080/updateRecord?',{params:{
        poleId: this.form.nowPoleId,
        defectsId: this.form.defectsName,
        findDate: this.form.findDate,
        defectsDescribe: this.form.defectsDescribe
      }})
      .then((res) => {
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })
    },
  }
}
</script>

<style lang="less" scoped>
.execute-enter {
  padding: 0 30px 0;

  .title {
    font-weight: 600;
    margin: 15px 0;
  }

  .info-details {
    width: 100%;
    display: flex;
    height: 500px;
    margin-bottom: 10px;
    justify-content: space-between;

    .lines {
      width: 20%;
      height: 100%;
      padding: 0 0 10px;
      overflow: auto;
      box-sizing: border-box;
      border: 1px solid #000;

      .el-tree {
        margin-top: 10px;
        height: 450px;
        text-align: center;

        &>div:first-child {
          height: 100%;
        }
      }

      .el-tree-node:focus > .el-tree-node__content {
        color: red !important;
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