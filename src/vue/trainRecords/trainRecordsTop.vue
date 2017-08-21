<template>
		<!-- 头部信息 -->
		<div class="p-top">
			<!-- 头部内容 -->
			<div class="p-timer">
				<p class="u-number">{{data.duration | changeMinute}}</p>
				<p class="u-txt">训练时长（分钟）</p>
			</div>
			<!-- 具体内容 -->
			<div class="p-infor">
				<ul>
					<li>
						<div class="u-number">{{data.completeCount}}</div>
						<div class="u-text">完成次数</div>
					</li>
					<li>
						<div class="u-number">{{data.trainDays}}</div>
						<div class="u-text">训练天数</div>
					</li>
					<li>
						<div class="u-number">{{data.calorie}}</div>
						<div class="u-text">卡路里</div>
					</li>
				</ul>
			</div>
		</div>
</template>
<script>
	import moment from 'moment'
	export default{
		props:['data'],
		data(){
			return{

			}
		},
		mounted(){},
		filters:{
			// 秒转换分钟
			changeMinute(value){
				return (value*1/60).toFixed(0)
			}
		},
		methods:{},
		components:{}
	}
</script>
<style lang="sass" scoped>
	@import 'trainRecords.scss';
</style>