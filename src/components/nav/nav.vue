<template>
  <div class="nav">
    <div :class="['nav-item',navCurrent==0?'current':'']" @click="navClick(0)">
      <i class="nav-icon icon-tain"></i>
      <p class="nav-text">训练</p>
    </div>
    <div :class="['nav-item',navCurrent==1?'current':'']" @click="navClick(1)">
      <i class="nav-icon icon-challenge"></i>
      <p class="nav-text">挑战</p>
    </div>
    <div :class="['nav-item',navCurrent==2?'current':'']" @click="navClick(2)">
      <i class="nav-icon icon-firends"></i>
      <p class="nav-text">秀圈</p>
    </div>
    <div :class="['nav-item',navCurrent==3?'current':'']" @click="navClick(3)">
      <i class="nav-icon icon-mine"></i>
      <p class="nav-text">我的</p>
    </div>
  </div>
</template>
<script>
  export default {
      props:['navCurrent'],
      methods:{
        navClick(index){
          if(index===0){
            this.$router.push('/trainClass');
          }else if(index===1){
            this.$router.push('/challenge');
          }else if(index===2){
            this.$router.push('/friendsList');
          }else if(index===3){
            this.$router.push('/mine');
          }
        }
      }
  }
</script>
<style lang="sass" scoped>
  @import 'nav.scss';
</style>
