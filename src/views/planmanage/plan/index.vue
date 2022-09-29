<template>
  <el-row class="static">
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
	  		:header-cell-style="{background:'#fafafa'}"
	  		border
		    :data="videoListData"
		    v-loading="isLoading"
		    style="width: 100%"
		    >
		    <el-table-column fixed prop="title" align="center" label="标题"></el-table-column>
		    <!-- <el-table-column prop="name" align="center" label="视频链接"></el-table-column> -->
		    <el-table-column prop="liveCover" align="center" label="封面链接">
		    	<template slot-scope="scope">
		    		<img :src="scope.row.liveCover">
		    	</template>
		    </el-table-column>
		    <el-table-column prop="showType" align="center" label="直播模式">
		    	<template slot-scope="scope">{{scope.row.showType == 0 ? '横屏直播' : '竖屏直播'}}</template>
		    </el-table-column>
		    <!-- <el-table-column prop="openReplay" align="center" label="是否回放" width="80">
		    	<template slot-scope="scope">{{scope.row.openReplay == 0 ? '开启' : '关闭'}}</template>
		    </el-table-column> -->
		    <el-table-column prop="openType" align="center" label="开放类型" width="80">
		    	<template slot-scope="scope">{{scope.row.openType == 0 ? '私域' : '全平台'}}</template>
		    </el-table-column>
		    <!-- <el-table-column width="100" prop="problems" align="center" label="问题&答案"></el-table-column> -->
		    <!-- <el-table-column width="120" prop="address" align="center" label="是否开启奖励"></el-table-column> -->
		    <el-table-column prop="rewardType" align="center" label="奖励类型" width="80">
		    	<template slot-scope="scope">
		    		{{scope.row.rewardType == 0 ? '无奖励' : (scope.row.rewardType == 1 ? '红包' : '积分')}}
		    	</template>
		    </el-table-column>

		    <el-table-column prop="states" align="center" label="计划状态" width="80">
		    	<template slot-scope="scope">
		    		{{scope.row.rewardType == 0 ? '待开始' : '进行中'}}
		    	</template>
		    </el-table-column>
		    <!-- <el-table-column prop="cost" align="center" label="红包金额"></el-table-column>
		    <el-table-column prop="cost" align="center" label="积分额度"></el-table-column> -->
		    <el-table-column prop="startTime" align="center" label="开始时间"></el-table-column>
		    <!-- <el-table-column prop="address" align="center" label="是否开启聊天室"></el-table-column> -->
		    <el-table-column fixed="right" prop="address" align="center" width="300" label="操作">
		    	<template slot-scope="scope">
		    		<el-link class="mx-1"  @click="detail(scope.row)">查看详情</el-link>
		    		<el-link class="mx-1" >设置奖励</el-link>
		    		<el-link class="mx-1"  @onClose="showHeat = false" @click="showHeat = true">设置热度</el-link>
		    		<el-dropdown>
						  <span class="el-dropdown-link">
						    更多<i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item>数据</el-dropdown-item>
						    <el-dropdown-item>分享</el-dropdown-item>
						    <el-dropdown-item>下架</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
		    	</template>
		    </el-table-column>
	  	</el-table>
	  	<set-heat :isShowHeat="showHeat"></set-heat>
	  	
	  	<see-details :row="row" @isClose="isClose" :isShow="isShow"></see-details>
	  	<el-pagination
	  	  class="flex mt-8 justify-center"
	  	  background
        layout="sizes,total,prev, pager, next"
        :page-sizes="[10,15,20]"
        :page-size="pageSize"
        :page-count="totalPages"
        hide-on-single-page
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
			</el-pagination>
    </el-card>
    <form-dialog class="absolute top-50px" :addType="type" @isGet="getPlan" @isClose="isClose" :dialogFormVisible="dialogFormVisible"></form-dialog>
  	</el-row>
  
</template>

<script>
	import { getPlanList } from '@/api/videoplan'
	import formDialog from './components/formDialog.vue'
	import seeDetails from './components/detail.vue'
	import setHeat from './components/setHeat.vue'
	import { getToken } from '@/utils/auth'
export default {
  name: 'Videoplan',
  components:{
  	formDialog,
  	seeDetails,
  	setHeat
  },
  data() {
    return {
    	showHeat:false,
    	type:null,
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
  	if (this.$route.name == 'Videoplan') {
  		this.type = 2;
  	}else if(this.$route.name == 'Liveplan'){
  		this.type = 1;
  	}
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
  		if (this.$route.name == 'Videoplan') {
	  		this.type = 2;
	  	}else if(this.$route.name == 'Liveplan'){
	  		this.type = 1;
	  		console.log(this.type)
	  	}
  		this.dialogFormVisible = true;
  		console.log(this.dialogFormVisible)
  	},
  	getPlan(){
  		this.isLoading = true;
  		getPlanList({
  			 type:this.type,
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
