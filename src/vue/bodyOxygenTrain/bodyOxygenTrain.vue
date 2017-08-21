<template>
	<div id="trendsSelected">
		<!-- 主要内容 -->
		<div class="main">
			<!-- 头部信息 -->
			<div class="p-top">
				<p>选择适合你的</p>
				<p>全身有氧燃脂训练</p>
				<i class="u-icon" v-tap="{methods:tapInfor}"></i>
			</div>
			<!-- 列表信息 -->
			<div class="p-list">
				<dl>
					<dt :style="{backgroundImage:`url(${item.img})`}" v-tap="{methods:tapItem,item:item}" v-for="(item,index) in bodyOxygenTrainData">
						<div class="p-title">{{item.lessonName}}</div>
						<div class="p-deltail">{{item.desc}}</div>
						<div class="p-bottom">{{item.joinUserCount}}人已训练</div>
					</dt>
				</dl>
			</div>
	    </div>
	    <!-- 弹出层 -->
	    <div class="p-dialog-main" v-if="inforDialog">
	    	<div class="p-dialog-wrap">
	    		<div class="p-dialog-img"></div>
	    		<i class="u-dialog-close" v-tap="{methods:tapCloseDialog}"></i>
	    	</div>
	    	<div class="p-dialog-title">有氧燃脂训练</div>
	    	<div class="p-dialog-cont">
	    		<p>有氧减脂效果远远好于无氧。因为有氧能连续半小时甚至一小时以上。无氧你试试看，就算是大神，一小时无氧力量训练也是做几个就休息的。</p>
	    		<p>但有氧的减脂不长久，一旦停就反弹。无氧增肌，能增大消耗，能维持更久。极端的例子，那些肌肉男就算躺着也比瘦子走路消耗更多热量。</p>
	    	</div>
	    </div>
	</div>
</template>
<script>
	import {sendUrl} from '../../router/send'
	// import {switchLocalData} from '../../public/js/model'
	import nvTips from '../../components/tips/tips.vue'
	export default{
		data(){
			return{
				inforDialog:false,
				bodyOxygenTrainData:[],
				option:{
					getFoodById:{}
				},
				resData:{
					zangList:[]
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// 获取数据，并且保存
				const bodyOxygenTrainData=localStorage.getItem('bodyOxygenTrainData')
				this.bodyOxygenTrainData=JSON.parse(bodyOxygenTrainData);
			})
		},
		methods:{
			tapInfor(){
				this.inforDialog=true;
			},
			tapCloseDialog(){
				this.inforDialog=false;
			},
			tapItem(data){
				const deviceType=data.item.deviceType;
				const id=data.item.id;
				if(deviceType==1){
					jsBridge.pageHref('beginSport.html')
				}else{
					jsBridge.goActionListActivity(id)
				}
			}
		},
		components : {
			nvTips
        }
	}
</script>
<style lang="sass" scoped>
	@import 'bodyOxygenTrain.scss';
</style>