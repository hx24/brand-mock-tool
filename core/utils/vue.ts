import * as Vue from 'vue'

// @ts-ignore
const version = Vue.default ? Vue.default.version : Vue.version

export const vueVersion: string = version.split('.')[0]