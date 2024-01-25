<template>
  <div class="homeContainer">
    <header>11111</header>
    <body>
      <!-- <sidenav :navItem="navItem" @navChange="navChangeHandle" />
      <div style="background-color: rgb(207, 238, 238);">
        <router-view :is="viewPath"></router-view>
      </div> -->
      <LayOut>
        <template #left>
          <sidenav :navItem="navItem" @navChange="navChangeHandle" />
        </template>
      </LayOut>
    </body>
    <footer>3333</footer>
  </div>
</template>

<script>
import sidenav from "./sideNav.vue";
import LayOut from "./LayOut.vue"
const navItem = [];
const baseUrl = `http://127.0.0.1:3000`;
export default {
  components: {
    sidenav,
    LayOut
  },
  data() {
    return {
      navItem,
      baseUrl,
      viewPath:''
    };
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
    navChangeHandle(index) {
      console.log(index);
      this.viewPath = "/HelloWorld"
    },
  },
};
</script>

<style>
</style>