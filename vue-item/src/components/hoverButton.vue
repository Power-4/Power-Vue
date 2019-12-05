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
var resourceList = [
  {
    resourcesId: 1, // 资源ID
    resourcesName: "电力巡检系统",
    resourcesType: 1, //资源类型  几级导航
    priority: 1, // 在同等导航下的排列顺序
    parentId: 0, //父级资源id
    permission: null, //权限的请求路径
    systemPropertiesValue: {
      id: null, //
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用" // 状态
    }
  },
  {
    resourcesId: 2,
    resourcesName: "我的工作平台",
    resourcesType: 2,
    priority: 1,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 3,
    resourcesName: "待办列表",
    resourcesType: 3,
    priority: 1,
    parentId: 2,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "用"
    }
  },
  {
    resourcesId: 4,
    resourcesName: "个人资料修改",
    resourcesType: 3,
    priority: 2,
    parentId: 2,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 10,
    resourcesName: "杆塔管理",
    resourcesType: 2,
    priority: 3,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 11,
    resourcesName: "线路管理",
    resourcesType: 2,
    priority: 4,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 12,
    resourcesName: "缺陷管理",
    resourcesType: 2,
    priority: 5,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 13,
    resourcesName: "缺陷类型设置",
    resourcesType: 3,
    priority: 1,
    parentId: 12,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 14,
    resourcesName: "缺陷等级确认",
    resourcesType: 3,
    priority: 2,
    parentId: 12,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 15,
    resourcesName: "巡检任务管理",
    resourcesType: 2,
    priority: 6,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 16,
    resourcesName: "巡检任务制定与分配",
    resourcesType: 3,
    priority: 1,
    parentId: 15,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 19,
    resourcesName: "消缺任务管理",
    resourcesType: 2,
    priority: 7,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 20,
    resourcesName: "消缺任务制定与分配",
    resourcesType: 3,
    priority: 1,
    parentId: 19,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 23,
    resourcesName: "信息统计",
    resourcesType: 2,
    priority: 8,
    parentId: 1,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 24,
    resourcesName: "巡检记录统计",
    resourcesType: 3,
    priority: 1,
    parentId: 23,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  },
  {
    resourcesId: 25,
    resourcesName: "消缺记录统计",
    resourcesType: 3,
    priority: 2,
    parentId: 23,
    permission: null,
    systemPropertiesValue: {
      id: null,
      systemProperties: null,
      sysProValueId: null,
      sysProValueName: "启用"
    }
  }
];

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
    this.list = resourceList;
    
     this.axios.get("/permission/getResources",{params:{
       token:sessionstorage.getItem("token")
     }})
     .then((res)=>{
       window.console.log(res)
     })
     .cach((err)=>{
       window.console.log(err)
     })
  }
};
</script>