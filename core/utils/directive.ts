import { App } from "vue";
import { DATA_MOCK_ID, ATTR_MOCK_CB } from '../constants'

const mock = (el: any, binding: any) => {
  if (el && binding.value) {
    const {
      value: { id, cb },
    } = binding
    el.setAttribute(DATA_MOCK_ID, id)
    el[ATTR_MOCK_CB] = cb
  }
}

export default function installMock(app: App) {
  app.directive('mock', {
    mounted: mock,
    // @ts-ignore
    // 兼容Vue2 暂时处理
    inserted: mock
  })
}
