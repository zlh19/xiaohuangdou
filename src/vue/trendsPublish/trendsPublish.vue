<template>
	<div id="trendsSelected">
		<!-- 主要内容 -->
		<div class="main">
			<div class="p-main">
				<div class="p-title" v-if="true"></div>
				<div class="p-textarea">
					<textarea rows="6" class="p-text" v-model="publishText" placeholder="分享你的汗水和感受，我们一起见证吧"></textarea>
				</div>
				<!-- 新增内容 -->
				<div class="p-pic-list">
					<!-- 新增 -->
					<div class="p-pic-wrap">
						<ul class="clearfix">
							<li class="pic-item" v-for="(item,index) in photoList" v-tap="{methods:tapPhotos,index:index}">
								<div class="u-pic-wrap"><img :src="'data:image/jpeg;base64,'+item.photo"></div>
							</li>
							<li>
								<!-- 添加 -->
								<div class="p-pic-add-btn" v-tap="{methods:tapAddPhoto}" v-if="photoList.length<9"></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 发布成功 -->
			<div class="dialog-publish-success" v-if="dialogState">
				<div class="dialog-wrap">
					<div class="dialog-icon-wrap"><i class="dialog-icon icon-success"></i></div>
					<p class="dialog-text">发布成功</p>
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
				maxSize:9,
				dialogState:false,
				publishText:'',
				photoList:[],
				ajaxState:true,
				option:{
					
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{

				// 安卓图片返回
				window.classShowPublicPhoto=(data)=>{
					const photoData=JSON.parse(data);
					this.photoList=[...this.photoList,...photoData]
				}

				// IOS图片返回
		        jsBridge.callback_action.classShowPublicPhoto=(resData)=>{
		         	const newArr=[]
					resData.forEach((item,index)=>{
						this.$set(item,'photo',JSON.stringify(item.photo).replace(/\"/g, "").replace(/##R##/g,"\r").replace(/\\n/g,""));
						newArr.push(item)
					})
					this.photoList=[...this.photoList,...newArr]
		        }

		        // 安卓删除图片返回
				window.deleteShowPublishPhoto=(data)=>{
					const photoData=JSON.parse(data);
					this.photoList=photoData
				}

				// IOS删除图片返回
		        jsBridge.callback_action.deleteShowPublishPhoto=(resData)=>{
		         	const newArr=[]
					resData.forEach((item,index)=>{
						this.$set(item,'photo',JSON.stringify(item.photo).replace(/\"/g, "").replace(/##R##/g,"\r").replace(/\\n/g,""));
						newArr.push(item)
					})
					this.photoList=newArr
		        }

				// 安卓发布
				window.uploadClassPublishPhoto=()=>{
					this.tapPublish()
				}

				// IOS发布
		        jsBridge.callback_action.uploadClassPublishPhoto=()=>{
					this.tapPublish()
		        }

		  //       const data={
				// 	'base64Data':,
				// 	'memo':this.publishText,
				// 	'category':2
				// }
				// if(data.memo.length>140){
				// 	// 弹出层
				// 	this.$store.dispatch('aSetShowTips',true)
				// 	this.$store.dispatch('aSetShowTipsContent','最多输入140字')
				// 	return
				// }
				// if(data.base64Data.length<1){
				// 	// 弹出层
				// 	this.$store.dispatch('aSetShowTips',true)
				// 	this.$store.dispatch('aSetShowTipsContent','至少上传一张图')
				// 	return
				// }
				// if(!this.ajaxState){
				// 		return
				// }
				// this.submitPublishData(data)

			})
		},
		methods:{
			// 发布
			tapPublish(){
				let uploadData='';
				this.photoList.forEach((item,index)=>{
					const basePhoto=item.photo;
					uploadData=uploadData+'data:image/jpeg;base64,'+basePhoto+'@@@@@'
				})
				const data={
					'base64Data':uploadData.substring(0,uploadData.length-5),
					'memo':this.publishText,
					'category':2
				}
				if(data.memo.length>140){
					// 弹出层
					this.$store.dispatch('aSetShowTips',true)
					this.$store.dispatch('aSetShowTipsContent','最多输入140字')
					return
				}
				if(data.base64Data.length<1){
					// 弹出层
					this.$store.dispatch('aSetShowTips',true)
					this.$store.dispatch('aSetShowTipsContent','至少上传一张图')
					return
				}
				if(!this.ajaxState){
						return
				}
				this.submitPublishData(data)

			},
			// 添加照片
			tapAddPhoto(){
				const photoSize=this.maxSize-this.photoList.length;
				jsBridge.cameraChoice(photoSize)
			},
			// 照片点击
			tapPhotos(data){
				const index=data.index;
				jsBridge.sendPhotoIndex(index)
			},
			// 上传发布
			submitPublishData(data){
					this.ajaxState=false
					this.Ajax({
						data:data,
						method:'post',
						url:sendUrl.dietTopic_newCreateTopic,
						success:(res)=>{
							if(res.code==1){
								// setTimeout(()=>{
									
									this.dialogState=true;
									if(typeof androidClient != "undefined" ){
							            jsBridge.uploadClassPublishState('/#/trendsNewest')
							            return;
							        }

									jsBridge.trendsPublishFinished()
								// },1500)
							}else{
								this.ajaxState=true
							}
							
						},
						error:(res)=>{
							this.ajaxState=true
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
	@import 'trendsPublish.scss';
</style>