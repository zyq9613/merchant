<template>
  <el-row class="static">
		<el-card>
		    <el-form :model="form" label-width="80px">
		    		<el-form-item>
		    			<!-- <el-input type="text" label=""></el-input> -->
		    		</el-form-item>
		      	<el-button class="!ml-3" type="danger" @click="openDialog">新增</el-button>
		    </el-form>
	  </el-card>
		<el-card class="mt-3">
	  	<el-table
	  		:row-style="{'height' : '60px'}"
	  		class="w-full"
	  		:header-cell-style="{background:'#fafafa'}"
		    :data="videoListData"
		    v-loading="isLoading"
		    style="width: 100%"
		    >
		    <!-- <el-table-columnl prop="id" align="center" label="ID"></el-table-columnl> -->
		    <el-table-column fixed prop="title" align="center" label="标题" :width='200'></el-table-column>
		    <!-- <el-table-column prop="name" align="center" label="视频链接"></el-table-column> -->
		    <el-table-column prop="liveCover" align="center" label="直播封面">
		    	<template slot-scope="scope">
		    		<el-image :src="scope.row.liveCover" :preview-src-list="[scope.row.liveCover]" class="h-50px w-100px">
	    				 <div slot="error" class="image-slot">
				        <i class="el-icon-picture-outline"></i>
				      </div>
	    			</el-image>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="showType" align="center" label="直播类型" >
		    	<template slot-scope="scope">{{scope.row.showType == 0 ? '横屏直播' : '竖屏直播'}}</template>
		    </el-table-column>
		    <!-- <el-table-column prop="openReplay" align="center" label="是否回放" width="80">
		    	<template slot-scope="scope">{{scope.row.openReplay == 0 ? '开启' : '关闭'}}</template>
		    </el-table-column> -->
		    <!-- <el-table-column prop="openType" align="center" label="开放类型" >
		    	<template slot-scope="scope">{{scope.row.openType == 0 ? '私域' : '全平台'}}</template>
		    </el-table-column> -->
		    <!-- <el-table-column width="100" prop="problems" align="center" label="问题&答案"></el-table-column> -->
		    <!-- <el-table-column width="120" prop="address" align="center" label="是否开启奖励"></el-table-column> -->
		    <el-table-column prop="rewardType" align="center" label="奖励类型" >
		    	<template slot-scope="scope">
		    		{{scope.row.rewardType == 0 ? '无奖励' : (scope.row.rewardType == 1 ? '红包' : '积分')}}
		    	</template>
		    </el-table-column>

		    <el-table-column prop="states" align="center" label="直播状态" width="80">
		    	<template slot-scope="scope">
		    		{{scope.row.states == 0 ? '待上架' : (scope.row.rewardType == 1 ? '已上架' : '已下架')}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
		    <el-table-column prop="startTime" align="center" label="开始时间"></el-table-column>
		    <!-- <el-table-column prop="address" align="center" label="是否开启聊天室"></el-table-column> -->
		    <el-table-column fixed="right" prop="address" align="center" width="300" label="操作">
		    	<template slot-scope="scope">
		    		<el-link type="danger" class="mx-1"  @click="detail(scope.row)">编辑</el-link>
		    		<el-link type="danger" class="mx-1" >设置奖励</el-link>
		    		<el-link type="danger" class="mx-1"  @onClose="showHeat = false" @click="showHeat = true">设置热度</el-link>
		    		<el-dropdown>
						  <span class="el-dropdown-link">
						    更多<i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item>数据</el-dropdown-item>
						    <el-dropdown-item>分享</el-dropdown-item>
						    <el-dropdown-item>{{scope.row.states == 0 ? '上架' : '下架'}}</el-dropdown-item>
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
    <form-dialog :isScreen="isScreen" class="absolute top-50px" :addOrEdit="addOrEdit" :editData="editData" :addType="type" @isGet="getPlan" @isClose="isClose" :dialogFormVisible="dialogFormVisible"></form-dialog>
  	</el-row>
  
</template>

<script>
	import { getPlanList, getPlanInfo } from '@/api/videoplan'
	import formDialog from './components/formDialog.vue'
	import seeDetails from './components/detail.vue'
	import setHeat from './components/setHeat.vue'
	import { getToken } from '@/utils/auth'
	import { Message } from 'element-ui'
export default {
  name: 'Videoplan',
  components:{
  	formDialog,
  	seeDetails,
  	setHeat
  },
  data() {
    return {
    	isScreen:false,
    	addOrEdit:0, //判断新增和修改
    	editData:undefined,
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
  		// this.isShow = true;
  		// this.row.push(row)
  		this.isScreen = true;
  		this.addOrEdit = 1;
  		getPlanInfo(row.id).then(res => {
  			console.log(res.data.topics[0].title)
  			if (res.code === 'R000') {
  				if (res.data.topics[0].title && res.data.topics[0].title !== "") {
  					
  					res.data.isQuestion = true
  				}
  				if (!res.data.replayurl || res.data.replayurl == '') {
  					res.data.replayurl = Date.parse(new Date());
  					Message({
  						message: '当前计划尚未上传视频，请先上传视频在进行其它操作',
							type: 'warning',
							duration: 5 * 1000
  					})
  				}
  				console.log(res.data)
  				this.editData = res.data;
  				this.dialogFormVisible = true;
  			}
  		})

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
  		this.isScreen = false;
  		this.addOrEdit = 0;
  		this.editData = {};
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
	  	this.addOrEdit = 0;
	  	this.isLoading = false;
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
