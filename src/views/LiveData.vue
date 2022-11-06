<template>
  <div class="live-data">
    <div
      class="content"
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
    <div class="target-serch">
      <div class="search-bar">
        <div class="hover_wrapper1">
        <div class ="button1">
          <span class ="question httbangzhu" @mouseover="showHover2=true" @mouseout="showHover2=false"></span> 
        </div>
        <div class="instructions1" v-if="showHover2">
          Search for data types for a period of time (input time points in two input boxes) or specific time point (input specific time point in one input box) within the start and end date (input start and end date)
        </div>           
      </div>
        <div class="filter-box">
          <div class="filter-item">
            <el-date-picker
              value-format="YYYY-MM-DD"
              style="width: 200px"
              v-model="searchForm.date1"
              type="date"
              placeholder="Pick start day"
            />
          </div>
          <div class="filter-item">
            <el-date-picker
              value-format="YYYY-MM-DD"
              style="width: 200px"
              v-model="searchForm.date2"
              type="date"
              placeholder="Pick end day"
            />
          </div>
          <div class="filter-item">
            <el-time-picker
              style="width: 200px"
              value-format="HH:mm:ss"
              v-model="searchForm.time1"
              placeholder="Pick start time"
            />
          </div>
          <div class="filter-item">
            <el-time-picker
              value-format="HH:mm:ss"
              style="width: 200px"
              v-model="searchForm.time2"
              placeholder="Pick end time"
            />
          </div>
          <div class="filter-item">
            <el-select
              style="width: 310px"
              v-model="searchForm.folder"
              placeholder="Select specific building or Tesla battery"
              @change="changeFolder"
            >
              <el-option align="center"
                v-for="item in typeOptions"
                :key="`sk-${item.value}`"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="btns">
              <el-button @click="searchData" type="primary"
                >Target Search</el-button>
            </div> 
          </div>
          
        </div>
      </div>
    </div>
    <div class="table-box">
      <div class="real-data-bar">
        <span class = "text1">Real-Time Data Panel Of</span>
        <el-select
          v-model="curRealTimeType"
          placeholder="Select Real Time Data Type"
          :popper-append-to-body="false"
        >
          <el-option align="center"
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="hover_wrapper2">
        <div class ="button2">
          <span class ="question httbangzhu" @mouseover="showHover3=true" @mouseout="showHover3=false"></span> 
        </div>
        <div class="instructions2" v-if="showHover3">
            Check the real time data (only selected 8 data types will be presented when selecting Tesla Battery) in last 10 minutes from now (auto refreshed)
        </div>           
      </div>
      <div class="cur-table">
        <div class="field table-row">
          <div
            v-for="item in rtdict[curRealTimeType]"
            :key="`label-${item.label}`"
            class="label table-ceil"
            :class="curRealTimeType"
          >
            {{ item.label }}
          </div>
        </div>

        <div
          class="field table-row"
          v-for="(row, index) in realTimeDatas"
          :key="`real-time-row-${index}`"
        >
          <div
            v-for="item in rtdict[curRealTimeType]"
            :key="`value-${item.label}-${index}`"
            class="label table-ceil"
            :class="curRealTimeType"
          >
            {{ row[curRealTimeType][item.key] }} {{ item.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <el-dialog
    v-model="dialogTableVisible"
    :title="searchForm.folder"
    width="95%"
    top="30px"
  >
    <el-table :data="currentData" max-height="800" border>
      <template
        v-for="(item, index) in curFields"
        :key="`item-tab-${item.key}-${index}`"
      >
        <el-table-column
          v-if="selectSetting[searchForm.folder].includes(item.key)"
          :property="item.key"                  
          :label="item.label"
 

        />
      </template>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[50, 100, 200, 300, 400]"
      layout="total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-dialog>
</template>

<script>
import { getRealData, getMinmaxData, searchData } from '@/api/request'
import {
  miMaxBatteryDataLabels,
  realtimeBatteryUnit,
  typeOptions,
  bldngDict,
  realTimeBatteryDict,
  realTimeBldngDict,
} from '@/utils/constants'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { formatNum, getNumVal } from '@/utils/tool'
export default {
  props: {},
  name: 'LiveData',
  data() {
    return {
      showHover2: false,
      showHover3: false,
      miMaxBatteryDataLabels,
      realtimeBatteryUnit,
      typeOptions,
      bldngDict,

      minMaxData: {},
      filterData: [],
      selectDate: [],
      searchForm: {
        date1: undefined,
        date2: undefined,
        time1: undefined,
        time2: undefined,
        folder: undefined,
        method: undefined,
      },
      dialogTableVisible: false,
      currentPage: 1,
      pageSize: 50,
      total: 0,
      loading: false,
      timer: null,
      curRealTimeType: 'battery',
      realTimeDataCount: 10,
      realTimeDatas: [],
      rtdict: {
        battery: realTimeBatteryDict,
        bldng_049: realTimeBldngDict,
        bldng_078: realTimeBldngDict,
      },
      selectFields: [],
      selectSetting: {
        battery: [
          "measurement_time",
          'full_charge_energy',
          'nominal_energy',
          'expected_energy',
          'real_energy_imported',
          'real_energy_exported',
          'reactive_energy_imported',
          'reactive_energy_exported',
          'energy_price',
        ],
        bldng_049: [ 'date', 'time', 'pv_w', 'pv_wh'],
        bldng_078: [ 'date', 'time', 'pv_w', 'pv_wh'],
      },
      tableData: [],
    }
  },
  mounted() {
    this.loadData()
    this.timer = setInterval(() => this.loadData(), 60 * 1000)
  },
  beforeUnmount() {
    this.timer && clearInterval(this.timer)
  },
  computed: {
    minData() {
      if (!this.minMaxData.min) {
        return {}
      }
      return this.minMaxData.min
    },
    maxData() {
      if (!this.minMaxData.max) {
        return {}
      }
      return this.minMaxData.max
    },
    currentData() {
      if (!this.filterData.length) {
        return []
      }
      return this.filterData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    },
    curFields() {
      if (!this.searchForm.folder) {
        return []
      }
      if (this.searchForm.folder === 'battery') {
        return miMaxBatteryDataLabels
      }
      return bldngDict
    },
  },
  methods: {
    formatNum,
    getNumVal,
    changeFolder() {
      // this.selectFields = []
    },
    changeField() {},
    handleSizeChange(val) {
      console.log(`${val} items per page`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`${val} items per page`)
      this.currentPage = val
    },
    getSearchForm() {
      this.searchForm.time = undefined
      for (const key in this.searchForm) {
        if (Object.hasOwnProperty.call(this.searchForm, key)) {
          this.searchForm[key] = this.searchForm[key] || undefined
        }
      }
      this.searchForm.method = undefined
      const { date1, date2, time1, time2, folder } = this.searchForm
      if (!folder) {
        ElMessage.error('Please select specific building or battery')
        return
      }
      const emptyDate = !date1 && !date2
      const fullDate = date1 && date2
      const fullTime = time1 && time2
      const emptyTime = !time1 && !time2
      const singleTime = !fullTime && !emptyTime
      const singleDate = !fullDate && !emptyDate
      if (fullDate && dayjs(date2).isBefore(dayjs(date1))) {
        ElMessage.error('start date is after end date!')
        return
      }
      if (fullTime) {
        if (
          emptyDate &&
          dayjs(`2022-01-01 ${time2}`).isBefore(dayjs(`2022-01-01 ${time1}`))
        ) {
          ElMessage.error('start time is after end time!')
          return
        }
        if (
          fullDate &&
          dayjs(`${date2} ${time2}`).isBefore(dayjs(`${date1} ${time1}`))
        ) {
          ElMessage.error('start date time is after end date time!')
          return
        }
      }
      // if start date and end date is empty, one of the start time and end time is empty
      if (emptyDate && singleTime) {
        this.searchForm.method = 'single time'
        return {
          folder,
          method: 'single time',
          time: time1 || time2,
        }
      }
      // if start date and end date is empty
      if (emptyDate && !emptyTime) {
        this.searchForm.method = 'time period'
        return {
          folder,
          method: 'time period',
          time1,
          time2,
        }
      }
      // if start time and end time are empty, one of the start data and end date is empty
      if (emptyTime && singleDate) {
        this.searchForm.method = 'single date'
        return {
          date: date1 || date2,
          folder,
          method: 'single date',
        }
      }
      // if start time and end time are empty
      if (emptyTime && !emptyDate) {
        this.searchForm.method = 'date period'
        return {
          date1,
          date2,
          folder,
          method: 'date period',
        }
      }
      // if start time and start date are not empty, others are; or if end time and end date are not empty, others are
      if (
        (date1 && time1 && !date2 && !time2) ||
        (date2 && time2 && !date1 && !time1)
      ) {
        this.searchForm.method = 'single date with single time'
        return {
          datetime: date1 && time1 ? `${date1} ${time1}` : `${date2} ${time2}`,
          folder,
          method: 'single date with single time',
        }
      }
      // if one of the start time or end time is empty
      if (!emptyDate && singleTime) {
        return {
          date1,
          date2,
          folder,
          method: 'period of date with single time',
          time: time1 || time2,
        }
      }
      // all are fullfilled
      if (!emptyDate && !emptyTime) {
        this.searchForm.method = 'date time period'
        return {
          datetime1: `${date1} ${time1}`,
          datetime2: `${date2} ${time2}`,
          folder,
          method: 'date time period',
        }
      }
      ElMessage.error('At least one time or date option is required')
    },
    async searchData() {
      try {
        this.loading = true
        const searchForm = this.getSearchForm()
        console.log(searchForm, this.searchForm)
        if (!searchForm) {
          return
        }
        const res = (await searchData(searchForm)) || []
        if (Array.isArray(res)) {
          this.filterData = res.sort((a, b) => b.id - a.id)
          console.log(this.filterData)
          this.total = res.length
          this.currentPage = 1
          this.dialogTableVisible = true
          return
        }
        ElMessage.error(res.message || 'no data has been found')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    formatDate(date) {
      if (!date) {
        return ''
      }
      // return dayjs.utc(date).utcOffset(-10, true).format('YYYY-MM-DD HH:mm:ss')
      return dayjs(date).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')
    },
    async loadRealData() {
      try {
        const res = await getRealData()
        if (!res || !res.datas) {
          return
        }
        if (this.realTimeDatas.length >= this.realTimeDataCount) {
          this.realTimeDatas.shift()
        }
        this.realTimeDatas.push(res.datas)
      } catch (error) {
        console.log(error)
      }
    },
    async loadMinMaxData() {
      try {
        this.minMaxData = (await getMinmaxData()) || {}
      } catch (error) {
        console.log(error)
      }
    },
    async loadData() {
      try {
        // Promise.all([this.loadRealData(), this.loadMinMaxData()])
        await this.loadRealData()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.live-data {
  min-height: 92vh;
  width: 80vw;
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .target-serch,
  .table-box {
    text-align: left;
    font-size: 15px;
    margin-bottom: 3vh;
  }
  $bg-color: rgba(255, 255, 255, 0.6);
  .target-serch {
    min-height: 25vh;
    display: flex;
    margin-left: 500px;
    
    .search-bar {
      margin-top:5%;
      padding: 20px;
      width: 500px;
      height: 100%;
      background-color: $bg-color;
      .btns {
        text-align: center;
        display: inline;
        margin-left: 40px
      }
      .filter-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;
        .filter-item {
          margin-bottom: 15px;
        }
      }
    }
  }
  .table-box {
    margin-top:30px;
    padding: 30px;
    height: 85vh;
    background-color: $bg-color;
    .real-data-bar {
      align-items: center;
      margin-bottom: 1%;
      float: left;
    }
    .text1 {
      margin-right: 3px;
    }
    .cur-table {
      display: table;
      border-top: 1px solid #b5c2d6;
      border-left: 1px solid #b5c2d6;
      margin-bottom: 8px;
      padding-bottom: 0 !important;
      float: left;
      .table-row {
        display: table-row;
        .table-ceil {
          display: table-cell;
          vertical-align: middle;
          padding: 10px 10px;
          border-right: 1px solid #b5c2d6;
          border-bottom: 1px solid #b5c2d6;
          text-align: center;
        }
        .battery {
          width: 12vw;
          font-size: 15px;
        }
        .bldng_049,
        .bldng_078 {
          width: 18vw;
        }
      }
    }

  }
  .hover_wrapper1{
    margin-bottom:5.5%;
    position: relative;
    .button1{
        size: 100px;
        width: 20px;
        height: 20px;
        line-height: 30px;
        position: relative;
        cursor: pointer;
    }
    .button1:hover {
      color: black;
      transition: ease 1s;
    } 
    
    .instructions1{
      display:inline-block;
        width: 450px;
        height: 20px;
        border-radius: 8px;
        text-align: left;
        line-height: 20px;
        position: absolute;
        left: 40px;
        top: 7%;
        z-index: 99;
        transform: translateY(-50%);
    }
  }

  .hover_wrapper2{
    margin-top: 0.2%;
    margin-left: 2%;
    margin-bottom:2%;
    position: relative;
    float: left;
    display:inline;
    .button2{
        size: 100px;
        width: 20px;
        height: 20px;
        line-height: 30px;
        position: relative;
        cursor: pointer;

    }
    .button2:hover {
      color: black;
      transition: ease 1s;
    } 
    
    .instructions2{
        width: 1000px;
        height: 40px;
        border-radius: 8px;
        text-align: left;
        line-height: 40px;
        position: absolute;
        left: 45px;
        top: 75%;
        z-index: 99;
        transform: translateY(-50%);
    }
  }
}
:deep .el-select .el-input__inner {
      text-align: center;
    }

  :deep .el-input__inner {
    text-align: center;
  }
</style>