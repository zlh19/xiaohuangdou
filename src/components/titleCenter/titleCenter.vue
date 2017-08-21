<template>
    <div class="title-center">
      <div class="title-wrap">
        <span v-for="(item,index) in titleList" :class="['title-item',item.current?'current':'']" @click="linkClick(item.link)">{{item.name}}</span>
      </div>
    </div>
</template>
<script>
  export default {
      props:['titleList'],
      methods:{
        linkClick(value){
          this.$router.push(value)
        }
      }
    
  }
</script>
<style lang="sass" scoped>
  @import 'titleCenter.scss';
</style>
