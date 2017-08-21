<template>
  <div>
    <div class="tc-header" id="headerTop">
      <div class="zan-img" src="/build/static/zan.png"></div>
      <div class="tc-header-cong">恭喜你完成</div>
      <div class="tc-header-title">动感单车{{kiloes | switchKiloes}}公里骑行</div>
      
      <div class="tc-result" style="left: 52.5px;text-align:left;">
        <div class="tc-result-num">{{calorie | switchCalorie}}cal</div>
        <div class="tc-result-desc">燃脂</div>
      </div>
      
      <div class="tc-result" style="right: 25px;text-align:right;">
        <div class="tc-result-num">{{duration | changetimer}}</div>
        <div class="tc-result-desc">时间</div>
      </div>
    </div>
    
    <div class="tc-body">
      <div class="tc-question">感受如何？</div>
      <div class="tc-tip">未来的课程强度会根据你的体感反馈作一些调整</div>
      <div class="tc-stars">
        <div class="tc-star">
          <div v-if="selected===1" class="tc-emoji bg-1 active" src="/build/static/emoji-a-active.png" v-tap="{methods:tapSelectIcon,item:1}"></div>
          <div v-else class="tc-emoji bg-1" src="/build/static/emoji-a.png" v-tap="{methods:tapSelectIcon,item:1}"></div>
          <div class="tc-emoji-desc">轻松</div>
        </div>
        
        <div class="tc-star">
          <div v-if="selected===2" class="tc-emoji bg-2 active" src="/build/static/emoji-d-active.png" v-tap="{methods:tapSelectIcon,item:2}"></div>
          <div v-else class="tc-emoji bg-2" src="/build/static/emoji-d.png" v-tap="{methods:tapSelectIcon,item:2}"></div>
          <div class="tc-emoji-desc">刚刚好</div>
        </div>
        
        <div class="tc-star">
        
          <div v-if="selected===3" class="tc-emoji bg-3 active" src="/build/static/emoji-b-active.png" v-tap="{methods:tapSelectIcon,item:3}"></div>
          <div v-else class="tc-emoji bg-3" src="/build/static/emoji-b.png" v-tap="{methods:tapSelectIcon,item:3}"></div>
          <div class="tc-emoji-desc">有挑战</div>
        </div>
        
        <div class="tc-star">
          <div v-if="selected===4" class="tc-emoji bg-4 active" src="/build/static/emoji-c-active.png" v-tap="{methods:tapSelectIcon,item:4}"></div>
          <div v-else class="tc-emoji bg-4" src="/build/static/emoji-c.png" v-tap="{methods:tapSelectIcon,item:4}"></div>
          <div class="tc-emoji-desc">很吃力</div>
        </div>
      </div>
    </div>
    
    <div class="tc-button-container">
      <a href="javascript:;" class="tc-button" v-tap="{methods:tapSubmit}">确定</a>
    </div>

    <!-- 提示框 -->
    <nv-tips></nv-tips>
  </div>
</template>
<script>
  import moment from 'moment'
  import {switchLocalData} from '../../public/js/model'
  import {sendUrl} from '../../router/send'
  import nvTips from '../../components/tips/tips.vue'
  
  export default {
    components:{
      nvTips
    },
    data () {
      return {
        option:{
          sendData:{
            lessonId:'',
            calorie:'',
            duration:'',
            completeFlag:''
          }
        },
        lessonId:'0',
        kiloes: 0,
        calorie:0,
        submitState:true,
        duration:0,
        selected:0
      }
    },
    filters:{
      changetimer(value){
        return moment.utc(value*1000).format("HH:mm:ss")
      },
      switchCalorie(value){
        return value.toFixed(2)
      },
      switchKiloes(value){
        return value.toFixed(2)
      }
    },
    mounted () {
      this.$nextTick(()=>{
        // 获取地址栏信息。渲染页面
        const localObj=switchLocalData(window.location.href)
        
        this.lessonId=localObj.sportUseId
        this.calorie=localObj.calorie*1000
        this.kiloes=localObj.kiloes*1
        this.duration=localObj.duration
        this.completeFlag=localObj.completeFlag
        
        
        // 隐藏标题
        jsBridge.setShowNav({
          isShow:false,
          title:''
        })


      })  
    },
    methods: {
      tapSelectIcon(data){
        this.selected = data.item
      },
      // 上传
      tapSubmit(){
        if(!this.submitState){
          return
        }
        const data={
          id:this.lessonId,
          trainFeel:this.selected
        }
        // if(this.selected==0){
        //   this.$store.dispatch('aSetShowTips',true)
        //   this.$store.dispatch('aSetShowTipsContent','您还没有选择感受')
        //   return
        // }

        this.submitState=false
        // 请求内容
        this.Ajax({
          data:data,
          method:'post',
          url:sendUrl.lesson_uploadLessonFeel,
          success:(res)=>{
            if(res.code==1){
              const headerTop=$('#headerTop').height()
              jsBridge.getWebViewHeight(headerTop)
              jsBridge.testUrl()
              if(typeof androidClient != "undefined" ){
                jsBridge.pageHref('/#/trainPublish')
                jsBridge.finishWebViewShowActivity()
              }
              this.submitState=true
            }
          },
          error:(res)=>{
            this.submitState=true
          }
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import 'trainFreeBicycleComplete.scss';
</style>

