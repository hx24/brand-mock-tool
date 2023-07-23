// import { VNode, createVNode, render } from 'vue'
import { ModulePicker, ModulePickerOptions } from './ModulePicker'
import Bridge from './Bridge'
// import MockDevtool from '../MockDevtool/MockDevtool.vue'

// interface Devtool extends VNode {
//   visible: boolean
// }

export class Inspector {
  modulePicker: ModulePicker | null = null
  // devtool: Devtool | null = null
  bridge: Bridge | null = null
  options: ModulePickerOptions = {}

  init() {
    this.modulePicker = new ModulePicker()
    this.bridge = new Bridge(this.modulePicker)
    // this.renderDevtoolToBody()
  }

  startSelecting(options?: ModulePickerOptions) {
    this.modulePicker?.startSelecting(options)
  }

  stopSelecting() {
    this.modulePicker?.stopSelecting()
  }


  showDevtool() {
    // if (this.devtool) {
    //   const el = this.devtool.el as HTMLElement
    //   el.style.display = 'block'
    //   this.devtool.visible = true
    // }
  }

  hideDevtool() {
    // if (this.devtool) {
    //   const el = this.devtool.el as HTMLElement
    //   el.style.display = 'none'
    //   this.devtool.visible = false
    //   this.stopSelecting()
    // }
  }

  private renderDevtoolToBody() {
    // this.devtool = createVNode(MockDevtool) as Devtool
    // render(this.devtool, document.body)
  }
}

export default new Inspector()