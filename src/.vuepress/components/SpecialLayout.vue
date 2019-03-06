<template>
  <div class="special">
    <Content
      :key="$page.path"
    />
  </div>
</template>
<script>
export default {
  name: 'SpecialLayout'
}
</script>
<style lang="css" scoped>
  .special {
    min-height: 500px;
  }
</style>