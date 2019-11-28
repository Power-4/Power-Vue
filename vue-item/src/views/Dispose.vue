<template>
  <div class="dispose">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="dispose"
      class="dispose-one"
    >
      <el-form-item label="任务编号">
        <el-input v-model="dispose.rankId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="线路编号">
        <el-input v-model="dispose.circuitId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="塔杆编号">
        <el-input v-model="dispose.poleId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="缺陷类型">
        <el-input v-model="dispose.type" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="完好率">
        <el-input v-model="dispose.rate" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <div class="dispose-two">
      <el-form :label-position="labelPosition" label-width="80px" :model="dispose">
        <el-form-item label="缺陷描述">
          <el-input v-model="dispose.connect" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发现时间">
          <el-input v-model="dispose.time" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发现人员">
          <el-input v-model="dispose.people" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="缺陷等级">
          <el-select v-model="dispose.select">
            <el-option value="一般">一般</el-option>
            <el-option value="紧急">紧急</el-option>
            <el-option value="严重">严重</el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="grid-content bg-purple">
        <button type="button" class="btn-query" @click="save()">保 存</button>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "dispose",
  data() {
    return {
      labelPosition: "right",
      dispose: { rankId: "", circuitId: "", type: "",poleId:"",rate:"",connect:"",time:"",people:"",select:""}
    }
  },
  methods:{
    save() {
    window.console.log(this.dispose.select)
    }
  }
};
</script>

<style lang="less" scoped>
.dispose-two {
  float: right;
}
.dispose-one {
  float: left;
}
.dispose {
  padding: 20px 10px;
  margin-top: 50px;
}
.el-form {
  width: 400px;
}

.el-form-item {
  width: 320px;
}

.title {
  margin: 20px;
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
  .title-item {
    font-size: 16px;
    color: #666;
  }
}

a {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: #ccc;
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
  margin-right: 20px;
}

.btn-query:active {
  background: rgb(31, 184, 184);
}
</style>