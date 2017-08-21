<template>
	<div id="trainRecords" :class="['main',bodyHasNullClass]">
		<!-- 标题 -->
		<div class="p-title">
			<ul :class="[titleState==2?'center':'']">
				<li :class="[titleState==1?'current':'']" v-tap="{methods:tapNav,item:1}">周</li>
				<li :class="[titleState==2?'current':'']" v-tap="{methods:tapNav,item:2}">月</li>
				<li :class="[titleState==4?'current':'']" v-tap="{methods:tapNav,item:4}">总</li>
			</ul>
		</div>
		<!-- 周 -->
		<div class="p-main" v-if="titleState==1">
			<!-- 头部信息 -->
			<trainRecords-top :data="ajaxData.weekData"></trainRecords-top>
			<!-- 列表信息 -->
			<trainRecords-list :data="ajaxData.weekData" :state="titleState"></trainRecords-list>
		</div>
		<!-- 月 -->
		<div class="p-main" v-if="titleState==2">
			<!-- 头部信息 -->
			<trainRecords-top :data="ajaxData.monthData"></trainRecords-top>
			<!-- 列表信息 -->
			<trainRecords-list :data="ajaxData.monthData" :state="titleState"></trainRecords-list>
		</div>
		<!-- 年 -->
		<div class="p-main" v-if="titleState==4">
			<!-- 头部信息 -->
			<trainRecords-top :data="ajaxData.totalData"></trainRecords-top>
			<!-- 列表信息 -->
			<trainRecords-list :data="ajaxData.totalData" :state="titleState"></trainRecords-list>
		</div>
	</div>

