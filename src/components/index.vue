<template>
  <login v-if="!isLogin"/>
</template>

<script>
import { ref, provide, watch } from "vue";
import login from './Login.vue'
export default {
    components:{
        login
    },
    setup() {
    const isLogin = ref(false);
    provide("isLogin", isLogin);
    return {
      isLogin: isLogin.ref,
    };
  },
  data() {
    return {
      // isLogin:false
    };
  },

  mounted() {
    // this.isLogin = this.$store.state.getIsLogin
  },
}
</script>

<style>

</style>