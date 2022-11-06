<template>
      <div
      class="content"
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
  <div class="chart-wrap">
    <div class="chart">
      <div class="select-type">
        <el-select
          v-model="curDataType"
          placeholder="Select Data Type"
          @change="changeFolder"
        >
          <el-option align="center"
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="mean-min-max-box">
        <div class="min-max-mean">
          <div class="avg-box">
            <div class="title">
              Average Values
              <el-button
                style="margin-left: 10px"
                type="primary"
                @click="getMeanData"
                size="default"
                >Search</el-button
              >
            </div>
            <div class="hover_wrapper">
              <div class = "button1">
                <span class ="question httbangzhu" @mouseover="showHover=true" @mouseout="showHover=false"></span>
              </div> 
                  <div class="instructions" v-if="showHover">
                      Check the average value (maximum 4 data types) in a specific time period
                  </div>
            </div>
            <div class="filter-bar">
              <el-date-picker
                v-model="avgSearchForm.date"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
              <el-select
                :multiple-limit="4"
                v-model="selectSetting.avg[curDataType]"
                placeholder="Select field"
                multiple
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option align="center"
                  v-for="item in fieldsOption[curDataType]"
                  :key="`avg-${item.key}`"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </div>
            <div class="table">
              <div class="cur-table">
                <div class="field table-row">
                  <template
                    v-for="item in fieldsOption[curDataType]"
                    :key="`avg1-label-${item}`"
                  >
                    <div
                      v-if="selectSetting.avg[curDataType].includes(item.key)"
                      class="label table-ceil"
                    >
                      {{ item.label }}
                    </div>
                  </template>
                </div>

                <div class="field table-row">
                  <div
                    v-for="item in selectSetting.avg[curDataType]"
                    :key="`avg-label-${item}`"
                    class="label table-ceil"
                  >
                    {{ meanData[item] ? (meanData[item] * 1).toFixed(3) : 0 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mm-box">
            <div class="title">
              Max and Min Values
              <el-button
                style="margin-left: 10px"
                type="primary"
                size="default"
                @click="getMinMaxData"
                >Search</el-button
              >
            </div>
            <div class="hover_wrapper2">
              <div class = "button3">
                <span class ="question httbangzhu" @mouseover="showHover2=true" @mouseout="showHover2=false"></span>
              </div>
                <div class="instructions2" v-if="showHover2">
                    Check the maximum and minimum values (maximum 4 data types) in a specific time period
                </div>
            </div>
          
            <div class="filter-bar">
              <el-date-picker
                v-model="minMaxSearchForm.date"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
              <el-select
                :multiple-limit="4"
                v-model="selectSetting.minMax[curDataType]"
                placeholder="Select field"
                multiple
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option align="center"
                  v-for="item in fieldsOption[curDataType]"
                  :key="`min-max-${item.key}`"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </div>

            
            <div class="table">
              <div class="cur-table">
                <div class="field table-row">
                  <div class="label table-ceil">Type</div>
                  <template
                    v-for="item in fieldsOption[curDataType]"
                    :key="`tt-label-${item}`"
                  >
                    <div
                      v-if="
                        selectSetting.minMax[curDataType].includes(item.key)
                      "
                      class="label table-ceil"
                    >
                      {{ item.label }}
                    </div>
                  </template>
                </div>

                <div class="field table-row">
                  <div class="label table-ceil">Min</div>
                  <div
                    v-for="item in selectSetting.minMax[curDataType]"
                    :key="`min-label-${item}`"
                    class="label table-ceil"
                  >
                    {{
                      mimMaxData.min && mimMaxData.min[item]
                        ? (mimMaxData.min[item] * 1).toFixed(3)
                        : 0
                    }}
                  </div>
                </div>

                <div class="field table-row">
                  <div class="label table-ceil">Max</div>
                  <div
                    v-for="item in selectSetting.minMax[curDataType]"
                    :key="`max-label-${item}`"
                    class="label table-ceil"
                  >
                    {{
                      mimMaxData.max && mimMaxData.max[item]
                        ? (mimMaxData.max[item] * 1).toFixed(3)
                        : 0
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-box">        
        <div class = "header1">
          <div class="title1">
            Periodically Changes
          </div>
          <div class="hover_wrapper1">
            <div class = "button2">
              <span class ="question httbangzhu" @mouseover="showHover1=true" @mouseout="showHover1=false"></span>
            </div>
                <div class="instructions1" v-if="showHover1">
                  Check the average or maximum or minimum values (maximum 4 data types) and how those data changes (trend) in a specific time period (7 different time periods as intervals)
                </div>
          </div>
        </div>
        <div class="filter-bar">
          <el-date-picker
            style="margin-right: 10px; margin-bottom: 10px"
            class="date-picker"
            v-model="chartSearchForm.date"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
          <el-select
            :multiple-limit="4"
            v-model="selectSetting.chart[curDataType]"
            placeholder="Select field"
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option align="center"
              v-for="item in fieldsOption[curDataType]"
              :key="`chart-${item.key}`"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
          <el-select
            v-model="chartSearchForm.method"
            placeholder="Select Specific Data Type"
          >
            <el-option align="center"
              v-for="item in ['AVG', 'MIN', 'MAX']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="chartSearchForm.interval"
            placeholder="Select interval"
          >
            <el-option align="center"
              v-for="item in dateIntervalSelectOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-button
            style="margin-left: 10px"
            type="primary"
            @click="getChartData"
            >Search</el-button
          >
        </div>
        
        <div id="custom-chart"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  typeOptions,
  bldngDict,
  dateIntervalSelectOptions,
  fieldsOption,
  shortcuts,
} from '@/utils/constants'
import { getMinMaxData, getMeanData, getChartData } from '@/api/request'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  props: {},
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Chart',
  data() {
    this.chart = null
    const createSelectData = () => {
      return {
        battery: [
          'energy_price',
          'expected_energy',
          'raise_6_sec_price',
          'raise_60_sec_price',
        ],
        bldng_049: ['pv_w', 'pv_wh'],
        bldng_078: ['pv_w', 'pv_wh'],
      }
    }
    return {
      typeOptions,
      bldngDict,
      dateIntervalSelectOptions,
      shortcuts,
      fieldsOption,
      loading: false,
      curDataType: 'battery',
      showHover: false,
      showHover1: false,
      showHover2: false,
      avgSearchForm: {
        date: [new Date(2021, 0, 10, 10, 10), new Date(2021, 0, 18, 10, 10)],
        folder: 'battery',
      },
      minMaxSearchForm: {
        date: [new Date(2021, 0, 10, 10, 10), new Date(2021, 0, 18, 10, 10)],
        folder: 'battery',
      },
      chartSearchForm: {
        date: [new Date(2021, 0, 10, 10, 10), new Date(2021, 0, 18, 10, 10)],
        folder: 'battery',
        interval: 'hour',
        method: 'AVG',
      },
      selectSetting: {
        avg: createSelectData(),
        minMax: createSelectData(),
        chart: createSelectData(),
      },
      mimMaxData: {},
      meanData: {},
      chartData: {},
    }
  },
  mounted() {
    this.getMinMaxData()
    this.getMeanData()
    this.getChartData()
    window.addEventListener('resize', () => this.resize())
  },
  beforeUnmount() {
    window.removeEventListener('resize', () => () => this.resize())
  },
  methods: {
    changeFolder() {
      this.getMinMaxData()
      this.getMeanData()
      this.getChartData()
    },
    getCheckForm(searchForm, attr) {
      if (!['battery', 'bldng_049', 'bldng_078'].includes(searchForm.folder)) {
        ElMessage.error('invalid folder!')
        return
      }
      if (!searchForm.folder) {
        ElMessage.error('Please select a building!')
        return
      }
      if (!this.selectSetting[attr][searchForm.folder].length) {
        ElMessage.error('Please select the specified field!')
        return
      }
      if (searchForm.date.length !== 2) {
        ElMessage.error('Please select a start and end date time!')
        return
      }
      if (dayjs(searchForm.date[1]).isBefore(dayjs(searchForm.date[0]))) {
        ElMessage.error('start date time is after end date time!')
        return
      }
      const form = JSON.parse(JSON.stringify(searchForm))
      searchForm.folder = this.curDataType
      form.folder = this.curDataType
      form.start = dayjs(form.date[0]).format('YYYY-MM-DD HH:mm:ss')
      form.end = dayjs(form.date[1]).format('YYYY-MM-DD HH:mm:ss')
      if (attr === 'chart') {
        if (
          ![
            'minute',
            'hour',
            'day',
            'week',
            'month',
            'quarter',
            'year',
          ].includes(searchForm.interval)
        ) {
          ElMessage.error('invalid interval!')
          return
        }
        if (!['AVG', 'MIN', 'MAX'].includes(searchForm.method)) {
          ElMessage.error('invalid method!')
          return
        }
        const diff = dayjs(form.end).diff(form.start, searchForm.interval)
        if (diff < 1) {
          ElMessage.error('invalid interval!')
          return
        }
      }

      form.fields = this.selectSetting[attr][searchForm.folder]
      delete form.date
      return form
    },
    async getMinMaxData() {
      try {
        this.loading = true
        const form = this.getCheckForm(this.minMaxSearchForm, 'minMax')
        if (!form) {
          return
        }
        const res = await getMinMaxData(form)
        if (res && Object.keys(res).length) {
          this.mimMaxData = res
        }
      } catch (error) {
        console.log(error)
        ElMessage.error('request failed')
      }finally {
        this.loading = false
      }
    },
    async getMeanData() {
      try {
        this.loading = true
        const form = this.getCheckForm(this.avgSearchForm, 'avg')
        if (!form) {
          return
        }
        const res = await getMeanData(form)
        if (res && res.mean) {
          this.meanData = res.mean
        }
      } catch (error) {
        console.log(error)
        ElMessage.error('request failed')
      }finally {
        this.loading = false
      }
    },
    async getChartData() {
      try {
        this.loading = true
        const form = this.getCheckForm(this.chartSearchForm, 'chart')
        if (!form) {
          return
        }
        const res = await getChartData(form)
        if (res && Object.keys(res).length >= 2) {
          this.chartData = res
          this.drawChart()
        } else {
          ElMessage.error('No data or request exception')
        }
      } catch (error) {
        console.log(error)
        ElMessage.error('request failed')
      }finally {
        this.loading = false
      }
    },
    resize() {
      this.chart && this.chart.resize()
    },
    drawChart() {
      const series = []
      const colors = ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00']
      let index = 0
      for (const key in this.chartData) {
        if (Object.hasOwnProperty.call(this.chartData, key)) {
          if (key === 'date_time') {
            continue
          }
          const item = this.fieldsOption[this.curDataType].find(
            (item) => item.key === key
          )
          series.push({
            name: item.label,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            yAxisIndex: Math.max(...this.chartData[key]) > 100 ? 0 : 1,
            lineStyle: {
              color: colors[index],
              width: 2,
            },

            itemStyle: {
              color: colors[index],
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12,
            },
            data: this.chartData[key],
          })
          index++
        }
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index:10001',
        },
        legend: {
          top: '0%',
          color: '#2c3e50',
          fontSize: '12',
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true,
        },

        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#2c3e50',
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: '#2c3e50',
              },
            },

            data: this.chartData.date_time || [],
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: 'value',
            axisTick: { show: true },
            axisLine: {
              lineStyle: {
                color: '#2c3e50',
              },
            },
            axisLabel: {
              color: '#2c3e50',
              fontSize: 12,
            },

            splitLine: {
              lineStyle: {
                color: '#2c3e50',
              },
              show: false,
            },
          },
          {
            type: 'value',
            axisTick: { show: true },
            axisLine: {
              lineStyle: {
                color: '#2c3e50',
              },
            },
            axisLabel: {
              color: '#2c3e50',
              fontSize: 12,
            },

            splitLine: {
              lineStyle: {
                color: '#2c3e50',
              },
              show: false,
            },
          },
        ],
        series,
      }

      if (!this.chart) {
        this.chart = echarts.init(document.getElementById('custom-chart'))
      }
      this.chart.clear()
      this.chart.setOption(option)
    },
  },
}
</script>
<style lang="scss" scoped>

