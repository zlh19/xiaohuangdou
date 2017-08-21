<template>
  <div class="nav" v-if="isShow">
    <a href="javascript:;" class="nav-back" @click="backClick"></a>
    <span class="nav-title">{{titleText}}</span>
    <slot></slot>
  </div>
</template>
<script>
  export default {
      props:['isShow','titleText'],
      methods:{
        backClick(){
          this.$router.go(-1)
        }
      }
    
  }
</script>
<style lang="sass" scoped>
  @import 'title.scss';
</style>
