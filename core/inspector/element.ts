import { DATA_MOCK_ID, ATTR_MOCK_CB } from '../constants'

export interface ElementBounds {
  top: number,
  bottom: number,
  left: number,
  right: number,
  width: number,
  height: number,
}

export interface ModuleWithMock extends HTMLElement {
  __mock_cb__?: () => {}
}

export function getElementBounds(el: HTMLElement): ElementBounds {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    get width () { return rect.right - rect.left },
    get height () { return rect.bottom - rect.top }
  }
}

export function getElementMockId(el: HTMLElement) : string {
  return el.getAttribute(DATA_MOCK_ID) || ''
}

export function getElementMockCb(el: HTMLElement) : undefined | (() => {}) {
  return (el as ModuleWithMock)[ATTR_MOCK_CB]
}



// function mergeRects (a, b) {
//   if (!a.top || b.top < a.top) {
//     a.top = b.top
//   }
//   if (!a.bottom || b.bottom > a.bottom) {
//     a.bottom = b.bottom
//   }
//   if (!a.left || b.left < a.left) {
//     a.left = b.left
//   }
//   if (!a.right || b.right > a.right) {
//     a.right = b.right
//   }
//   return a
// }