.chart-wrap {
  width: 100vw;
  display: flex;
  
  .chart {
    min-height: 92vh;
    width: 84vw;
    min-width: 900px;
    margin-left: 8vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .mean-min-max-box,

    .chart-box {
      margin-top: 1%;
      margin-bottom: 1%;
      width: 100%;
    }
    .mean-min-max-box {
      min-height: 32vh;

      .select-type,
      .min-max-mean {
        height: 100%;
      }
      .select-type {
        margin-left: 10%;
        width: 100%;

      }
      .min-max-mean {
        height: 100%;
        display: flex;
        justify-content: space-between;
        .avg-box,
        .mm-box {
          width: 45%;
          padding: 20px 20px 5px;
          background-color: rgba(255, 255, 255, 0.6);
          .filter-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }
          .table {
            .cur-table {
              display: table;
              border-top: 1px solid #b5c2d6;
              border-left: 1px solid #b5c2d6;
              padding-bottom: 0;
              margin-bottom: 10px;
              .table-row {
                display: table-row;
                width: 100%;
                .table-ceil {
                  display: table-cell;
                  vertical-align: middle;
                  padding: 10px 12px;
                  border-right: 1px solid #b5c2d6;
                  border-bottom: 1px solid #b5c2d6;
                }
                .bldng_049,
                .bldng_078 {
                  width: 18vw;
                }
              }
            }
          }
        }
        .avg-box {
          // margin-bottom: 20px;
          // height: 40%;
        }
        .mm-box {
          // height: 48%;
        }
      }
    }
    .chart-box {
      min-height: 46vh;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 106%;
      margin-left: -3%;
      .filter-bar {
        width: 100%;
        margin-left: 50px;
        text-align: center;
        .el-select {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      #custom-chart {
        width: 95%;
        height: 75%;
      }

      .header1 {
        width: 400px;
        height:60px;    
      }
      .title1 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            margin-top: 20px;
            display: inline-block;
            text-align: center;
          }
    }
  }
}

