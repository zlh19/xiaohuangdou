<template>
  <div class="tb-page">
      <div class="tfb-page">
        <div class="tfb-header">
          <div class="tfb-kiloes">111</div>
          <div class="tfb-kiloes-desc">km</div>
        </div>
        
        <div class="tfb-params">
          <div class="tfb-param" style="width: 36%;">
            <div class="tfb-param-result">222</div>
            <div class="tfb-param-desc" style="left:4px;">速度（km/h）</div>
          </div>
          
          <div class="tfb-param" style="width: 32%;">
            <div class="tfb-param-result">333</div>
            <div class="tfb-param-desc" style="left:4px;">燃脂量（kcal）</div>
          </div>
          
          
          <div class="tfb-param" style="width: 32%;">
            <div class="tfb-param-result">1</div>
            <div class="tfb-param-desc">阻力</div>
          </div>
        </div>
        
        <div class="tfb-result">
          <div class="tfb-result-time">{{train.duration | changeTimer}}</div>
          <div class="tfb-result-desc">用时</div>
        </div>
        
        <div v-if="state === 3" style="padding-top: 32px;">
          <a class="tfb-button" @click="tapBegain">开始</a>
        </div>

        <div v-if="state === 4" style="padding-top: 32px;">
          <a class="tfb-button" @click="tapPause">暂停</a>
        </div>
        
        <div v-if="state === 5" style="padding-top: 61px;">
          <a class="tfb-button tfb-button-small" style="margin-right: 95px;" @click="tapAgain">继续</a>
          <press-button @longpress="confirmExit"><div>长按</div><div>结束</div></press-button>
        </div>
        
        <modal :visible="showModal" @cancel="showModal=false" @ok="tapOutTrainFree">
          <div slot="body">
            你这次训练时间太短了，无法保存。你真的尽力了吗？
          </div>
        </modal>
      </div>
  </div>
</template>
<script>
  // import moment from 'moment'
  import pressButton from '../../components/pressButton/pressButton.vue'
  import modal from '../../components/modal/modal.vue'
  
  export default {
    components: {
      // classPanel,
      pressButton,
      modal
    },
    data () {
      return {
        // 返回信息
        resData:{
          // 骑行
          bicycleIndexData:{
            categorys:[],
            distanceKm:'',
            haveBikeFlag:''
          }
        },
        train:{
          duration:0,
          startTime:0
        },
        state: 3, // state: 1 未扫码 ; 2 扫码成功，未开始骑行; 3 准备骑行; 4 骑行中; 5 骑行暂停
        minDuration:60,
        courseStatus:true,
        showModal: false
      }
    },
    filters:{
      changeTimer(value){
       
      }
    },
    mounted () {
      this.$nextTick(() => {

         
      })  
    },
    methods: {
      confirmExit() {
        if(this.train.duration<this.minDuration){
          this.showModal = true
        }else{
          
        }
      },
      // 提交数据
      submitData(callback){
          
      },
      // 弹出层退出
      tapOutTrainFree(){
         this.showModal=false;
         
         
      },
      // 开始按钮
      tapBegain(){
        this.renderBicycleData();
       
        this.train.startTime =new Date();
        this.state=4
      },
      // 继续
      tapAgain(){
        this.courseStatus=true;
        this.state=4
        this.renderBicycleData();
      },
      // 暂停
      tapPause(){
        clearInterval(this.bicycleTimer)
        this.courseStatus=false
        this.state=5
      },
      // 渲染内容
      renderBicycleData(){
        this.bicycleTimer=setInterval(()=>{
          if(!this.courseStatus){
            clearInterval(this.bicycleTimer)
          }
          this.train.duration+=1
        },1000)
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import 'freeBicycle.scss';
</style>
