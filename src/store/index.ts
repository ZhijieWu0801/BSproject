// store.js

import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLogin: false
    };
  },
  mutations: {
    setIsLogin(state,value:boolean){
        state.isLogin = value
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    }
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    }
  }
});

export default store;