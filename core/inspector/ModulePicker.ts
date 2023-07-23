import { getElementMockId } from './element'
import { highlight, unHighlight } from './hightlighter'

export type mockTargetSelected = (id: string, target: HTMLElement) => void | any

export interface ModulePickerOptions {
  onSelected?: mockTargetSelected
}

export class ModulePicker {
  selectedInstance: HTMLElement | null = null
  onSelected: mockTargetSelected | undefined

  startSelecting(options: ModulePickerOptions = {}) {
    this.onSelected = options.onSelected
    window.addEventListener('mouseover', this.elementMouseOver, { capture: true, passive: false })
    window.addEventListener('click', this.elementClicked, { capture: true, passive: false })
    window.addEventListener('mouseout', this.cancelEvent, { capture: true, passive: false })
    window.addEventListener('mouseenter', this.cancelEvent, { capture: true, passive: false })
    window.addEventListener('mouseleave', this.cancelEvent, { capture: true, passive: false })
    window.addEventListener('mousedown', this.cancelEvent, { capture: true, passive: false })
    window.addEventListener('mouseup', this.cancelEvent, { capture: true, passive: false })
  }

  stopSelecting() {
    window.removeEventListener('mouseover', this.elementMouseOver, true)
    window.removeEventListener('click', this.elementClicked, true)
    window.removeEventListener('mouseout', this.cancelEvent, true)
    window.removeEventListener('mouseenter', this.cancelEvent, true)
    window.removeEventListener('mouseleave', this.cancelEvent, true)
    window.removeEventListener('mousedown', this.cancelEvent, true)
    window.removeEventListener('mouseup', this.cancelEvent, true)

    unHighlight()
  }

  elementMouseOver = async (e: MouseEvent) => {
    this.cancelEvent(e)

    const el = e.target as HTMLElement
    if (el) {
      await this.selectElementModule(el)
    }

    unHighlight()
    if (this.selectedInstance) {
      highlight(this.selectedInstance)
    }
  }

  async selectElementModule(el: HTMLElement) {
    const elementModule = this.findRelatedModule(el)
    this.selectedInstance = elementModule
  }

  findRelatedModule(el: HTMLElement) {
    while (!getElementMockId(el) && el.parentElement) {
      el = el.parentElement
    }
    return el === document.documentElement ? null : el
  }

  elementClicked = (e: MouseEvent) => {
    this.cancelEvent(e)
    if (this.selectedInstance) {
      const mockId = getElementMockId(this.selectedInstance)
      this.onSelected && this.onSelected(mockId, this.selectedInstance)
    }
    // this.stopSelecting() // 选择完毕后不自动关闭
  }

  cancelEvent(e: Event) {
    e.stopImmediatePropagation()
    e.preventDefault()
  }
}
