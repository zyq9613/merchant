<template>

	<el-card>
		<el-table :header-cell-style="{background:'#fafafa'}" border :data="userData" v-loading="isLoading">
			<el-table-column prop="id" label="用户ID"></el-table-column>
			<el-table-column prop="nickName" label="名称"></el-table-column>
			<el-table-column prop="sex" label="性别">
				<template slot-scope="scope">
					{{scope.row.sex == 0 ? '男' : '女'}}
				</template>
			</el-table-column>
			<!-- <el-table-column prop="type" label="角色">
				<template slot-scope="scope">
					{{scope.row.type == 0 ? '用户' : '商户'}}
				</template>
			</el-table-column> -->
			<el-table-column prop="a_states" label="账户状态">
				<template slot-scope="scope">
					{{scope.row.a_states == 0 ? '正常' : '封禁'}}
				</template>
			</el-table-column>
			<el-table-column prop="m_states" label="管理状态">
				<template slot-scope="scope">
					{{scope.row.m_states == 0 ? '正常' : '未审核'}}
				</template>
			</el-table-column>

			<el-table-column prop="onelevlId" label="所属群组"></el-table-column>
			<el-table-column prop="onelevlname" label="上级名称"></el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import {  getUserList } from '@/api/userlist'
	import { Message } from 'element-ui'
	export default{
		name:'usermanage',
		data(){
			return {
				userData:[],
				isLoading:false
			}
		},
		methods:{
			getList(){
				this.isLoading = true;
				getUserList().then(res => {
					if (res.code == "R000") {
						this.userData = res.data.datas;
						this.isLoading = false
					}
				})
			}
		},
		created(){
			this.getList();
		}

	}
</script>