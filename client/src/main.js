import {createApp} from 'vue'
import router from './router/index'
import App from './App.vue';
import store from './store'

import './index.css'

const app = createApp(App).use(router).use(store)
app.mount('#app')
