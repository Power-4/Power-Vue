<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      :unique-opened="true"
      background-color="#5ee4e4"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1" :disabled="panduan(2)">
        <template slot="title">
          <i class="el-icon-user-solid myIc"></i>
          <span slot="title">个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/a" :disabled="panduan(3)">待办列表</el-menu-item>
          <el-menu-item index="/a/selfmsg" :disabled="panduan(4)">个人资料修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2" :disabled="panduan(5)">
        <template slot="title">
          <i class="el-icon-s-tools myIc"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system" :disabled="panduan(6)">角色管理</el-menu-item>
          <el-menu-item index="/system/users" :disabled="panduan(7)">用户管理</el-menu-item>
          <el-menu-item index="/system/power" :disabled="panduan(8)">角色权限管理</el-menu-item>
          <el-menu-item index="/system/config" :disabled="panduan(9)">系统配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="3" route="/towar" :disabled="panduan(10)">
        <i class="el-icon-s-flag myIc"></i>
        <span slot="title">杆塔管理</span>
      </el-menu-item>

      <el-menu-item index="4" route="/line" :disabled="panduan(11)">
        <i class="el-icon-guide myIc"></i>
        <span slot="title" >线路管理</span>
      </el-menu-item>

      <el-submenu index="5" :disabled="panduan(12)">
        <template slot="title">
          <i class="el-icon-s-release myIc"></i>
          <span slot="title">缺陷管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/defect?name=type" :disabled="panduan(13)">缺陷类型名称</el-menu-item>
          <el-menu-item index="/defectLevel?name=level" :disabled="panduan(14)">缺陷等级确认</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6" :disabled="panduan(15)">
        <template slot="title">
          <i class="el-icon-position myIc"></i>
          <span slot="title">巡检管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/inspect" :disabled="panduan(16)">巡检任务制定与分配</el-menu-item>
          <el-menu-item index="/inspect/insexecute" :disabled="panduan(17)">巡检任务执行与回执</el-menu-item>
          <el-menu-item index="/inspect/insdefect" :disabled="panduan(18)">缺陷查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7" :disabled="panduan(19)">
        <template slot="title">
          <i class="el-icon-suitcase-1 myIc"></i>
          <span slot="title">消缺管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/repair" :disabled="panduan(20)">消缺任务制定与分配</el-menu-item>
          <el-menu-item index="/repairperform" :disabled="panduan(21)">消缺任务执行与回执</el-menu-item>
          <el-menu-item index="/repairquery" :disabled="panduan(22)">消缺查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="8" :disabled="panduan(23)">
        <template slot="title">
          <i class="el-icon-tickets myIc"></i>
          <span slot="title">信息统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/total?name=xun" :disabled="panduan(24)">巡检记录</el-menu-item>
          <el-menu-item index="/total?name=xiao" :disabled="panduan(25)">消缺记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.myIc::before {
  color: rgb(255, 255, 255);
}
.color {
  color: red
}
</style>

<script>

export default {
  data() {
    return {
      isCollapse: false,
      quan: 5,
      list: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },
    panduan(resourcesId) {
      var arr = this.list.filter(item => {
        return item.resourcesId == resourcesId;
      });

      if ( arr[0] ) {
        if (arr[0].systemPropertiesValue.sysProValueName == "启用") {
          return false;
        } else {
          return true;
        }
      }
      else {
        return true
      }
    }
  },
  created() {

    
    this.axios.get("/permission/getResources")
     .then((res)=>{
       this.list=res.data.data.resourceList
       window.console.log("权限判断的",res)
     })
     .catch((err)=>{
       window.console.log(err)
     })
  }
};
</script>