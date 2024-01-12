<template>
  <div>
    <input type="text" v-model="uTel" />
    <input type="text" v-model="uPwd" />
    <button @click="login">login</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const uTel = ref("");
    const uPwd = ref("");
    return {
      uTel: uTel.ref,
      uPwd: uPwd.ref,
    };
  },
  data() {
    return {
      baseUrl: "http://127.0.0.1:3000",
    };
  },
  methods: {
    login() {
      const data = { uTel: this.uTel, uPwd: this.uPwd }
      console.log(JSON.stringify(data));
      fetch(`${this.baseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        console.log(r);
      });
    },
  },
};
</script>

<style>
</style>