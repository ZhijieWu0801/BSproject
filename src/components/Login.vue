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
import baseUrl from '../comoneJS/baseUrl.js'
export default {
  setup() {
    const router = useRouter()
    const uTel = ref("");
    const uPwd = ref("");
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
          localStorage.setItem("islogin",true)
          router.push("/home")
        }
        console.log(r);

      });
    }
    return {
      uTel: uTel.ref,
      uPwd: uPwd.ref,
      isLogin: isLogin,
      login
    };
  },
  data() {
    return {
    };
  },
  mounted(){
    window.getiii = this.$store.getters.getIsLogin
  },
  methods: {
    
  },
};
</script>

<style>
</style>