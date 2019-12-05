<template>
  <div class="right-type">
    <div class="defect">
      <section>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
          <el-breadcrumb-item>缺陷管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: "defect",
  data() {
    return {
      title: "缺陷类型名称"
    };
  },
  watch: {
    "$route.query": {
      handler() {
        this.name = this.$route.query.name;
        this.fun();
      }
    }
  },
  methods: {
    fun() {
      window.console.log(this.name);
      if (this.name == "level") {
        this.title = "缺陷等级确认";
      } else {
        this.title = "缺陷类型名称";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.defect {
  width: 1000px;
  float: left;
}

.right-type {
  width: 1000px;
  overflow: hidden;
}

a {
  display: inline-block;
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  text-align: center;
  color: #ccc;
}
a:active {
  color: rgb(94, 228, 228);
}

.router-link-active {
  color: rgb(94, 228, 228);
}

.nav {
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