</template>
<script>
	import trainRecordsTop from './trainRecordsTop.vue'
	import trainRecordsList from './trainRecordsList.vue'
	import {sendUrl} from '../../router/send'
	import moment from 'moment'
	export default{
		components:{
			trainRecordsTop,
			trainRecordsList
        },
		data(){
			return{
				// 周1 月2 总4
				titleState:1,
				bodyHasNullClass:'null',
				// 返回信息
				ajaxData:{
					weekData:{
						'state':1,
						'isClick':false,
						'duration': 0,
				        'calorie': 0,
				        'completeCount': 0,
				        'trainDays': 0,
				        'list': [],
				        'endTime':''
					},
					monthData:{
						'state':2,
						'isClick':false,
						'duration': 0,
				        'calorie': 0,
				        'completeCount': 0,
				        'trainDays': 0,
				        'list': [],
				        'endTime':''
					},
			        totalData:{
			        	'state':4,
			        	'isClick':false,
			        	'duration': 0,
				        'calorie': 0,
				        'completeCount': 0,
				        'trainDays': 0,
				        'list': [],
				        'endTime':''
			        }
				}
			}
		},
		mounted(){
			// 显示标题
	        jsBridge.setShowNav({
	          isShow:true,
	          title:'训练记录'
	        })

	        // 关闭下拉刷新
	        jsBridge.whetherToRefresh(false)

			// 开启加载更多
			jsBridge.whetherToLoadMore(true)

			// 加载更多android
			window.showLoadMore=()=>{
				this.loadMore()
			}

			// 加载更多IOS
	        jsBridge.callback_action.showLoadMore=()=>{
				this.loadMore()
	        }

			// 获取记录请求
			this.getTrainRecordsData({
				beginTime:'',
				type:this.titleState
			})


			
		},
		filters:{
			// 秒转换分钟
			changeMinute(value){
				return (value*1/60).toFixed(0)
			},
			// 转化分秒
			changeMinuteSeconds(value){
				let minute,seconeds,totalTimer;
				if(value>=60){
					if(value % 60 == 0){
						minute = parseInt(value/60); 
						totalTimer=minute+'分钟'
					}else{
						minute = parseInt(value/60); 
						seconeds = parseInt(value%60);
						totalTimer=minute+'分'+seconeds+'秒'
					}
				}else{
					seconeds = parseInt(value%60);
					totalTimer=seconeds+'秒'
				}
				return totalTimer
			}
		},
		methods:{
			bodyHasNullClassData(){
				if(this.titleState==1&&this.ajaxData.weekData.duration>0){
					this.bodyHasNullClass=''
					jsBridge.loadMoreBegining()
				}else if(this.titleState==2&&this.ajaxData.monthData.duration>0){
					this.bodyHasNullClass=''
					jsBridge.loadMoreBegining()
				}else if(this.titleState==4&&this.ajaxData.totalData.duration>0){
					this.bodyHasNullClass=''
					jsBridge.loadMoreBegining()
				}else{
					this.bodyHasNullClass='null'
					jsBridge.loadMoreEnding()
				}
			},
			// 导航点击
			tapNav(data){
				const item=data.item
				this.titleState=item

				
				if(!this.ajaxData.weekData.isClick&&this.ajaxData.weekData.state==item){
					this.getTrainRecordsData({
						beginTime:'',
						type:this.titleState
					})
				}
				if(!this.ajaxData.monthData.isClick&&this.ajaxData.monthData.state==item){
					this.getTrainRecordsData({
						beginTime:'',
						type:this.titleState
					})
				}
				if(!this.ajaxData.totalData.isClick&&this.ajaxData.totalData.state==item){
					this.getTrainRecordsData({
						beginTime:'',
						type:this.titleState
					})
				}
				this.bodyHasNullClassData()
				
			},
			// 加载更多
			loadMore(){

				if(this.titleState==1){
					// 获取记录请求
					this.getTrainRecordsData({
						beginTime:this.ajaxData.weekData.endTime,
						type:this.titleState
					},false)
				}else if(this.titleState==2){
					// 获取记录请求
					this.getTrainRecordsData({
						beginTime:this.ajaxData.monthData.endTime,
						type:this.titleState
					},false)
				}else{
					// 获取记录请求
					this.getTrainRecordsData({
						beginTime:this.ajaxData.totalData.endTime,
						type:this.titleState
					},false)
				}
				
			},
			// 获取记录请求
			getTrainRecordsData(data,loading){

				jsBridge.close_pull_up();
				this.Ajax({
					data:data,
					loading:loading,
					method:'get',
					url:sendUrl.sport_getSportStatistics,
					success:(res)=>{
						if(res.code==1){
							// 判断是否加载过
							this.renderRecordsClick()
							// 判断是更多数据
							if(res.data.endTime!=null){
								this.renderTrainRecords(res.data,data.beginTime)
							}else{
								jsBridge.loadMoreEnding()
							}
						}
					}
				})
			},
			renderRecordsClick(){
				if(this.titleState==1){
					this.ajaxData.weekData['isClick']=true;
				}else if(this.titleState==2){
					this.ajaxData.monthData['isClick']=true;
				}else{
					this.ajaxData.totalData['isClick']=true;
				}
				
			},
			// 渲染总内容
			renderTrainRecords(data,beginTime){
				if(this.titleState==1){
					// 第一次来又数据records数据
					if(!beginTime){
						this.renderTopRecords(this.ajaxData.weekData,data)
					}
					
					const switchData=this.switchAjaxData(data.list,this.ajaxData.weekData.list)
					const mergeData=this.mergeRecordsData(switchData)
					this.ajaxData.weekData.list=mergeData

				}else if(this.titleState==2){
					if(!beginTime){
						this.renderTopRecords(this.ajaxData.monthData,data)
					}
					const switchData=this.switchAjaxData(data.list,this.ajaxData.monthData.list)
					const mergeData=this.mergeRecordsData(switchData)
					this.ajaxData.monthData.list=mergeData
				}else{
					if(!beginTime){
						this.renderTopRecords(this.ajaxData.totalData,data)
					}
					const switchData=this.switchAjaxData(data.list,this.ajaxData.totalData.list)
					const mergeData=this.mergeRecordsData(switchData)
					this.ajaxData.totalData.list=mergeData
				}
			},
			// 渲染头部信息
			renderTopRecords(recordsObj,data){
				recordsObj['duration']=data.duration;
				recordsObj['calorie']=data.calorie;
				recordsObj['completeCount']=data.completeCount;
				recordsObj['trainDays']=data.trainDays;
				recordsObj['endTime']=moment(data.endTime).format('YYYY-MM-DD');
				// 是否到最后
				this.bodyHasNullClassData()
				
			},
			// 数据转化
			switchAjaxData(data,initData){
				const newRecordsArr=[...initData]
				data.forEach((item,index)=>{
					const newReocrdsObj={
						year:'',
						list:[]
					}

					const dayObj={
						day:'',
						list:[]
					}

					const listObj={
						ctime:'',
						duration:'',
						courseName:''
					}

					newReocrdsObj.year=moment(item.ctime).format('YYYY');
					dayObj.day=moment(item.ctime).format('YYYY-MM-DD');
					listObj.ctime=item.ctime
					listObj.duration=item.duration
					listObj.courseName=item.courseName

					dayObj.list.push(listObj)
					newReocrdsObj.list.push(dayObj)
					newRecordsArr.push(newReocrdsObj)

				})
				
				return newRecordsArr
			},
			// 数据合并
			mergeRecordsData(data){
				const mergeArr=[];
				data.forEach((item,index)=>{
					const lastYearItem=mergeArr[mergeArr.length-1]||{}
					if(lastYearItem.year==item.year){
						item.list.forEach((items,indexs)=>{
							const lastDayItem=lastYearItem.list[lastYearItem.list.length-1]||{}
							if(lastDayItem.day==items.day){
								lastDayItem.list=[...lastDayItem.list,...items.list]
							}else{
								lastYearItem.list.push(items)
							}
						})
						
					}else{
						mergeArr.push(item)
					}
				})
				return mergeArr
			}
	
		}
	}
</script>
<style lang="sass" scoped>
	@import 'trainRecords.scss';
</style>