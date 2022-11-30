import { createApp } from 'vue'
import App from './App.vue'
import MyButton from 'brand-mock-tool'

const app = createApp(App)
app.use(MyButton)
app.mount('#app')
