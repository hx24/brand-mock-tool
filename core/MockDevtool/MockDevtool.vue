<script setup lang="ts">
import { onMounted } from 'vue'
import inspector from '../inspector'

const inspectorOption = {
  onSelected: (id: string) => {
    console.log('id', id)
  }
}

function initKeyBoardEvent() {
  window.addEventListener('keydown', (e) => {
    // 拦截ctrl+f12
    if (e.ctrlKey && e.key === 'F12') {
      e.preventDefault()
      if (inspector.devtool?.visible) {
        inspector.hideDevtool()
        inspector.stopSelecting()
      } else {
        inspector.showDevtool()
        inspector.startSelecting(inspectorOption)
      }
    }
  })
}

onMounted(() => {
  initKeyBoardEvent()
})

const startMock = () => {
  console.log('123')
}
</script>

<template>
  <div class="mock-devtool">
    <button @click="startMock">开始</button>
  </div>
</template>

<style lang="less" scoped>
.mock-devtool {
  width: 100vw;
  height: 300px;
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  box-sizing: border-box;
  display: none;
}
</style>
