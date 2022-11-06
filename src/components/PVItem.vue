<template>
  <div class="pv-item">
    <div class="cl-title">{{ title }}</div>
    <div class="row">
      <div class="col">
        <div class="label">Date Time：</div>
        <div class="num">
          {{ realTimeData ? realTimeData[0] : '' }}
          {{ realTimeData ? realTimeData[1] : '' }}
        </div>
      </div>
      <div class="col">
        <div class="label">PV W：</div>
        <div class="num">
          {{ formatNum(realTimeData ? realTimeData[2] : 0) }}
        </div>
      </div>
      <div class="col">
        <div class="label">PV Wh：</div>
        <div class="num">
          {{ formatNum(realTimeData ? realTimeData[3] : 0) }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="label">PV W：</div>
        <div class="num">
          {{ getNumVal('PV_W_049', meanData) }}
        </div>
      </div>
      <div class="col">
        <div class="label">PV Wh：</div>
        <div class="num">
          {{ getNumVal('PV_Wh_049', meanData) }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="label">PV W：</div>
        <div class="num">
          【 {{ getNumVal('pv_w', minData) }}】 【
          {{ getNumVal('pv_w', maxData) }}】
        </div>
      </div>
      <div class="col">
        <div class="label">PV Wh：</div>
        <div class="num">
          【 {{ getNumVal('pv_wh', minData) }}】 【
          {{ getNumVal('pv_wh', maxData) }}】
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNum, getNumVal } from '@/utils/tool'
export default {
  props: {
    realTimeData: {
      type: Array,
      default: () => [],
    },
    minData: {
      type: Object,
      default: () => ({}),
    },
    maxData: {
      type: Object,
      default: () => ({}),
    },
    meanData: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
  },
  name: 'PVItem',
  data() {
    return {}
  },
  methods: {
    formatNum,
    getNumVal,
  },
}
</script>

<style lang="scss" scoped>
.pv-item {
  border: 1px rgb(42, 230, 236) solid;
  border-bottom: none;
  .cl-title {
    color: #fff;
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    border-bottom: 1px rgb(42, 230, 236) solid;
    font-size: 20px;
    font-weight: bold;
  }
  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    padding-bottom: 5px;
    border-bottom: 1px rgb(42, 230, 236) solid;
    .col {
      color: #fff;
      display: flex;
      justify-content: space-evenly;
      margin-right: 5px;
      margin-bottom: 10px;
      font-size: 15px;
      .label {
        color: #ffffff;
        background-color: #1a7d23;
        padding: 2px 4px;
      }
      .num {
        color: #ffffff;
        background-color: #0e94ea;
        padding: 2px 4px;
      }
    }
  }
}
</style>
