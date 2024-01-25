<template>
  <div class="sideNavContainer">
    <ul>
      <li
      class="sideNavItem"
        v-for="(item, index) in navItem"
        :key="index"
        :class="{ navActive: activeItem === index }"
        @click="itemClickHandle(item,index)"
      >{{item.name}}</li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    // 侧边栏展示的项目
    const navItem = [
      {
        name:'添加管理员',
        path:'/addAdmin'
      },
      {
        name:'删除管理员',
        path:'/deleteAdmin'
      },
      {
        name:'更新管理员信息',
        path:'/updataAdmin'
      },
      {
        name:'查找管理员',
        path:'/selectAdmin'
      },
      {
        name:'添加宠物',
        path:'/addPet'
      },
      {
        name:'更新宠物数据',
        path:'/updataPet'
      },
      {
        name:'个人中心',
        path:'/myInfo'
      },
    ] // 列表项
    return {
        navItem, // 列表项
        activeItem: 0, // 活动的项
    };
  },
  created() {
  },
  methods: {
    itemClickHandle(item,index) {
      this.activeItem = index;
      this.$emit("navChange",item)
    },
  },
};
</script>

<style lang="scss">
.sideNavContainer {
    display: flex;
    width: 100%;
    height: 100%;
    ul{
        width: 100%;
        .sideNavItem{
            width: 100%;
        }
    }
  .navActive {
    background-color: rgb(83, 235, 227);
  }
}
</style>
<style scoped>
*{
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
}
</style>