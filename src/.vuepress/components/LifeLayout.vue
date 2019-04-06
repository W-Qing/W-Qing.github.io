<template>
  <div class="life-layout">
    <!-- .main-div is the block with white background -->
    <div class="main-div">
      <header>
        <h1>{{slogan}}</h1>
      </header>
      <!-- <Content /> is to show the rendered markdown content of this page -->
      <!-- Contents here will be rendered in the `<Content />` component. -->
      <Content/>
    </div>
  </div>
</template>

<script>
export default {
  name: "LifeLayout",
  data(){
    return {
      slogan: "Blog to live, don't live to blog."
    }
  },
  mounted(){
    this.slogan = this.$frontmatter.slogan
  }
}
</script>
<style lang="scss" scoped>
.main-div {
  min-height: 800px;
}
</style>