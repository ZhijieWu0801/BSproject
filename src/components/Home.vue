<template>
  <sidenav :navItem="navItem" />
</template>

<script>
import sidenav from "./sideNav.vue";
const navItem = []
const baseUrl = `http://127.0.0.1:3000`
export default {
  components: {
    sidenav,
  },
  data() {
    return {
        navItem,
        baseUrl,
    };
  },
  mounted(){
    fetch(`${baseUrl}/api/function/getfunctionList`).then(r=>r.json()).then(r=>{
        console.log(r);
        this.navItem = r.data
    })
  }
};
</script>

<style>
</style>