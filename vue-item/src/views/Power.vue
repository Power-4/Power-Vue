<template>
  <div class="power">
    <div class="slec">
      <span>选择角色：</span>
      <el-select placeholder="--请选择要修改的权限--" v-model="role" @change="getRolePower">
        <el-option
          v-for="item in powerSelect"
          :label="item"
          :key="item"
          :value="item"
          style="width: 100%;"
        ></el-option>
      </el-select>
    </div>
    <div class="abc">
      <div class="elbtnel">
        <el-button class="elb" @click="canselUpdata">取消修改</el-button>
        <el-button class="elb" @click="sendPower">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // ====================获取角色和全选============================
    getPowerSelect() {
      var words = `http://192.168.6.184:8080/permission/getAllRoleName`;
      this.axios.get(words).then(res => {
        window.console.log(res);
        this.powerSelect = res.data.data.roleNames;
      });
    },
    // 获取角色信息
    getRolePower() {
      // 获取角色权限信息

      this.axios
        .get(
          "http://192.168.6.184:8080/permission/getResourcesByRoleName?roleName=" +
            this.role
        )
        .then(res => {
          // res.data.data.resourcesName名字
          // sysProValueName启用 / 停用
          // resourceId 权限Id
          for (var i = 0; i < res.data.data.resourceList.length; i++) {
            this.rolePower.push({
              resourcesName: res.data.data.resourceList[i].resourcesName,
              sysProValueName: res.data.data.resourceList[i].sysProValueName,
              resourcesId: res.data.data.resourceList[i].resourcesId
            });
          }
        });
    },
    sendPower() {
      var words = `http://192.168.6.184:8080/`;
      this.axios.get(words).then(res => {
        window.console.log(res);
      });
    },
    // ============================================================
    // 取消修改
    canselUpdata() {
      this.getPowerSelect();
    }
  },
  data() {
    return {
      // ============================================================
      // select 容器
      powerSelect: ["地主", "师爷", "家丁", "长工", "短工", "佃户"],
      // 获取的角色权限
      role: "",
      // 角色权限 容器,
      rolePower: []
      // ============================================================
    };
  },
  created() {
    this.getPowerSelect();
  }
};
</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5ee4e4;
  border-color: #5ee4e4;
}
.power {
  width: 980px;
  margin: 0 auto;
}
.slec {
  margin-top: 25px;
  margin-left: 45px;
}
.abc {
  padding-top: 30px;
  width: 800px;
  margin: 0 auto;
}
.cBox {
  margin-top: 20px;
  padding: 0 60px;
}
.elb {
  float: right;
  margin-left: 30px;
}
.elbtnel {
  margin-top: 30px;
}
</style>