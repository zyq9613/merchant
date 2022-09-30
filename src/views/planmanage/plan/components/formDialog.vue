<template>
	<el-dialog :close-on-click-modal="false" :title="addType == 2 ? '新建视频计划' : '新建直播计划'" :visible.sync="dialogVisible" :modal="false" :top="'100px'"  :fullscreen="isScreen" :width="'600px'" @close="onclose">
		<div v-if="isVideoUpload" class="form-wrapper flex w-full flex-1 space-x-48">
			<el-form class="w-3/5" ref="addPlan"  :model="addPlanData" size="small" :rules="rules">
				<el-form-item prop="title" label="标题" :label-width="formLabelWidth">
					<el-input v-model="addPlanData.title" placeholder="请输入标题"></el-input>
				</el-form-item>

				<!-- <el-form-item v-if="!videoFileList" prop="replayurl" label="视频URL" :label-width="formLabelWidth">
					<el-input v-model="addPlanData.replayurl" placeholder="请输入视频URL或者上传视频"></el-input>
				</el-form-item> -->

				<!-- <el-form-item v-if="!addPlanData.replayurl" prop="video" label="上传视频" :label-width="formLabelWidth">
					<div class="flex justify-between ">
						<el-upload
						class="w-ful block flex-1"
						action=""
						:on-remove="handleRemove"
						:http-request="handleUpload"
						:before-upload="beforeAvatarUpload"
						:on-success="handleUpload"
						:limit="1"
						:on-exceed="hanldeExceed"
						>
						<el-button size="small" type="primary" @click="uploadType = 1">点击上传</el-button>
						</el-upload>
						<el-progress v-if="showProgress&& uploadType == 1" class="w-1/2 block mt-2" :percentage="percentage"></el-progress>
					</div>

				</el-form-item> -->

				<el-form-item prop="liveCover" label="上传封面" :label-width="formLabelWidth">
					<div class="flex justify-between ">
						<el-upload
						:accept="'image/png, image/jpeg, image/jpg'"
						v-if="!isUploadPic"
						list-type="picture-card"
						class="w-ful block flex-1"
						action=""
						:on-remove="handleRemove"
						:http-request="handleUpload"
						:before-upload="beforeAvatarUpload"
						:limit="1"
						:on-exceed="hanldeExceed"
						>
						<i class="el-icon-plus"></i>
						<!-- <el-button size="small" type="primary" @click="uploadType = 2">点击上传</el-button> -->
						<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
						</el-upload>
						<div class="relative img-wrapper w-148px h-148px flex items-center justify-center" v-if="isUploadPic">
							<el-progress v-if="isUploadPic && percentage < 100" type="circle" :percentage="percentage"></el-progress>
							 <el-image :preview-src-list="[liveCover]" :src="liveCover" v-if="liveCover !== ''"></el-image>
							 <div
					          v-if="liveCover !== ''"
					          class=" del-btn absolute w-full h-20px bottom-0 left-0 flex justify-center items-center"
					          @click="handleRemove(file)"
					        >
					          <i class="el-icon-delete"></i>
					        </div>
						</div>
						<!-- <el-progress v-if="showProgress && uploadType == 2" class="w-1/2 block mt-2" :percentage="percentage"></el-progress> -->
					</div>

				</el-form-item>
				<el-form-item prop="showType" label="直播类型" :label-width="formLabelWidth">
					<el-radio v-model="addPlanData.showType" label="0">横屏</el-radio>
					<el-radio v-model="addPlanData.showType" label="1">竖屏</el-radio>
				</el-form-item>

				<el-form-item prop="info" label="直播简介" :label-width="formLabelWidth">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="addPlanData.info">
					</el-input>
				</el-form-item>
				<el-form-item prop="startTime" label="开始时间" :label-width="formLabelWidth">
					<el-date-picker
					class="block !w-full"
					v-model="addPlanData.startTime"
					type="datetime"
					:picker-options="pickerOptions"
					placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="是否回放" :label-width="formLabelWidth">
					<el-switch
					v-model="addPlanData.openReplay"
					active-color="#13ce66"
					inactive-color="#ff4949">
					</el-switch>
				</el-form-item>

				<el-form-item label="是否开启评论" :label-width="formLabelWidth">
					<el-switch
					v-model="addPlanData.openIm"
					active-color="#13ce66"
					inactive-color="#ff4949">
					</el-switch>
				</el-form-item>
			    <!-- <el-form-item label="是否开启聊天室" :label-width="formLabelWidth">
			    	<el-switch
					  v-model="addPlanData.isOpenChat"
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
				</el-form-item> -->

				<el-form-item label="是否答题" :label-width="formLabelWidth">
					<el-switch
					v-model="addPlanData.isQuestion"
					active-color="#13ce66"
					inactive-color="#ff4949">
					</el-switch>

				</el-form-item>

				<el-row v-if="addPlanData.isQuestion"  v-for="(item,index) in addPlanData.topics" :key="index">
					<div class="flex justify-between flex-initial items-center mb-6">
						<el-row class="w-full">
							<el-form-item 
							:prop="'topics.' + index + '.title'" 
							:label-width="formLabelWidth" 
							:label="index < 1 ? '问题' : '问题' + (index + 1)" 
							class="w-full !mb-4" 
							:rules="[{ required: true, message: '请输入问题' }]">
								<el-input v-model="item.title" placeholder="请输入问题"></el-input>
							</el-form-item>

							<el-form-item 
							:prop="'topics.' + index + '.a'" 
							:label-width="formLabelWidth" 
							label="选项A" 
							class="w-full !mb-4" 
							:rules="[{required: true, message: '请输入选项A', trigger: 'blur'}]">
								<el-input v-model="item.a" placeholder="请输入选项A"></el-input>
							</el-form-item>

							<el-form-item :prop="'topics.' + index + '.b'" 
							:label-width="formLabelWidth" 
							label="选项B" 
							class="w-full !mb-4"
							:rules="[{required: true, message: '请输入选项B', trigger: 'blur'}]">
								<el-input v-model="item.b" placeholder="请输入选项B"></el-input>
							</el-form-item>

							<el-form-item 
							:prop="'topics.' + index + '.c'" 
							:label-width="formLabelWidth" 
							label="选项C" 
							class="w-full !mb-4"
							:rules="[{required: true, message: '请输入选项C', trigger: 'blur'}]">
								<el-input v-model="item.c" placeholder="请输入选项C"></el-input>
							</el-form-item>

							<el-form-item 
							:prop="'topics.' + index + '.d'" 
							:label-width="formLabelWidth" 
							label="选项D" 
							class="w-full !mb-4"
							:rules="[{required: true, message: '请输入选项D', trigger: 'blur'}]">
								<el-input v-model="item.d" placeholder="请输入选项D"></el-input>
							</el-form-item>

							<el-form-item 
							:prop="'topics.' + index + '.answer'" 
							:label-width="formLabelWidth" 
							label="答案" 
							class="w-full !mb-4"
							:rules="[{required: true, message: '请输入答案', trigger: 'blur'}]">
								<el-input v-model="item.answer" placeholder="请输入答案"></el-input>
							</el-form-item>

						</el-row>

						<el-button v-if="addPlanData.topics.length > 1" class=" h-40px ml-2" @click.prevent="removeQuestion(item)" type="danger">删除</el-button>
					</div>

				</el-row>
			    <el-form-item :label-width="formLabelWidth" v-if="addPlanData.isQuestion"><el-button type="success" size="small" @click.prevent="addQuestion(domain)">新增</el-button></el-form-item>
			    
			    <el-form-item label="是否开启奖励" :label-width="formLabelWidth">
			    	<el-switch
			    	v-model="addPlanData.isReward"
			    	active-color="#13ce66"
			    	inactive-color="#ff4949">
			    	</el-switch>
				</el-form-item>
				<el-form-item label="奖励类型" :label-width="formLabelWidth" v-if="addPlanData.isReward">
					<el-radio v-model="addPlanData.rewardType" label="1">红包</el-radio>
					<el-radio v-model="addPlanData.rewardType" label="2">积分</el-radio>
				</el-form-item>
				<template v-for="(item,index) in addPlanData.moneyBonuses" v-if="addPlanData.isReward" >

					<el-form-item v-if="addPlanData.rewardType == 1" label="红包类型" :label-width="formLabelWidth">
						<el-radio v-model="item.type" label="1">观看时长红包</el-radio>
						<el-radio v-model="item.type" label="3">红包雨</el-radio>
					</el-form-item>
					<el-form-item v-if="addPlanData.rewardType == 1" label="发送轮次" :label-width="formLabelWidth">
						<el-input-number v-model="item.rounds" :min="1" :max="10"></el-input-number>
					</el-form-item>
					<el-form-item :prop="'moneyBonuses.' + index + '.cost' " :label="addPlanData.rewardType == 1 ? '红包金额' : '积分额' " :label-width="formLabelWidth" :rules="[{required: true, message: '请输入红包金额', trigger: 'blur'}]">
						<el-input v-model="item.cost" :placeholder="addPlanData.rewardType == 1 ? '请输入红包金额' : '请输入积分额'"></el-input>
					</el-form-item>
					    <!-- <el-form-item :prop="integralAmount" v-if="addPlanData.isReward && addPlanData.awardType == 2" label="积分额" :label-width="formLabelWidth">
					      <el-input v-model="addPlanData.integralAmount" placeholder="请输入积分额"></el-input>
					  </el-form-item> -->

					  <el-form-item prop="viewLength" label="观看时长" :label-width="formLabelWidth">
					  	<el-input v-model="item.viewLength = 40" placeholder="请输入观看时长"></el-input>
					  </el-form-item>

				</template>
				<div class="flex justify-center">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" v-loading="isLoading" @click="handleAddPlan">确 定</el-button>
				</div>
				
			</el-form>
			<div class="fixed iphone w-300px right-20">
				<img src="../../../../assets/common/ipnone.png" alt="">
				<div v-if="!isUploadSuccess" class="absolute w-200px top-3/10 left-1/2 -ml-100px flex flex-col items-center">
					<svg-icon icon-class="logo-2" class="text-5xl mb-4" /> 
					<span class="text-base">正在上传中</span>
					<el-progress class="w-full mt-5" :text-inside="true" :stroke-width="15" :percentage="videoPercentage"></el-progress>
				</div>
				<div v-if="isUploadSuccess" class="absolute px-3 top-0 w-full h-full flex items-center">
					<video autoplay="true" loop="true" :src="videoFileUrl"></video>
					<div class="absolute bottom-8 left-6 right-6">
						<span class="text-sm">@ 一个很酷的人</span>
						<div class="mt-1">{{addPlanData.title ? addPlanData.title : "视频标题"}}</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="upload-wrapper-zyq" v-if="!isVideoUpload">
			<el-upload
			  :accept="'video/mp4,video/x-m4v,video/*'"
			  class="upload-demo w-ful"
			  drag
			  :before-upload="beforeVideoUpload"
			  :http-request="hadleUploadVideo"
			  action="">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将视频拖到此处，<em>点击上传</em></div>
			  <div class="mt-4">或者</div>
			  <el-input v-model="videoFileUrl" @click.stop.native type="text" class="w-3/5 mt-4" placeholder="输入视频URL">
			  	<el-button slot="append" icon="el-icon-search" @click="handleInputVideourl">确定</el-button>
			  </el-input>
			  <div class="errorText w-3/5 mt-2  text-left m-auto">{{errorText ? '* '+ errorText : errorText}}</div>
			  <div class="el-upload__tip text-sm font-semibold pink" slot="tip">* 只能上传常用视频格式，推荐使用mp4、webm</div>
			</el-upload>
		</div>
	</el-dialog>
