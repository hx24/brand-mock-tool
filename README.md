# brand-mock-tool

## 项目介绍
辅助brand-mock项目的工具，可自动识别页面模块使用的mock接口，快捷修改，热更新。

## 使用方式

### 在项目内初始化插件
要做到自动识别mock接口，在页面开发时需要对模块调用的mock做标注

#### 安装依赖

```bash
npm i brand-mock-tool -S
```

#### 注册插件

```js
import { createApp } from 'vue'
import mockTool from 'brand-mock-tool'

const app = createApp(App)
app.use(mockTool)
```

#### 对模块进行接口标注
插件在全局注册了`v-mock`指令，接收两个参数:  
- id: mock接口的id
- cb: 可选，mock数据更新后的回调函数，用来热更新模块数据

```html
<script setup>
import { ref } from 'vue'
const data = ref([])
const fetchData = async () => {
  // 请求数据，自动更新视图
  data = await fetch('http://data.com')
}
  
</script>
<template>
  <div v-mock="{ id: '1234', cb: fetchData }">{{ data.name }}</div>
</template>
```


### 开启devtool模式
按下`ctrl`+`F12`组合键，打开devtool面板，进入选择模式，鼠标悬浮到使用了mock接口的模块(按照上文标注过的模块)会被高亮显示，点击选中后，在devtool面板会显示调用的mock接口，可实时修改。


### 项目作为iframe通信
使用了本插件的项目，在作为iframe被嵌入到其他项目时（主要是项目管理平台），可以通过`postMessage`与父级通信。

<!-- 表格 -->
#### 父级可发送的消息
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| mockTool:start | 开始进入选择模式 | - |
| mockTool:stop | 停止选择模式 | - |
| mockTool:update | 更新模块 | - |

#### 父级可接收的消息
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| mockTool:selected | 选中了某个模块 | { id: string } |

```html
<div>
  <button id="btn">开始</button>
</div>
<iframe src="http://localhost:5173/" frameborder="0" width="800" height="600"></iframe>

<script>
  let flag = false
  btn.addEventListener('click', () => {
    const iframe = document.querySelector('iframe')
    const type = flag ?  'mockTool:stop' : 'mockTool:start'
    btn.innerText = flag ? '开始' : '停止'
    flag = !flag
    iframe.contentWindow.postMessage({ type }, 'http://localhost:5173')
  })

  window.addEventListener('message', (e) => {
    if(e.data?.type === 'mockTool:selected') {
      console.log(e.data?.data)
      const id = e.data?.data
    }
  })
</script>
```