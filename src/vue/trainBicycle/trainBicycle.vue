<template>
  <div class="tb-page">
    <!-- 标题 -->
    <title-center :titleList="titleList"></title-center>
    <!-- 主要内容 -->
    <div class="main">
      <div class="tb-circle">
        <!-- 里程数 -->
        <div class="tb-kiloes">
          <div class="tb-desc">骑行里程（公里）</div>
          <div class="tb-result">{{resData.bicycleData.distanceKm | switchData}}</div>
        </div>
        <!-- 按钮切换 -->
        <div class="tb-buttons" v-if="state == 0">
          <a class="tb-button"  @click="scanClick(1)" style="width: 220px"><i></i><span>扫码骑单车</span></a>
        </div>
        <div class="tb-buttons" v-if="state == 1">
          <a class="tb-button tb-button-ghost" @click="scanClick(0)">断开连接</a>
          <a class="tb-button" style="margin-right: 15px;" @click="freeBicycleClick">自由骑行</a>
        </div>
      </div>
      <!-- 底部列表 -->
      <div class="tb-trains" v-for="(item, index) in resData.bicycleData.list" :key="index">
        <div class="tb-title">{{item.categoryName}}</div>
        <div class="tc_classes">
          <class-panel :value="items" v-for="(items,index) in item.lesson" :key="items.id"></class-panel>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <nav-menu navCurrent="0"></nav-menu>
  </div>
</template>
<script>
  import axios from 'axios'
  import titleCenter from '../../components/titleCenter/titleCenter.vue'
  import classPanel from '../../components/classPanel/classPanel.vue'
  import navMenu from '../../components/nav/nav.vue'
  
  export default {
    components: {
      classPanel,
      navMenu,
      titleCenter
    },
    data () {
      return {
        // 标题
        titleList:[{
          name:'课程',
          link:'/trainClass',
          current:false
        },{
          name:'动感单车',
          link:'/trainBicycle',
          current:true
        }],
        // 返回信息
        resData:{
          // 骑行
          bicycleData:{
            distanceKm:'',
            list:[]
          }
        },
        state: 0, // state: 1 未扫码 ; 2 扫码成功，未开始骑行;
      }
    },
    filters:{
      // 过滤公里数
      switchData(data){
        if(data==0){
          const newdata='0.0'
          return newdata
        }else{
          return data/1000
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getBicycleData()
      })  
    },
    methods: {
      // 获取单车信息
      getBicycleData(){
        axios.get('/json/trainBicycle.json')
            .then((res)=>{
              this.resData.bicycleData=res.data.bicycleData
            })
            .catch((error)=>{
            
            })
      },
      // 扫描二维码
      scanClick(value){
        this.state=value
      },
      // 自由骑行点击
      freeBicycleClick(){
        this.$router.push('/freeBicycle');
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import 'trainBicycle.scss';
</style>
