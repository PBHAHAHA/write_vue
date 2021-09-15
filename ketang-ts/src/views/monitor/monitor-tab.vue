<template>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab v-for="item in options" :key="item.value" :title="item.title">
        {{ item.value }}
      </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import { MONITOR_TYPES } from '@/typings'
import {defineComponent, PropType, reactive, toRefs} from 'vue'
export default defineComponent({
    props: {
      monitorType:{
        type: Number as PropType<MONITOR_TYPES>
      }
    },
    emits: ['setMonitorType'],
    setup(props,context){
      let state = reactive({
        options: [
          {title: "全部",value:MONITOR_TYPES.ALL},
          {title: "热门回撤",value:MONITOR_TYPES.HOT},
          {title: "单涨停回撤",value:MONITOR_TYPES.SINGLE_UP_DOWN},
          {title: "热门波形",value:MONITOR_TYPES.HOT_WAVE},
          {title: "热门小波形",value:MONITOR_TYPES.HOT_LITTLE_WAVE},
          {title: "热门下形",value:MONITOR_TYPES.HOT_DOWN},
        ]
      })
      function onClickTab(value:{ name: string | number, title: string, event: MouseEvent, disabled: boolean }){
        context.emit("setMonitorType",value.name)
      }
      return {
        ...toRefs(state),
        onClickTab
      }
    }
})
</script>