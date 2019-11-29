<template>
  <div class="login">
    <p class="biaoti">电力巡检系统登录</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      
    >   
       
      <el-form-item label="账号" prop="user">
        <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">登录</el-button>
        <el-button @click="resetForm('ruleForm');chongzhi=false" class="chongzhi">重置</el-button>
      </el-form-item>
    </el-form>

      
    <div class="xuan" v-if="chongzhi">
      <vue-particles
        color="#5ee4e4"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#5ee4e4"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi" 
      >
      </vue-particles>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: ""
      },
      chongzhi:true,
      rules: {
        user: [{required: true,validator: validatePass, trigger: "blur" }],
        pass: [{ required: true,validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  watch:{
    chongzhi(){
      if(!this.chongzhi)
      { 
        setTimeout(()=>{
         this.chongzhi=true;
        },100)
        
      }
     
    }
  },
  methods: {
    /* 判断是否可以提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tijiao();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tijiao() {

      window.console.log(this.ruleForm);
      
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5ee4e4;
.login {
  width: 400px;
  height: 300px;
  position: relative;
  top: 200px;
  border: 1px solid @mainColor;
  border-radius: 5px;
  box-shadow: 0px 0px 5px @mainColor inset;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  z-index: 10;
  .demo-ruleForm {
    width: 80%;
  }
}

.biaoti{
  width: 100%;
  text-align: center;
}
.tijiao {
  border-color: @mainColor;
  background-color: @mainColor;
  &:active {
    background-color: #439797;
  }
}
.chongzhi {
  background: #ffffff;
  color: black;
  &:hover {
    background-color: #61e6e6da;
    color: #ffffff;
  }
  &:active{
    background-color: #439797;
  }
}
.xuan{
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  left: 0;
  z-index: -1;
  
}
</style>