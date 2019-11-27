<template>
  <div class="self">
    <nav></nav>
    <router-link to="/">代办列表</router-link>
    <router-link to="/selfmsg">个人资料修改</router-link>

    <!-- 代办事件流程图 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>


<style lang="less" scoped>
.self {
  float: left;
  width: 980px;
  padding: 10px;
}
</style>