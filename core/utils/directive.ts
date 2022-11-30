import { App } from "vue";
import { DATA_MOCK_ID, ATTR_MOCK_CB } from '../constants'

export default function installMock(app: App) {
  app.directive('mock', {
    mounted: function (el, binding) {
      if (el && binding.value) {
        const {
          value: { id, cb },
        } = binding
        el.setAttribute(DATA_MOCK_ID, id)
        el[ATTR_MOCK_CB] = cb
      }
    },
  })
}
