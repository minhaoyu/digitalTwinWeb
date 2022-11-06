<template>
  <div id="unity-container" class="unity-desktop">
    <div class = "hover_wrapper">
      <div class="instructions" v-if="showHover">
       Expand the Digital Model
      </div>
      <div @click="fullscreen" id="unity-fullscreen-button">
        <img src="/model3d/TemplateData/fullscreen-button.png" alt=""  style="width: 150%; height: 150%" @mouseover="showHover=true" @mouseout="showHover=false">
      </div>
    </div>
    <iframe
      ref="iframe"
      width="100%"
      height="100%"
      src="/model3d/index.html"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Model3D',
  props: {},
  data() {
    return {
      unityInstance: null,
      showHover: false,
    }
  },
  mounted() {
    // this.init()
  },
  beforeUnmount() {
    // this.unityInstance && this.unityInstance.Quit()
    //
  },
  methods: {
    fullscreen() {
      this.$refs.iframe.contentWindow.unityInstance &&
        this.$refs.iframe.contentWindow.unityInstance.SetFullscreen(1)
    },
    init() {
      if (this.unityInstance) {
        return
      }
      const container = document.querySelector('#unity-container')
      const canvas = document.querySelector('#unity-canvas')
      const loadingBar = document.querySelector('#unity-loading-bar')
      const progressBarFull = document.querySelector('#unity-progress-bar-full')
      const fullscreenButton = document.querySelector(
        '#unity-fullscreen-button'
      )
      const warningBanner = document.querySelector('#unity-warning')

      /**  Shows a temporary message banner/ribbon for a few seconds, or
      a permanent error message on top of the canvas if type=='error'.
      */
      function unityShowBanner(msg, type) {
        function updateBannerVisibility() {
          warningBanner.style.display = warningBanner.children.length
            ? 'block'
            : 'none'
        }
        const div = document.createElement('div')
        div.innerHTML = msg
        warningBanner.appendChild(div)
        if (type == 'error') div.style = 'background: red; padding: 10px;'
        else {
          if (type == 'warning')
            div.style = 'background: yellow; padding: 10px;'
          setTimeout(function () {
            warningBanner.removeChild(div)
            updateBannerVisibility()
          }, 5000)
        }
        updateBannerVisibility()
      }

      const buildUrl = 'model3d/Build'
      const loaderUrl = buildUrl + '/digital twin.loader.js'
      const config = {
        dataUrl: buildUrl + '/digital twin.data',
        frameworkUrl: buildUrl + '/digital twin.framework.js',
        codeUrl: buildUrl + '/digital twin.wasm',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DefaultCompany',
        productName: 'My project (1)',
        productVersion: '0.1',
        showBanner: unityShowBanner,
      }

      /**  By default Unity keeps WebGL canvas render target size matched with
      the DOM size of the canvas element (scaled by window.devicePixelRatio)

      Set this to false if you want to decouple this synchronization from
      happening inside the engine, and you would like to size up
      the canvas DOM size and WebGL render target sizes.
      config.matchWebGLToCanvasSize = false; */

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:

        const meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content =
          'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
        document.getElementsByTagName('head')[0].appendChild(meta)
        container.className = 'unity-mobile'

        /** If aim To lower canvas resolution on mobile devices, uncomment the following line:
        config.devicePixelRatio = 1; */

        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'

        unityShowBanner('WebGL builds are not supported on mobile devices.')
      } else {
        // Desktop style: Render the canvas which could be maximized to fullscreen:
        canvas.style.width = '100%'
        canvas.style.height = '100%'
      }

      loadingBar.style.display = 'block'

      const script = document.createElement('script')
      script.src = loaderUrl
      script.onload = () => {
        window
          .createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + '%'
          })
          .then((unityInstance) => {
            this.unityInstance = unityInstance
            loadingBar.style.display = 'none'
            console.log(unityInstance)
            fullscreenButton.onclick = () => {
              unityInstance.SetFullscreen(1)
            }
          })
          .catch((message) => {
            alert(message)
          })
      }
      document.body.appendChild(script)
    },
  },
}
</script>
<style scoped lang="scss">
.unity-desktop {
  width: 100%;
  height: 85vh;
  position: relative;

  .hover_wrapper{
    display: inline-flex;
    .instructions{
        width: 250px;
        height: 50px;
        border-radius: 8px;
        text-align: center;
        line-height: 50px;
        position: absolute;
        left: 43%;
        top: 81%;
        z-index: 99;
        transform: translateY(-50%);
        display: inline-block;
        font-size: 20px;
    }
    #unity-fullscreen-button {
    position: absolute;
    bottom: 60px;
    margin-left:48%;
    cursor: pointer;
    z-index: 10000;
    display:inline-block

  }
}
}
</style>
