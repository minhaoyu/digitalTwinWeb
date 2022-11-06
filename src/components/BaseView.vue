<template>
  <div class="base-view">
    <div class="top-title">
      <img class="top-title-pic" :src="bgPic" alt="" />
      <div class="top-title-text">UQ Digital Twin Visualization Platform</div>
    </div>
    
    <Model3D class="model-3d" v-if="showModel()"></Model3D>

    <div class="content">
      <div class="menu-box">
        <div class="menu-box-wrap">
          <div
            data-mfb-label="Home Page & About Us"
            class="menu-item"
            :class="getClass('Home')"
            @click="toPage('Home')"
          >
            <el-icon>
              <svg
                t="1663747073106"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10604"
              >
                <path
                  d="M841.142857 566.857143l0 274.285714q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-219.428571 0 0-219.428571-146.285714 0 0 219.428571-219.428571 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-274.285714q0-0.571429 2.857143-1.714286t2.857143-1.714286l328.571429-270.857143 328.571429 270.857143q0.571429 1.142857 0.571429 3.428571zm127.428571-39.428571l-35.428571 42.285714q-4.571429 5.142857-12 6.285714l-1.714286 0q-7.428571 0-12-4l-395.428571-329.714286-395.428571 329.714286q-6.857143 4.571429-13.714286 4-7.428571-1.142857-12-6.285714l-35.428571-42.285714q-4.571429-5.714286-4-13.428571t6.285714-12.285714l410.857143-342.285714q18.285714-14.857143 43.428571-14.857143t43.428571 14.857143l139.428571 116.571429 0-111.428571q0-8 5.142857-13.142857t13.142857-5.142857l109.714286 0q8 0 13.142857 5.142857t5.142857 13.142857l0 233.142857 125.142857 104q5.714286 4.571429 6.285714 12.285714t-4 13.428571z"
                  p-id="10605"
                ></path>
              </svg>
            </el-icon>
          </div>
          <div
            class="menu-item"
            data-mfb-label="Live Data & Targeted Search"
            :class="getClass('LiveData')"
            @click="toPage('LiveData')"
          >
            <el-icon>
              <svg
                t="1663746998690"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8885"
              >
                <path
                  d="M647.725 840.897c0 0 93.091 0 93.091-93.091L740.816 282.353c0-93.091-93.091-93.091-93.091-93.091L93.091 189.262c0 0-93.091 0-93.091 93.091l0 465.453c0 93.091 93.091 93.091 93.091 93.091L647.725 840.897zM795.041 371.115 795.041 660.72l228.956 180.177L1023.997 189.263 795.041 371.115z"
                  p-id="8886"
                ></path>
              </svg>
            </el-icon>
          </div>
          <div
            class="menu-item"
            data-mfb-label="Periodically Data & Cyclical Changes"
            :class="getClass('Chart')"
            @click="toPage('Chart')"
          >
            <el-icon
              ><svg
                t="1663746823828"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3993"
              >
                <path
                  d="M1000 768c13.2 0 24 10.8 24 24v80c0 13.2-10.8 24-24 24H24c-13.2 0-24-10.8-24-24V152c0-13.2 10.8-24 24-24h80c13.2 0 24 10.8 24 24v616h872zM912 192H688c-42.8 0-64.2 51.8-34 82l65.8 65.8-144 145.8-111.2-111.2c-9.4-9.4-24.4-9.4-33.8 0L192.8 610c-9.4 9.2-9.6 24.4-0.4 33.8l57 58.8c9.4 9.6 24.8 9.8 34.2 0.2l164.2-164.2 111 111c9.4 9.4 24.6 9.4 34 0l218.4-218.4L878 498c30.2 30.2 82 8.8 82-34V240c0-26.6-21.4-48-48-48z"
                  fill=""
                  p-id="3994"
                ></path></svg
            ></el-icon>
          </div>
        </div>
      </div>
      <div class="view-content-box">
        <slot name="view-content-box"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Model3D from '@/components/Model3D.vue'
import bgPic from '@/assets/image/bg_top1.png'

export default {
  props: {},
  components: {
    Model3D,
  },
  name: 'BaseView',
  data() {
    return {
      bgPic,
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUnmount() {},
  computed: {},
  watch: {},
  methods: {
    showModel() {
      return ['Home'].includes(this.$router.currentRoute.value.name)
    },
    toPage(name) {
      this.$router.push({ name })
    },
    getClass(name) {
      return this.$router.currentRoute.value &&
        name === this.$router.currentRoute.value.name
        ? 'active'
        : ''
    },
  },
}
</script>

<style scoped lang="scss">
.base-view {
  height: 100%;
  width: 100vw;
  position: relative;
  .top-title {
    width: 100%;
    position: relative;
    .top-title-pic {
      height: 7.5vh;
      width: 100vw;
    }
    .top-title-text {
      position: absolute;
      top: 0;
      color: #f5f5f5;
      width: 100%;
      height: 6vh;
      line-height: 6vh;
      text-align: center;
      font-weight: bold;
      font-size: 25px;
    }
  }
  .content {
    position: absolute;
    top: 8vh;
    height: 92vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .menu-box {
      height: 98%;
      width: 100px;
      display: flex;
      // align-items: center;
      // margin-top: 1vh;
      z-index: 1000;
      .menu-box-wrap {
        width: 76px;
        height: 40vh;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0);
        .menu-item {
          position: relative;
          height: 38px;
          line-height: 38px;
          padding: 5px;
          cursor: pointer;
          &:after {
            content: attr(data-mfb-label);
            opacity: 0;
            // width: 100%;
            height: 38px;
            line-height: 38px;
            transition: all 0.5s;
            background: rgba(0, 0, 0, 0.4);
            padding: 5px 15px 5px 10px;
            top: 0px;
            border-radius: 0px 5px 5px 0px;
            color: #fff;
            font-size: 15px;
            pointer-events: none;
            position: absolute;
            transition: all 0.5s;
            white-space: nowrap;
          }

          &:hover::after {
            opacity:1;
            margin-left: 20.5px
          }

          &.active {
            opacity: 1;
            background: rgba(0, 0, 0, 0.4);
          }
          &:hover {
            background: rgba(0, 0, 0, 0.4);
          }
          .el-icon {
            font-size: 35px;
            color: #fff;
            cursor: pointer;
          }
          .el-icon::after {
            opacity: 0;
          }
        }
      }
    }
    .view-content-box {
      position: absolute;
      top: 0px;
    }
  }
}
</style>
<style>
body {
  background-color: #b5c2d6;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>
