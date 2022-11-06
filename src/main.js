import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icons/iconfont.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'large', zIndex: 3000 })
  .mount('#app')
