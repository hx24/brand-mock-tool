import Vue, { App } from "vue";
import MockDevtool from './MockDevtool/MockDevtool.vue'
import inspector from "./inspector";
import installMock from './utils/directive'

export default {
  install(app: App) {
    inspector.init()
    installMock(app)
  },
};


export { MockDevtool }