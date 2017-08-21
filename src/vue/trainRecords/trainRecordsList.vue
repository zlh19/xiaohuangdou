<template>

	<!-- 列表信息 -->
	<div class="p-content" v-if="data.duration>0">
		<div class="p-cont-title">详细记录</div>
		<div class="p-list">
			<div v-for="(xitem,xindex) in data.list">
				<div class="p-list-title" v-if="state==4">{{xitem.year}}</div>
				<dl>
					<dt v-for="(yitem,yindex) in xitem.list">
						<div class="u-list-day">{{yitem.day}}</div>
						<p v-for="(zitems,zindexs) in yitem.list" class="u-text">{{zitems.courseName}}<span class="u-time"> {{zitems.duration | changeMinuteSeconds}}</span></p>
					</dt>
				</dl>
			</div>
		</div>
	</div>
	<!-- 无信息 -->
	<div class="p-null" v-else>
		<div class="p-null-cont">
			<i class="p-null-icon"></i>
			<p class="p-null-txt">您没有任何训练记录</p>
		</div>
	</div>
			
</template>
<script>
	import moment from 'moment'
	export default{
		props:['data','state'],
		data(){
			return{}
		},
		mounted(){},
		filters:{
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
		methods:{},
		components:{}
	}
</script>
<style lang="sass" scoped>
	@import 'trainRecords.scss';
</style>