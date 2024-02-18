<template>
  <div>
    <div class="item" v-for="(item, index) in itemList" :key="index">
      <span>{{ item.key }}</span>
      <input :type="item.typ" v-model="item.model" />
    </div>
    <button @click="addAdmin">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    const itemList = 
    [
      {
        key: "电话",
        typ:"text",
        modelKey:"uTel",
        model: this.uTel,
      },
      {
        key: "密码",
        typ:"password",
        modelKey:"uPwd",
        model: this.uPwd,
      },
      {
        key: "名字",
        typ:"text",
        modelKey:"uName",
        model: this.uName,
      },
      {
        key: "生日",
        typ:"date",
        modelKey:"uBirth",
        model: this.uBirth,
      },
      {
        key: "级别",
        typ:"text",
        modelKey:"uRank",
        model: this.uRank,
      },
      {
        key: "部门",
        typ:"text",
        modelKey:"uDep",
        model: this.uDep,
      },
    ];
    return {
      itemList:[
      {
        key: "电话",
        typ:"text",
        modelKey:"uTel",
        model: this.uTel,
      },
      {
        key: "密码",
        typ:"password",
        modelKey:"uPwd",
        model: this.uPwd,
      },
      {
        key: "名字",
        typ:"text",
        modelKey:"uName",
        model: this.uName,
      },
      {
        key: "生日",
        typ:"date",
        modelKey:"uBirth",
        model: this.uBirth,
      },
      {
        key: "级别",
        typ:"text",
        modelKey:"uRank",
        model: this.uRank,
      },
      {
        key: "部门",
        typ:"text",
        modelKey:"uDep",
        model: this.uDep,
      },
    ],
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
      const arr = this.itemList.forEach((item)=>{
        console.log(`${item.modelKey}:${item.model}`);
        item = `${item.modelKey}:${item.model},`
        // return `${item.modelKey}:${item.model},`
      })
      let data = {}
      for (let index = 0; index < this.itemList.length; index++) {
        console.log(index);
        const modelKey = this.itemList[index].modelKey
        data[modelKey] = this.itemList[index].model
      }
      // const data = {
      //   cTel:`18580528918`,
      //   uTel: this.uTel,
      //   uPwd: this.uPwd,
      //   uName: this.uName,
      //   uRank: this.uRank, // 级别
      //   uBirth: this.uBirth,
      //   uDep: this.uDep, // 部门
      // }; 
      // console.log(arr,111);
      data.cTel = `18580528918`
      console.log(data);
      console.log(this.itemList);
      this.$Api.addAdmin(data);
    },
  },
};
</script>

<style>
</style>