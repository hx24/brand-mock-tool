<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '../utils/request'

interface Tab {
  name: string
  id: string
}

interface TabDetail {
  price?: number
  count?: number
  size?: string
}

let tabs = ref<Tab[]>([]),
  detail = ref<TabDetail>({}),
  num = ref(0)

const fetchNum = async function () {
  const data = await request.get('http://10.101.41.198:3030/mock-devtool/api', { params: { id: '637c87f8573ab11c9410889a' } })
  num.value = data.data.num
}

const fetchTabs = async function () {
  const data = await request.get('http://10.101.41.198:3030/mock-devtool/api', {
    params: { id: '636b5813613662412595055d' }
  })

  tabs.value = data.data
}

const fetchDetail = async function () {
  const data = await request.get('http://10.101.41.198:3030/mock-devtool/api', { params: { id: '636b607b885476355f1d4c57' } })
  detail.value = data.data
}

onMounted(async () => {
  fetchTabs()
  fetchDetail()
  fetchNum()
})
</script>

<template>
  <h1 v-mock="{ id: 'fetchNum637c87f8573ab11c9410889a', cb: fetchNum }">{{ num }}</h1>

  <div class="panel">
    <div class="tabs" v-mock="{ id: '636b5813613662412595055d', cb: fetchTabs }">
      <div class="tab" v-for="tab in tabs" :key="tab.id">{{ tab.name }}</div>
    </div>
    <div class="detail" v-mock="{ id: '636b607b885476355f1d4c57', cb: fetchDetail }">
      <div>价格：{{ detail.price }}</div>
      <div>库存：{{ detail.count }}</div>
      <div>尺码：{{ detail.size }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.panel {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  .tabs {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    color: #1890ff;
    .tab {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .detail {
    padding: 10px;
  }
}
</style>
