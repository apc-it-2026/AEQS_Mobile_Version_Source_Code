import App from './App'
//引用并设置环境变量
import '.env.js'
import apis from 'util/apis.js'
import Vue from 'vue'
Vue.prototype.$apis = apis //请求接口
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import { mergeObj } from 'util/index'
Vue.prototype.$mergeObj = mergeObj //请求接口

// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
  props: {
    navbar: {
      bgColor: '#2b85e4',
      leftIconColor: "#FFF",
      titleStyle: () => {
        return {
          color: '#FFF'
        }
      }
    },
    textarea: {
      // count: true,
      autoHeight: true,
      maxlength: -1,

    }

  }
})
Vue.config.productionTip = false
App.mpType = 'app'
// 引入并使用vue-i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 引入语言包，注意路径
import zh from '@/i18n/zh.js';

// 构造i18n对象
const i18n = new VueI18n({
  // 默认语言，这里的local属性，对应message中的zh、en属性
  locale: 'zh',
  // 引入语言文件
  messages: {
    // 这里的属性名是任意的，您也可以把zh设置为cn等，只是后续切换语言时
    // 要标识这里的语言属性，如：this.$i18n.locale = zh|en|zh|xxx
    // zh, // 这里为上面通过import引入的语言包
  }
})

const app = new Vue({
  i18n,
  ...App
})
uni.$vue = app

app.$mount()
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}