</template>

<script>
	import { addPlan } from '@/api/videoplan'
	import { getToken } from '@/utils/auth'
	import cos from '@/utils/upload'
	import { Message } from 'element-ui'
	export default{
		name:'formDialog',
		props:['dialogFormVisible','addType'],
		watch:{
			dialogFormVisible(val){
				this.dialogVisible = val;
			},
			addType(val){
				this.type = val;
			}
		},
		data(){
			const validateLivecover = (rule, value, callback) => {
				console.log(this.liveCoverFilelist = '')
				if (this.liveCover == '') {
					callback('请上传封面')
				}else{
					callback()
				}
			}
			return{
				errorText:"",
				liveCover:'',
				isUploadPic:false,
				isUploadSuccess:false,
				videoFileUrl:'',
				videoPercentage:0,
				isVideoUpload:false,
				isScreen:false,
				isFormShow:true,
				pickerOptions:{
					disabledDate(time) {
	            		return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
	            	}
	            },
				uploadType:1,//上传状态   1为上传视频 2为上传封面
				liveCover:'',
				type:2,
				random:Date.parse(new Date()),
				isDisabled:false,
				showProgress:false,
				percentage:0,
				videoFileList:'',
				liveCoverFilelist:"",
				isLoading:false,
				// fileList:[],
				formLabelWidth:'120px',
				dialogVisible:this.dialogFormVisible,
				addPlanData:{
					title:'',
					replayurl:'',
					info:'',
					liveCover:'',
					rewardType:'1',
					showType:'1',
					openReplay:0,
				// awardType:'1',
				// envelopeType:'1',
				topics:[
				{
					title:'',
					a:'',
					b:'',
					c:'',
					d:'',
					answer:''
				},
				],
				moneyBonuses:[
				{
					type:'1',
					viewLength:0,
					cost:'',
					rounds:1,
				}
				],
				startTime:'',
			},
			rules:{
				title:[
				{required: true,message: '请输入标题',trigger: 'blur'}
				],
				replayurl:[
				{required: true,message: '请上传视频或者输入视频链接',trigger: 'blur'}
				],
					// video:[
					// 	{required: true,trigger: 'change'}
					// ],
					liveCover:[
						{validator: validateLivecover ,trigger: 'change'}
					],
					envelopeAmount:[
					{required: true,message: '请输入红包金额',trigger: 'blur'}
					],
					integralAmount:[
					{required: true,message: '请输入积分额',trigger: 'blur'}
					],
					
					startTime:[
					{required: true,message: '请选择开始时间',trigger: 'blur'}
					],
				}
				
			}	
		},
		created(){
			console.log(this.dialogFormVisible)
			this.type = this.addType;
			this.visiableOrNot = this.dialogFormVisible;
			
		},
		mounted(){
			console.log(this.$refs)
		},
		methods:{
			handleInputVideourl(val){
				console.log((/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(this.videoFileUrl)))
				if (!this.videoFileUrl || this.videoFileUrl == '') {
					this.errorText = '请输入视频链接';
					console.log((/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(this.videoFileUrl)))
					
				}else if (!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(this.videoFileUrl))) {
					this.errorText = '请输入正确的视频链接';
				}else{
					this.videoFileUrl = this.videoFileUrl;
					this.isScreen = true;
		    		this.isVideoUpload = true
				}
			},
			onclose(){
				this.$emit('isClose');
			},
			hanldeExceed(){
				Message({
					message: '只能上传一个视频',
					type: 'warning',
					duration: 5 * 1000
				})
			},
			handleAddPlan(){
				console.log(this.addPlanData.startTime)
				this.$refs.addPlan.validate(valid => {
					console.log(valid)
					if (valid) {
						this.isLoading = true; 
						this.addPlanData.replayurl = this.videoFileUrl;
						this.addPlanData.liveCover = this.liveCover;
						this.addPlanData.openReplay = this.addPlanData.openReplay ? 1 : 0;
						this.addPlanData.openIm = this.addPlanData.openIm ? 1 : 0;
						// this.addPlanData.startTime = Date.parse(this.addPlanData.startTime)
						let data = Object.assign({
							token:getToken(),
							title:'12313',
							type:this.type,
							createTime:  Date.now()
						},this.addPlanData);
						console.log(data)
						addPlan(data).then(res => {
							if (res.code == 'R000') {
								Message({
									message: '添加成功',
									type: 'success',
									duration: 5 * 1000
								})
								this.isLoading = false;
								this.dialogVisible = false;
								this.$refs.addPlan.resetFields()
								this.videoFileUrl = '';
								this.liveCover = ''
								this.$emit('isGet')
							}
						})
					}
				})
			},
			addQuestion(){
				this.addPlanData.topics.push({})
			},
			removeQuestion(item){
				var index = this.addPlanData.topics.indexOf(item)
				if (index !== -1) {
					this.addPlanData.topics.splice(index, 1)
				}
			},
			beforeVideoUpload (file) {
				this.videoFileList = file
			},
			beforeAvatarUpload (file) {
				this.liveCoverFilelist = file
			},
			handleRemove(file){
				this.liveCover = '';
				this.videoFileList = '';
				this.liveCoverFilelist = '';
				this.isUploadPic = false
			},
			hadleUploadVideo(e){
				console.log(e)
				// if (e.) {}
				let uploadFileName = Date.parse(new Date())
				cos.uploadFile({
					Bucket: 'redenlops01-1313983242', /* 填写自己的bucket，必须字段 */
					Region: 'ap-guangzhou',     /* 存储桶所在地域，必须字段 */
					Key: uploadFileName + '-' + this.videoFileList.name,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
			        Body: this.videoFileList, // 上传文件对象
			        SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
			        onTaskReady:taskId => {
			        	if (taskId) {
			        		this.isVideoUpload = true;
			        		this.isScreen = true
			        	}
			        },
			        onProgress: progressData => { 
			      	/* 非必须 */
			      	this.videoPercentage = parseInt(progressData.percent * 100);
			      		console.log(progressData)
			      	  // this.showProgress = true;
		      		  // this.percentage = progressData.percent * 100;
			        },
			        onFileFinish: (err, data, options) => {   /* 非必须 */

			        }
			    },(err,data) => {
			    	if (err) {
			    		console.log(err)
			    	}else{
			    		this.videoFileUrl = 'https://' + data.Location;
			    		this.isUploadSuccess = true
			    	}
			    })
			},
			handleUpload(e){
				let uploadFileName = Date.parse(new Date());
				cos.uploadFile({
					Bucket: 'redenlops01-1313983242', /* 填写自己的bucket，必须字段 */
					Region: 'ap-guangzhou',     /* 存储桶所在地域，必须字段 */
					Key: uploadFileName + '-' + this.liveCoverFilelist.name,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
			      	Body: this.liveCoverFilelist, // 上传文件对象
			      	SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
			       onTaskReady:taskId => {
			        	if (taskId) {
			        		this.isUploadPic = true;
			        	}
			        },
			      	onProgress: progressData => { 
				      	/* 非必须 */
				      	this.showProgress = true;
				      	this.percentage = progressData.percent * 100;
				      },
				      onFileFinish: (err, data, options) => {   /* 非必须 */

				      },
				  },(err, data) =>  {
				  	console.log(data)
				  	if (err) {
				  		console.log(err)
				  	} else {
				  		this.liveCover = 'https://' + data.Location;
				  		this.isUploadPic = true;
				  		this.$refs.addPlan.validateField('liveCover')
				  		setTimeout(() => {
				  			Message({
				  				message: `上传封面成功`,
				  				type: 'success',
				  				duration: 5 * 1000
				  			})
				  			this.showProgress = false
					              // this.isDisabled = true;
			              	this.percent = 0
					          }, 1000)
				  	}
				  })
			}
		}
	}
</script>
<style lang="scss">
	.upload-wrapper-zyq{
		.el-upload ,.el-upload-dragger{
			width: 100%;
		}
		.el-upload-dragger{
			height: 260px;
		}
		
	}
	.iphone{
		span{
			color: #fff;
		}
	}
	.img-wrapper{
		background: #eaeaea;
		.del-btn{
			background:rgba(0,0,0,.3);
			color: #fff;
			i{
				cursor: pointer;
			}
		}
	}
	.errorText{
		color: #ff0000;
	}
</style>