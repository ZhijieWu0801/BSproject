<template>
  <div class="layOutContainer">
    <div class="layOutLeft">
        <slot name="left"></slot>
    </div>
        <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.layOutContainer{
  display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100%;
  .layOutLeft{
    border: 2px solid red;
    flex: 0 1 auto;
  }
  .layOutRight{
    border: 2px solid blue;
    flex: 1 1 auto;
  }
}

</style>