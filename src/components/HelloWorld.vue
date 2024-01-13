<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default{
  setup(){

    const store = useStore()
    console.log(store.getters.getIsLogin,111);
    const isLogin = store.getters.getIsLogin
    console.log(isLogin);
    return{
      isLogin
    }
  },
}

</script>

<template>
  <h1>{{ isLogin }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
