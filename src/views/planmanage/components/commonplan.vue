<template>
  <el-row>
		<el-card>
		    <el-form :model="form" label-width="80px">
		    	<!-- <el-col :span="8">
		    		<el-form-item label="标题" >
				        <el-input v-model="form.name" />
				      </el-form-item>
		    	</el-col>
		      	<el-button class="!ml-3" type="primary">查询</el-button> -->
		      	<el-button class="!ml-3" type="danger" @click="openDialog">新增</el-button>
		    </el-form>
	  </el-card>
		<el-card class="mt-3">
	  	<el-table
	  		class="w-full"
		    :data="videoListData"
		    v-loading="isLoading"
		    style="width: 100%"
		    stripe>
		    <el-table-column fixed prop="title" label="标题"></el-table-column>
		    <!-- <el-table-column prop="name" label="视频链接"></el-table-column> -->
		    <el-table-column prop="liveCover" label="封面链接">
		    	<template slot-scope="scope">
		    		<img :src="scope.row.liveCover">
		    	</template>
		    </el-table-column>
		    <el-table-column prop="showType" label="直播类型">
		    	<template slot-scope="scope">{{scope.row.showType == 0 ? '横屏直播' : '竖屏直播'}}</template>
		    </el-table-column>
		    <el-table-column prop="openReplay" label="是否回放" width="80">
		    	<template slot-scope="scope">{{scope.row.openReplay == 0 ? '开启' : '关闭'}}</template>
		    </el-table-column>
		    <el-table-column prop="openType" label="开放类型">
		    	<template slot-scope="scope">{{scope.row.openType == 0 ? '私域' : '全平台'}}</template>
		    </el-table-column>
		    <!-- <el-table-column width="100" prop="problems" label="问题&答案"></el-table-column> -->
		    <!-- <el-table-column width="120" prop="address" label="是否开启奖励"></el-table-column> -->
		    <el-table-column prop="rewardType" label="奖励类型">
		    	<template slot-scope="scope">
		    		{{scope.row.rewardType == 0 ? '无奖励' : (scope.row.rewardType == 1 ? '红包' : '积分')}}
		    	</template>
		    </el-table-column>
		    <!-- <el-table-column prop="cost" label="红包金额"></el-table-column>
		    <el-table-column prop="cost" label="积分额度"></el-table-column> -->
		    <el-table-column prop="startTime" label="开始时间"></el-table-column>
		    <!-- <el-table-column prop="address" label="是否开启聊天室"></el-table-column> -->
		    <el-table-column fixed="right" prop="address" label="操作">
		    	<template slot-scope="scope">
		    		<el-button type="primary" size="mini" @click="detail(scope.row)">查看详情</el-button>
		    		<!-- <el-button type="danger" size="mini">设置奖励</el-button> -->
		    	</template>
		    </el-table-column>
	  	</el-table>
	  	<form-dialog @isGet="getPlan" @isClose="isClose" :dialogFormVisible="dialogFormVisible"></form-dialog>
	  	<see-details :row="row" @isClose="isClose" :isShow="isShow"></see-details>
	  	<el-pagination
	  	  class="flex mt-8 justify-center"
	  	  background
        layout="sizes,prev, pager, next"
        :page-sizes="[10,15,20]"
        :page-size="pageSize"
        :page-count="totalPages"
        hide-on-single-page
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
			</el-pagination>
    </el-card>
  </el-row>
  
</template>

<script>
	import { getPlanList } from '@/api/videoplan'
	import formDialog from './formDialog.vue'
	import seeDetails from './detail.vue'
	import { getToken } from '@/utils/auth'
export default {
  name: 'Videoplan',
  components:{
  	formDialog,
  	seeDetails
  },
  data() {
    return {
    	row:[],
    	isShow:false,
    	totalPages:undefined,
    	isLoading:false,
    	pageNo:undefined,   //当前第几页
    	pageSize:undefined, // 每页显示几个
    	totalCount:0,  // 总条目数
    	dialogFormVisible:false,
      form: {},
      videoListData:[

      ]
    }
  },
  created(){
  	this.getPlan();
  },
  methods:{
  	detail(row){
  		this.isShow = true;
  		this.row.push(row)
  	},
  	handleCurrentChange(currentSize){
  		this.pageNo = currentSize;
  		this.getPlan();
  	},
  	handleSizeChange(newSize){
  		this.pageSize = newSize
  		this.getPlan();
  	},
  	isClose(){
  		this.dialogFormVisible = false;
  		this.isShow = false;
  		this.row = [];
  	},
  	openDialog(){
  		this.dialogFormVisible = true;
  		console.log(this.dialogFormVisible)
  	},
  	getPlan(){
  		this.isLoading = true;
  		getPlanList({
  			 pageNo:this.pageNo,
  			 pageSize:this.pageSize
  		}).then(res => {
  			if (res.code == 'R000') {
  				this.isLoading  = false;
  				this.videoListData = res.data.datas;
	  			this.pageSize = res.data.pageSize;
	  			this.totalCount = res.data.totalCount;
	  			this.totalPages = res.data.totalPages;
  			}
  			

  		})
  	}
  }
}
</script>
