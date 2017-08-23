<template>
  <div id="trainList">
    <!-- 标题 -->
    <title-center :titleList="titleList"></title-center>
    <!-- 内容 -->
    <div class="main">
      <div class="p-main">
        <div class="tt_type" v-for="(item, index) in resData.list" :key="index">
          <div class="tt_title">{{item.categoryName}}</div>
          <div class="tc_classes">
            <class-panel :value="items" v-for="(items,index) in item.lesson" :key="items.id"></class-panel>
          </div>
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
        titleList:[{
          name:'课程',
          link:'/trainClass',
          current:true
        },{
          name:'动感单车',
          link:'/trainBicycle',
          current:false
        }],
        resData:{
          list:[]
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getTrainList()
      })
    },
    methods: {
      getTrainList(){
				axios.get('/json/trainList.json')
            .then((res)=>{
              this.resData.list=res.data.list
            })
            .catch((error)=>{
            
            })

        axios.post('/createUser',{
          name:'test',
          telephone:'13738052554',
          password:'123456'
        })
            .then((res)=>{
              console.log(res)
            })
            .catch((error)=>{
            
            })
			}
    }
  }
</script>
<style lang="sass" scoped>
  @import 'trainClass.scss';
</style>
