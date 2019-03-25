<template>
  <div class="Blank-layout">
    <!-- .main-div is the block with white background -->
    <div class="main-div">
      <!-- <Content /> is to show the rendered markdown content of this page -->
      <!-- Contents here will be rendered in the `<Content />` component. -->
      <Content/>
    </div>
  </div>
</template>

<script>

export default {
  name: "BlankLayout"
}
</script>
<style lang="scss" scoped>
.main-div {
  min-height: 800px;
}
</style>