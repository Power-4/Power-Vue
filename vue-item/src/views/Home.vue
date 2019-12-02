<template>
  <div class="home">
    <!-- 
      nav
    -->
    <nav class="top">
      <nav class="top-body">
        <nav class="top-left">
          <i class="el-icon-timer"></i>
          {{ this.timeColok }}
        </nav>
        <nav class="top-right">
          <span>{{ username }}</span>
          <strong @click="quit">退出</strong>
        </nav>
        <nav class="logo">
          <h1>欢迎来到电力巡检系统</h1>
        </nav>
      </nav>
    </nav>
    <!-- 
      body
    -->
    <section class="body">
      <!-- 
        left
      -->
      <div class="left">
        <hover-button v-for="(item, index) in powerData" :key="index" :item="item"></hover-button>
      </div>
      <!--
        right
      -->
      <div class="right">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import hoverButton from "../components/hoverButton.vue";
export default {
  name: "home",
  data() {
    return {
      // 左上角时间生成
      timeColok: new Date().toLocaleTimeString(),
      // 时间计时器
      timer: null,
      // 从本地库中提取的用户名
      username: "王大波",
      // 生成菜单的数据
      powerData: [
        "a",
        "system",
        "towar",
        "line",
        "defect",
        "inspect",
        "repair",
        "total"
      ]
    };
  },
  components: {
    hoverButton
  },
  methods: {
    clock() {
      var time = new Date();
      var attime = time.toLocaleTimeString();
      this.timeColok = attime;
    },
    // 退出登录
    quit() {
      // 弹出确认窗口
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          sessionStorage.removeItem("token");
          // 跳转到login
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已经取消退出"
          });
        });

      // 是否取消登录

      // 删除登录信息
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.timer = setInterval(this.clock, 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  height: 100%;
}
.top {
  height: 64px;

  background-color: #5ee4e4;
  margin: 0 auto;
}
.top-body {
  width: 1200px;
  height: 64px;
  margin: 0 auto;
}
.top-words {
  line-height: 64px;
  color: white;
  margin-left: 15px;
}
.top-left {
  .top-words();
  float: left;
}
.top-right {
  .top-words();
  float: right;
}
.top-right > strong {
  margin-right: 20px;
  margin-left: 30px;

  cursor: pointer;
}
.body {
  height: 100%;
  margin-top: 10px;
  width: 1200px;
  margin: 0 auto;
}
.left {
  width: 200px;
  line-height: 60px;
  text-align: center;
  float: left;
  height: 100%;
  background-color: #999;
}
.tab {
  display: block;
}
.logo h1 {
  color: white;
  font-size: 24px;
  font-weight: 200;
  line-height: 64px;
  text-align: center;
}
</style>