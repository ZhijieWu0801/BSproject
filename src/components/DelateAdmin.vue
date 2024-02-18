<template>
  <div class="selectTel">
    <span class="selectText">用户手机号:</span>
    <input type="text" v-model="selectTel">
    <button @click.stop="selectTelHandle">搜索</button>
  </div>
  <div>
    <div class="delateItem" v-for="(item, index) in itemList" :key="index">
      <span>{{ item.key }}: </span>
      <input type="text" v-model="item.model"/>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return {
    itemList:[
      {
        key: "电话",
        typ:"text",
        modelKey:"uTel",
        model: this.uTel,
      },
      {
        key: "名字",
        typ:"text",
        modelKey:"uName",
        model: this.uName,
      },
    ],
    selectTel:'',
  }
},
methods:{
  selectTelHandle(){
    this.$Api.findOneByUTel(this.selectTel).then(r=>{r.JSON()}).then(r=>{
      console.log(r,333);
    })
  }
}
}
</script>

<style>

</style>