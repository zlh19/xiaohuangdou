<template>
  <div class="tc_class" :style="{ backgroundImage: `url(${value.img})`}">
    <div class="tc_title">{{value.lessonName}}</div>
    <div class="tc_desc">{{value.totaltimeDesc}} 分钟 {{value.calorie}} kcal</div>
  </div>
</template>
<script>
  export default {
    props: ['value'],
    filters:{
    	changetimer(timer){
    		return parseInt(timer/60)
    	}
    }
  }
</script>
<style lang="sass" scoped>
  @import 'classPanel.scss';
</style>
