<template>
  <transition name="modal">
    <div class="modal-mask" v-if="visible">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
           <!--  <a class="modal-button" v-tap="{methods:tapAgain}" @click="$emit('cancel')" style="background: #FFEB3B;">继续骑行</a>
            <a class="modal-button" v-tap="{methods:tapCancel}" @click="$emit('ok')">确定退出</a> -->
            <a class="modal-button" @click="tapAgain" style="background: #FFEB3B;">继续骑行</a>
            <a class="modal-button" @click="tapCancel">确定退出</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['visible'],
    methods:{
      tapAgain(){
         this.$emit('cancel')
      },
      tapCancel(){
        this.$emit('ok')
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import 'modal.scss';
</style>
