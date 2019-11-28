<template>
  <Button type="primary" class="w100 " :loading="loading2" @click="exports">
   <span v-if="!loading2">导出</span>
   <span v-else>请稍等...</span>
  </Button>
</template>
 
<script>
    import utils from "../utils/index";
    
    export default{
        data(){
            return{
                loading2:false
            }
        },
        methods:{
            exports(){
                
              this.loading2 = true;
              let httpUrl =
              BASE_URL + "/superProduct/loanSuperProduct/exportProductList";
              let formData = new FormData();
              formData.append("", );
              formData.append("", );
              formData.append("", );
              formData.append("", );
              utils.exporttable(httpUrl, utils.getlocal("token"), formData, e => {
                  this.loading2 = false;
              });
   
            }
        }
    }
 
</script>