.hover_wrapper{
  margin-top: 0%;
    margin-bottom: 1%;
    position: relative;
    display: flex;
    .button1{
        size: 100px;
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;
        margin-bottom: 1.5%;
    }
    .button1:hover {
      color: black;
      transition: ease 1s;
    } 
    
    .instructions{
        width: 700px;
        height: 40px;
        border-radius: 8px;
        text-align: left;
        line-height: 40px;
        position: absolute;
        left: 45px;
        top: 50%;
        z-index: 99;
        transform: translateY(-50%);
    }
  }

  .hover_wrapper1{
    margin-bottom: 1%;
    position: relative;
    display: inline-flex;
    .button2{
        width: 40px;
        height: 40px;
        position: relative;
        cursor: pointer;
        padding-top:10%;
        margin-bottom: 1.5%;
    }
    .button2:hover {
      color: black;
      transition: ease 1s;
    } 
    
    .instructions1{
        width: 550px;
        height: 100px;
        border-radius: 8px;
        text-align: left;
        line-height: 19px;
        position: absolute;
        left: 55px;
        top: 95%;
        z-index: 99;
        transform: translateY(-50%);
    }
  }

  .hover_wrapper2{
    margin-top: 0%;
    margin-bottom: 1%;
    position: relative;
    display: flex;
    .button3{
        size: 100px;
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;
        margin-bottom: 1.5%;
    }
    .button3:hover {
      color: black;
      transition: ease 1s;
    } 
    
    .instructions2{
        width: 700px;
        height: 50px;
        border-radius: 8px;
        text-align: center;
        line-height: 50px;
        position: absolute;
        left: 50px;
        top: 50%;
        z-index: 99;
        transform: translateY(-50%);
        
    }
  }
  :deep .el-select .el-input__inner {
      text-align: center;
    }

    :deep .el-input__inner {
    text-align: center;
  }
</style>
