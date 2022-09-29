<template>
	<el-dialog v-loading="isLoading" @close="onclose" title="查看详情" :visible.sync="dialogVisible" :width="'600px'">
		
		<el-descriptions :column="1" border v-for="(item,index) in row" :key="index">
			<el-descriptions-item label="标题">{{item.title}}</el-descriptions-item>
			<el-descriptions-item label="封面" content-class-name="h-46px">
				<img :src="item.liveCover" class="h-full">
			</el-descriptions-item>
			<el-descriptions-item label="是否回放">{{item.openReplay == 1 ? '不开启' : '开启'}}</el-descriptions-item>
			<el-descriptions-item label="开放类型">{{item.openType == 0 ? '私域' : '全平台'}}</el-descriptions-item>
			<el-descriptions-item label="直播类型">{{item.showType == 0 ? '横屏直播' : '竖屏直播'}}</el-descriptions-item>
			<el-descriptions-item label="开始时间">{{item.startTime}}</el-descriptions-item>
			<el-descriptions-item label="奖励类型">{{item.rewardType == 0 ? '无奖励' : (item.rewardType == 1 ? '红包' : '积分')}}</el-descriptions-item>
		</el-descriptions>
		
		<div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name:'seeDetails',
		data () {
		  return {
		  	isLoading:false,
		  	dialogVisible:false,
		  };
		},
		props:['row','isShow'],
		watch:{
			isShow(val){
				this.dialogVisible = val;
			}
		},
		methods: {
		  onclose () {
		    this.$emit('isClose');
		  }
		}
	}
	
</script>