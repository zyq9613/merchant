<template>
	<el-dialog @close="handleClose" :close-on-click-modal="false" title="设置热度" :width="'500px'" :visible.sync="isShow">
		<el-form :model="heat">
			<el-form-item label="直播间热度" :label-width="'100px'">
				<el-slider v-model="heat.heatValue"></el-slider>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
	    <el-button @click="isShow = false">确定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
	export default{
		name:'setHeat',
		data(){
			return {
				isShow:false,
				heat:{}
			}
		},
		props:['isShowHeat'],
		watch:{
			isShowHeat(val){
				this.isShow = val
			}
		},
		methods: {
		  handleClose () {
		    this.$emit('onClose')
		  }
		}
	}
</script>