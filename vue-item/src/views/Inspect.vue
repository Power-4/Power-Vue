<template>
  <div class="app-inspect">
    <p class="now-positon">
      <router-link to="/inspect/insenact">巡检任务制定与分配</router-link> 
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
    margin: 25px 0 35px;


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
}

.router-link-exact-active.router-link-active {
  color: rgb(94,228,228);
}



</style>
