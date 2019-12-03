<template>
  <div class="app-inspect">
    <p class="now-position">
      <router-link to="/inspect">巡检任务制定与分配</router-link> 
      <router-link to="/inspect/insexecute">巡检任务执行与回执</router-link> 
      <router-link to="/inspect/insdefect">缺陷查询</router-link>
    </p>
    <div>
      <router-view> </router-view>
    </div>

  </div>
</template>

<script>

export default {
  name:'inspect',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }
      ],
      total: 10,
      pagesize:5,
      currentPage:1
    }

  }

 
}
</script>


<style lang="less" scoped>

.app-inspect {
  width: 1000px;
  padding: 0 0 15px 20px;
  box-sizing: border-box;
  overflow: hidden;
  text-align: left;

  .now-position {
    margin: 10px 0;
    padding: 10px 0;
    box-shadow: 3px 3px 3px #5ee4e4;
  }

}

a:active {
  color: rgb(94,228,228);
}

a {
  display: inline-block;
  width: 180px;
  text-align: left;
  text-decoration: none;
  color: #ccc;
}

.router-link-exact-active.router-link-active {
  color: rgb(94,228,228);
}



</style>
