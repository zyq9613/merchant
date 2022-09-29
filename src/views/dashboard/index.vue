<template>
  <div class="dashboard-container ">
    <div class="flex space-x-4">
      <el-card class="w-1/2">
        <div slot="header" class="flex justify-between">
          <span>店铺数据</span>
          <el-button type="primary" size="small">查看数据</el-button>
        </div>
        <div class="flex flex-wrap  justify-between w-full">
          <div class="flex w-1/2 justify-between items-center p-5 mb-4">
            <svg-icon icon-class="1" class="!w-20 !fill-blue-500 !h-20 block "/> 
            <div class="w-1/2">
              <span class="text-base">消耗流量</span>
              <div class="text-2xl font-bold mt-2">3145949.61</div>
            </div>
          </div>
          <div class="flex w-1/2 justify-between items-center p-5 mb-4">
            <svg-icon icon-class="2" class="!w-20 !fill-blue-500 !h-20 block"/> 
            <div class="w-1/2">
              <span class="text-base">剩余流量</span>
              <div class="text-2xl font-bold mt-2">3145949.61</div>
            </div>
          </div>
          <div class="flex w-1/2 justify-between items-center p-5 mb-4">
            <svg-icon icon-class="3" class="!w-20 !fill-blue-500 !h-20 block"/> 
            <div class="w-1/2">
              <span class="text-base">招商经理总数</span>
              <div class="text-2xl font-bold mt-2">409</div>
            </div>
          </div>
          <div class="flex w-1/2 justify-between items-center p-5 mb-4">
            <svg-icon icon-class="4" class="!w-20 !fill-blue-500 !h-20 block"/> 
            <div class="w-1/2">
              <span class="text-base">经销商总数</span>
              <div class="text-2xl font-bold mt-2">6863</div>
            </div>
          </div>

        </div>
        
      </el-card>
      <el-card class="w-1/4">
        <div slot="header" class="flex justify-between">
          <span>会员数据</span>
          <el-button type="primary" size="small">查看数据</el-button>
        </div>
        <div class="w-full flex flex-1 flex-col">
          <div class="flex w-full justify-between items-center p-5 mb-4">
            <svg-icon icon-class="5" class="!w-20 !fill-blue-500 !h-20 block"/> 
            <div class="w-1/2">
              <span class="text-base">会员总数</span>
              <div class="text-2xl font-bold mt-2">1412231</div>
            </div>
          </div>
          <div class="flex w-full justify-between items-center p-5 mb-4">
            <svg-icon icon-class="6" class="!w-20 !fill-blue-500 !h-20 block"/> 
            <div class="w-1/2">
              <span class="text-base">待审核会员</span>
              <div class="text-2xl font-bold mt-2">9782</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="w-1/4">
        <div slot="header" class="flex justify-between">
          <span>昨日核心指标</span>
          <el-button type="primary" size="small">查看数据</el-button>
        </div>
        <div class="flex flex-col space-y-8">
          <div class="flex w-full h-1/3 justify-center space-x-20 items-center">
            <svg-icon icon-class="7" class="!w-16 !fill-blue-500 !h-16 block"/> 
            <div class="w-1/3">
              <span class="text-base">转化率</span>
              <div class="text-2xl font-bold mt-2">100%</div>
            </div>
          </div>
          <div class="flex w-full h-1/3 justify-center space-x-20 items-center">
            <svg-icon icon-class="8" class="!w-16 !fill-blue-500 !h-16 block"/> 
            <div class="w-1/3">
              <span class="text-base">完播率</span>
              <div class="text-2xl font-bold mt-2">N/A</div>
            </div>
          </div>
          <div class="flex w-full h-1/3 justify-center space-x-20 items-center">
            <svg-icon icon-class="9" class="!w-16 !fill-blue-500 !h-16 block"/> 
            <div class="w-1/3">
              <span class="text-base">回头率</span>
              <div class="text-2xl font-bold mt-2">N/A</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="mt-5">
      <div id="mainChat" class="w-500px h-500px" style="width: 100%;height: 500px;"></div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
    this.initChats()
  },
  methods: {
    initChats(){
    let chats = echarts.init(document.getElementById('mainChat'));
    chats.setOption({
            title: {
            text: '店铺数据'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['消耗流量', '剩余流量', '招商经理总数', '经销商总数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '消耗流量',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '剩余流量',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '招商经理总数',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '经销商总数',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390, 330, 320]
            }
          ]
        });
        window.onresize = function () { // 自适应大小
          chats.resize();
        };
  }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
