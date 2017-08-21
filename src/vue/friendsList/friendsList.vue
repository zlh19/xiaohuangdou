<template>
	<div id="friendsList">
		<!-- 主要内容 -->
		<div class="main">
			<div class="m_list">
		          <ul class="clearfix">
		            <li v-for="(item,index) in resData.topic" @click="itemClick(item.id)">
		              <!-- <div class="p_pic_wrap" :style="{backgroundImage: `url(${item.img})`}"></div> -->
		              <div class="p_pic_wrap"><img v-lazy="item.img" class="load-img"></div>
		              <div class="p_title">{{item.memo}}</div>
		              <div class="p_infor">
		              	<!-- 用户信息 -->
		                <div class="u_user">
		                	<i :style="{'background-image':'url('+item.headImg+')'}"></i><span>{{item.userNickname}}</span>
		                </div>
		                <!-- 点赞 -->
		                <div :class="['u_zang',(item.selfLike==1)?'current':'']">
		                  <i></i><span class="submitBtnClickFun">{{item.likeCount}}</span>
		                </div>
		              </div>
		            </li>
		          </ul>
        	</div>
	    </div>
	    <!-- 底部导航 -->
	    <nav-menu navCurrent="2"></nav-menu>

	</div>
</template>
<script>
	import axios from 'axios'
	import navMenu from '../../components/nav/nav.vue'

	export default{
		components : {
			navMenu
        },
		data(){
			return{
				resData:{
					topic:[]
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// 获取列表数据
				this.getFriendsList()
			})
		},
		methods:{
			// 获取数据
			getFriendsList(data,loading){
				// 获取数据
				axios.get('/json/friendsList.json')
				  	.then((res)=>{
				  		this.resData.topic=res.data.list
				  	})
				  	.catch((error)=>{
						
				  	})
			},
			// 点击内容
			itemClick(id){
				this.$router.push(`/friendsDetail?id=${id}`)
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import 'friendsList.scss';
</style>
<style>
.load-img[lazy='loading'] {
  background:#ddd;
}
</style>