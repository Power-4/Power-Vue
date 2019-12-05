<template>
  <div class="power">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
    </el-breadcrumb>
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
    <div class="Chbox">
      <el-transfer
        v-model="yesData"
        :props="{key: 'resourcesId',label: 'resourcesName'}"
        :titles="['未授权', '已授权']"
        :data="rolePower"
      ></el-transfer>
    </div>

    <div class="abc">
      <div class="elbtnel">
        <el-button class="elb" @click="getRolePower">取消修改</el-button>
        <el-button class="elb" @click="sendPower">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  methods: {
    // ====================获取角色和全选============================
    getPowerSelect() {
      // http://192.168.6.184:8080
      var words = `/permission/getAllRoleName`;
      this.axios.get(words).then(res => {
        this.powerSelect = res.data.data.roleNames;
      });
    },
    // 获取角色信息
    getRolePower() {
      // 获取角色权限信息
      // http://192.168.6.184:8080
      var words = `/permission/getResourcesByRoleName?roleName=${this.role}`;
      window.console.log("获取角色权限信息", words);
      this.axios.get(words).then(res => {
        // res.data.data.resourcesName名字
        // sysProValueName启用 / 停用
        // resourceId 权限Id
        // this.rolePower = [];
        this.yesData = [];
        for (var i = 0; i < res.data.data.resourceList.length; i++) {
          // this.rolePower.push({
          //   resourcesName: res.data.data.resourceList[i].resourcesName,
          //   resourcesId: res.data.data.resourceList[i].resourcesId
          // });
          this.yesData.push(res.data.data.resourceList[i].resourcesId);
        }
        window.console.log("得到的权力数组", this.rolePower);
        window.console.log("得到的可以使用的权力", this.yesData);
      });
    },
    // ================================================================
    // =======================提交修改权限==============================
    // 提交修改后的权限
    sendPower() {
      // this.yesData
      var yesDataName = [];
      var abb = this.rolePower;
      window.console.log(abb);
      for (var i = 0; i < this.yesData.length; i++) {
        for (var j = 0; j < abb.length; j++) {
          if (this.yesData[i] == abb[j].resourcesId) {
            yesDataName.push(abb[j].resourcesName);
          }
        }
      }
      window.console.log("权限获取", this.yesData);
      window.console.log("this.rolePower.length", this.rolePower.length);
      window.console.log("this.yesData.length", this.yesData.length);
      window.console.log("获得权限信息", yesDataName);
      window.console.log(this.role);
      // http://192.168.6.184:8080
      var words = `/permission/addRole_resources_relation`;
      window.console.log(words);
      this.axios
        .get(words, {
          params: {
            resourcesNames: yesDataName,
            roleName: this.role
          },
          // 传输组需要的配置
          paramsSerializer: params => {
            return qs.stringify(params, { indices: false });
          }
        })
        .then(res => {
          window.console.log(res);
        });
    }
  },
  data() {
    return {
      // 权限
      rolePower: [
        { resourcesId: 1, resourcesName: "电力巡检系统" },
        { resourcesId: 2, resourcesName: "我的工作平台" },
        { resourcesId: 3, resourcesName: "待办列表" },
        { resourcesId: 4, resourcesName: "个人资料修改" },
        { resourcesId: 5, resourcesName: "系统管理" },
        { resourcesId: 6, resourcesName: "角色管理" },
        { resourcesId: 7, resourcesName: "用户管理" },
        { resourcesId: 8, resourcesName: "角色权限配置" },
        { resourcesId: 9, resourcesName: "系统配置" },
        { resourcesId: 10, resourcesName: "杆塔管理" },
        { resourcesId: 11, resourcesName: "线路管理" },
        { resourcesId: 12, resourcesName: "缺陷管理" },
        { resourcesId: 13, resourcesName: "缺陷类型设置" },
        { resourcesId: 14, resourcesName: "缺陷等级确认" },
        { resourcesId: 15, resourcesName: "巡检任务管理" },
        { resourcesId: 16, resourcesName: "巡检任务制定与分配" },
        { resourcesId: 17, resourcesName: "巡检任务执行与回执" },
        { resourcesId: 18, resourcesName: "缺陷查询" },
        { resourcesId: 19, resourcesName: "消缺任务管理" },
        { resourcesId: 20, resourcesName: "消缺任务制定与分配" },
        { resourcesId: 21, resourcesName: "消缺任务执行与回执" },
        { resourcesId: 22, resourcesName: "消缺查询" },
        { resourcesId: 23, resourcesName: "信息统计" },
        { resourcesId: 24, resourcesName: "巡检记录统计" },
        { resourcesId: 25, resourcesName: "消缺记录统计" }
      ],
      // 拥有的权限
      yesData: [],
      // ============================================================
      // select 容器
      powerSelect: ["地主", "师爷", "家丁", "长工", "短工", "佃户"],
      // 获取的角色权限
      role: ""
      // ============================================================
    };
  },
  created() {
    this.getPowerSelect();
  }
};
</script>
<style lang="less">
.lu {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(218, 218, 218);
  span:nth-of-type(1) {
    margin-left: 20px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}
</style>
<style>
.Chbox {
  width: 800px;
  margin: 20px auto;
}
.aaaa {
  text-align: center;
  line-height: 60px;
}
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