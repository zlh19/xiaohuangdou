<template>
	<div id="trendsSelected">
		<!-- 主要内容 -->
		<div class="main">
			<div class="zang_list">
				<div class="u_item" v-for="(item,index) in resData.zangList">
					<div class="u_pic_outer" :style="{backgroundImage: `url(${item.headImg})`}"></div>
					{{item.nickname}}
				</div>
			</div>
	    </div>
	    <!-- 提示框 -->
	    <nv-tips></nv-tips>
	</div>
</template>
<script>
	import {sendUrl} from '../../router/send'
	import {switchLocalData} from '../../public/js/model'
	import nvTips from '../../components/tips/tips.vue'
	export default{
		data(){
			return{
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
				// 获取地址栏信息。渲染页面
				const localObj=switchLocalData(window.location.href)
				this.option.getFoodById.topicId=localObj.id
				this.getZangList(this.option.getFoodById)
			})
		},
		methods:{
			// 获取列表数据
			getZangList(data){
				this.Ajax({
					data:data,
					method:'get',
					url:sendUrl.dietTopic_likeList,
					success:(res)=>{
						if(res.code==1){
							this.resData.zangList=res.data.list
						}else{
							
						}
					}
				})
			}
	
		},
		components : {
			nvTips
        }
	}
</script>
<style lang="sass" scoped>
	@import 'trendsZangList.scss';
</style>