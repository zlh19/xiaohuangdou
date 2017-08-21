<template>
	<div id="trendsDetail" class="main">
		  <top-title isShow="true" titleText="标题"></top-title>
		  <!-- banner -->
		  <div class="p_top">
		  	<mt-swipe :auto="0" :prevent="true">
			  <mt-swipe-item v-for="(item,index) in resData.publishImgs" :key="index" :style="{'background-image':`url(${item})`}"></mt-swipe-item>
			</mt-swipe>
		  </div>
		  <!-- 用户 -->
	      <div class="p_user">
	        <div class="p_user_top">
	          <div class="u_pic_outer" :style="{'background-image':`url(${resData.userHeadImg})`}"></div>
	          <div class="u_text">
	            <div class="u_name">{{resData.userName}}</div>
	            <div class="u_time">{{resData.publishTime}}</div>
	          </div>
	        </div>
	        <!-- 详细内容 -->
	        <div class="p_user_del">{{resData.userPublishContent}}</div>
	      </div>
	      <!-- 点赞列表 -->
	      <div class="p_zang_list">
	        {{resData.likeCount}}赞
	        <div class="u_zang_infor">
	            <i class="u_zang_item" :style="{'z-index':index,'background-image':`url(${item})`}" v-for="(item,index) in resData.likeHeadImgs"></i>
	            <i class="u_zang_more" style="z-index:100;visibility:hidden"></i>
	        </div>
	        <!-- 点赞 -->
	        <span :class="['u-user-zang',(resData.selfLike==1)?'current':'']"><i class="u-icon-zang"></i></span>
	      </div>
	      <!-- 评论 -->
	      <div class="p_comment_title">{{resData.commentCount}}评论</div>
	      <div class="p_comment_list">
	        <div class="u_comment_item" v-for="(item,index) in resData.comment">
	          <!-- 回复 -->
	          <div class="u_feedback"><input type="text" class="u_ipt" id="" disabled="disabled"></div>
	          <!-- 回复头像 -->
	          <div class="u_pic_outer" :style="{'background-image':`url(${item.userHeadImg})`}"></div>
	          <!-- 回复信息 -->
	          <div class="u_text">
	            <div class="u_name">{{item.userName}}</div>
	            <div class="u_time">{{item.commentTime}}</div>
	            <div class="u_feedback_infor" v-if="item.commentInfor.replyName" v-for="(items,index) in item.commentInfor"><span>回复<em>{{item.replyName}}</em>{{item.commentText}}</span></div>
	            <div class="u_feedback_infor" v-else>{{item.commentText}}</div>
	          </div>
	        </div>
	      </div>
	</div>
</template>
<script>
	import {switchLocalData} from '../../public/js/model'
	import topTitle from '../../components/title/title.vue'
	import axios from 'axios'
	import { Swipe, SwipeItem } from 'mint-ui';

	export default{
		components:{
			topTitle,
			Swipe,
			SwipeItem
        },
		data(){
			return{
		        resData:{

		        }
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// 获取列表数据
				this.getSelectedList()
			})
		},
		methods:{
			getSelectedList(data,loading){
				// 获取数据
				axios.get('/json/friendsDetail.json')
				  	.then((res)=>{
				  		this.resData=res.data
				  	})
				  	.catch((error)=>{
						
				  	})
			}
		}
	}
</script>
<style lang="sass" scoped>
	@import 'friendsDetail.scss';
</style>
<style>
	.mint-swipe-indicator.is-active{
		opacity:0.8
	}
</style>

