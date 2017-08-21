<template>
	<div id="trendsNewest">
		<div class="main">
			<div class="m_list">
	          <dl>
	            <dt v-for="(item,index) in resData.topic">
	             <div class="p_top p_top_user">
		              <!-- 用户信息 -->
	              	  <div class="p_user">
						<!-- 用户信息 -->
				        <div class="p_user_top">
				          <div class="u_pic_outer" :style="{'background-image':`url(${item.headImg})`}"></div>
				          <div class="u_text" v-tap="{methods:tapSelectedDetail,item:item}">
				            <div class="u_name">{{item.userNickname}}</div>
				            <div class="u_time">{{item.timeMemo}}</div>
				          </div>
				        </div>
				      </div>
	              </div>
	              <!-- banner -->
				  <div class="p_top_pic" v-tap="{methods:tapSelectedDetail,item:item}">
					<!-- 列表 -->
			        <swiper :options="swiperOption" ref="mySwiper">
						<!-- 幻灯内容 -->
						<swiper-slide v-for="(items,index) in item.imgs">
						 <div class="banner-img" :style="{'background-image':`url(${items})`}"></div>
					   	</swiper-slide>
						<div class="swiper-pagination" slot="pagination" v-show="item.imgs.length>1"></div>
					</swiper>
				  </div>
				    <!-- 标题 -->
		           <div class="p_title" v-tap="{methods:tapSelectedDetail,item:item}" v-if="!item.memo?false:true">{{item.memo}}</div>
	              <!-- 图片 -->
	              <div class="p_top">
		              <!-- 用户信息 -->
	              	  <div class="p_user">
						<!-- 用户信息 -->
				        <div class="p_user_top">
				          <!-- 其他 -->
					      <div class="p_user_other">
					          <span v-tap="{methods:tapZang,item:item}" :class="['u-user-zang',(item.selfLike==1)?'current':'']"><i class="u-icon-zang"></i><em>{{item.likeCount}}</em></span>
					          <span class="u-user-comment" v-tap="{methods:tapSelectedDetail,item:item}"><i class="u-icon-comment"></i><em>{{item.commentCount}}</em></span>
					      </div>
				        </div>
						
				      </div>
	              </div>
	            </dt>

	          </dl>
	        </div>
	        <!-- 提示框 -->
	    	<nv-tips></nv-tips>
	    </div>
	</div>
</template>
<script>
	import {sendUrl} from '../../router/send'
	import nvTips from '../../components/tips/tips.vue'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default{
		data(){
			return{
				// 切换swiper
				swiperOption: {
					name: 'currentSwiper',
					autoplay:0,
					loop:false,
					pagination:'.swiper-pagination',
					onSlideChangeEnd(swiper){}
		        },
				option:{
					topic:{
						page:1,
						pagSize:3,
						isLast:1
					}
				},
				resData:{
					topic:[]
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// 开启加载更多
				jsBridge.whetherToLoadMore(true)

				// 加载更多android
				window.showLoadMore=()=>{
					this.option.topic.page+=1;
					this.getSelectedList(this.option.topic,false)
				}

				// 加载更多IOS
		        jsBridge.callback_action.showLoadMore=()=>{
		            this.option.topic.page+=1;
					this.getSelectedList(this.option.topic,false)
		        }

				// 判断跳转
		        jsBridge.callback_action.linkTrendSelected=()=>{
		             this.$router.push(`/trendsSelected`)
		        }

		        // 刷新页面
		        jsBridge.callback_action.refreshTrendsNewest=()=>{
		        	this.resData.topic=[]
		            this.getSelectedList(this.option.topic)
		        }

				// 获取列表页
				this.getSelectedList(this.option.topic)
				
			})
		},
		methods:{
			// 获取列表数据
			getSelectedList(data,loading){
				this.Ajax({
					data:data,
					loading:loading,
					method:'get',
					url:sendUrl.dietTopic_newSearchTopic,
					success:(res)=>{
						if(res.code==1){
							this.resData.topic=[...this.resData.topic,...res.data.topic];
							jsBridge.close_pull_up();
						}else{

						}
					}
				})
			},
			// 进入详情点击
			tapSelectedDetail(data){
				if(typeof androidClient != "undefined" ){
					jsBridge.toTrendsDetailActivity(`/#/trendsDetail?id=${data.item.id}`)
				}else{
					jsBridge.toTrendsDetailActivity(`/#/trendsDetail?id=${data.item.id}`)
				}
			},
			// 点赞+1
			getZangData(data){
				this.Ajax({
					data:data,
					method:'post',
					url:sendUrl.dietTopic_like,
					success:(res)=>{
						if(res.code==1){
							// 成功
							this.resData.topic.forEach((item,index)=>{
								if(item.id==data.topicId){
									// 未点赞
									const likeCount=item.likeCount+1;
									this.$set(item,'likeCount',likeCount);
									this.$set(item,'selfLike',1);
									// 弹出层
									this.$store.dispatch('aSetShowTips',true)
									this.$store.dispatch('aSetShowTipsContent','点赞成功')
								}
							})
						}else{
							// 失败

						}
					}
				})
			},
			// 点赞
			tapZang(data){
				const dataId=data.item.id;
				const selfLike=data.item.selfLike;

				if(selfLike==1){
					// 点过赞
					this.$store.dispatch('aSetShowTips',true)
					this.$store.dispatch('aSetShowTipsContent','您已经点过赞了')
				}else{
					//未点赞
					this.getZangData({
						topicId:dataId
					})
				}

			}
	
		},
		components : {
			nvTips
        }
	}
</script>
<style lang="sass" scoped>
	@import 'trendsNewest.scss';
</style>
<style lang="sass">
	.swiper-container {height:100%;}
	.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{top:auto;bottom:12px;font-size:0;}
	.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{margin:0 3px;}
	.swiper-pagination-bullet{opacity: 0.8;background:#D8D8D8;}
	.swiper-pagination-bullet-active{background:#FFEB3B!important;}
	.swiper-pagination-bullet{width:6px;height:6px;}
</style>
