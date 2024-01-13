<template >
  <div>
    <input type="text"  v-model="uTel" />
    <input type="password" v-model="uPwd" />
    <button @click="login">login</button>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useRouter} from "vue-router"
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const uTel = ref("");
    const uPwd = ref("");
    const baseUrl= "http://127.0.0.1:3000"
    const store = useStore()
    let isLogin = inject("isLogin")
    function login() {
      const data = { uTel, uPwd}
      fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        return r.json()
      }).then((r)=>{
        if(!r.status){
          isLogin = true
          store.commit("setIsLogin",isLogin)
          console.log(store.getters.getIsLogin,1111);
          router.push("/home")
        }
        console.log(r);

      });
    }
    return {
      uTel: uTel.ref,
      uPwd: uPwd.ref,
      isLogin: isLogin.ref,
      login
    };
  },
  data() {
    return {
      // baseUrl: "http://127.0.0.1:3000",
    };
  },
  methods: {
    
  },
};
</script>

<style>
</style>