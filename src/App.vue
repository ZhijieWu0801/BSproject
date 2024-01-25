<template>
  <div class="BS-App">
    

    <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <sideNav :navItem="navItem" @navChange="navChangeHandle"></sideNav>
          <!-- <router-link to="/HelloWorld"></router-link> -->
        </el-aside>
        <el-main class="RouterMain">
          <router-view>

          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>






  </div>
</template>
<script>
import login from "./components/Login.vue";
import sideNav from "./components/sideNav.vue";
import LayOut from "./components/LayOut.vue";

const navItem = [];
const baseUrl = `http://127.0.0.1:3000`;
export default {
  components: {
    login,
    sideNav,
    LayOut,
  },
  data() {
      return {
        navItem,
      }
    },
  created() {
    this.isLogin = this.$store.getters.getIsLogin;
  },
  mounted() {
    fetch(`${baseUrl}/api/function/getfunctionList`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.navItem = r.data;
      });
  },
  methods: {
    navChangeHandle(item) {
      this.$router.push(item.path)
    },
  },
};
</script>



<style scoped lang="scss">
.BS-App {
  height: 100vh;
  .common-layout{
    height: 100%;
    .el-container{
      height: 100%;
    }
  }
}
.sideNavItem{
  padding-left: 10px;
}
.sidebar {
  width: 500px;
  height: 100%;
  padding: 10px;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .RouterMain{
    border: 2px solid red;
  }
</style>
