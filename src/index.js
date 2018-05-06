import Vue from 'vue'
import App from'./app.vue'

import './assets/styles/global.styl'
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)   // h 即createApp 这里声明组件渲染出来的是app的内容
}).$mount(root) //挂载到root上面
