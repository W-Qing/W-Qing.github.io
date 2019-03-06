<template>
  <div>
    <h2>{{quotation}}</h2>
  </div>
</template>
<script>
export default {
  name: 'Quotations',
  data(){
    return {
      quotation: ''
    }
  },
  mounted: function () {
    this.quotation = this.$site.themeConfig.quotations[0]
    let index = 0
    let timer = null
    clearInterval(timer)
    this.$nextTick(function () {
      timer = setInterval(()=>{
        if(index === this.$site.themeConfig.quotations.length -1 ){
          index = 0
        }else{
          index += 1
        }
        this.quotation = this.$site.themeConfig.quotations[index]
      },1000*15)
  })
}
}
</script>
<style lang="scss" scoped>
  
</style>