<template>
  <div>
    <div class="item" v-for="(item, index) in itemList" :key="index">
      <span>{{ item.key }}</span>
      <input type="text" v-model="item.model" />
    </div>
    <button @click="addAdmin">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    const itemList = [
      {
        key: "电话",
        model: this.uTel,
      },
      {
        key: "密码",
        model: this.uPwd,
      },
      {
        key: "名字",
        model: this.uName,
      },
      {
        key: "生日",
        model: this.uBirth,
      },
      {
        key: "级别",
        model: this.uRank,
      },
      {
        key: "部门",
        model: this.uDep,
      },
    ];
    return {
      itemList,
      uTel: "",
      uPwd: "",
      uName: "",
      uRank: "", // 级别
      uBirth: "",
      uDep: "", // 部门
    };
  },
  methods: {
    addAdmin() {
      const data = {
        cTel:`18580528918`,
        uTel: this.uTel,
        uPwd: this.uPwd,
        uName: this.uName,
        uRank: this.uRank, // 级别
        uBirth: this.uBirth,
        uDep: this.uDep, // 部门
      };
      this.$Api.addAdmin(data);
    },
  },
};
</script>

<style>
</style>