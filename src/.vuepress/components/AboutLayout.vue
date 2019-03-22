<template>
  <div class="about-layout">

    <!-- .main-div is the block with white background -->
    <div class="main-div">
      <header>
         <h1>嘿! 欢迎来到我的Blog</h1>
        <div class="music">
          <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22664257&auto=1&height=66"></iframe>
        </div>
      </header>
      <!-- <Content /> is to show the rendered markdown content of this page -->
      <!-- Contents here will be rendered in the `<Content />` component. -->
      <Content />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutLayout',
}
</script>
<style lang="scss" scoped>
  .main-div {
    min-height: 500px;
    header {
      height: 86px;
      text-align: center;
      h1 {
        display: inline-block;
      }
      .music {
        float: right;
      }
      
    }
  }
</style>