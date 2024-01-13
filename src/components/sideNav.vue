<template>
  <div class="sideNavContainer">
    <ul>
      <li
      class="sideNavItem"
        v-for="(item, index) in navItem"
        :key="index"
        :class="{ navActive: activeItem === index }"
        @click="itemClickHandle(index)"
      >{{item.functionName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   navItem: [], // 列表项
      activeItem: 0, // 活动的项
    };
  },
  props: {
      navItem: {
        type: Object,
        required: true,
      },
  },
  created() {
    console.log(this.$props.navItem);
  },
  methods: {
    itemClickHandle(index) {
      this.activeItem = index;
    },
  },
};
</script>

<style lang="scss">
.sideNavContainer {
    display: flex;
    width: 100%;
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