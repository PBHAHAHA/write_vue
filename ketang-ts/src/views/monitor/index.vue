<template>
  <div class="monitor">
    <MonitorTab :monitorType="monitorType" @setMonitorType="setMonitorType"></MonitorTab>
    <div class="monitor-content">
      {{ca}}
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue'
import MonitorTab from './monitor-tab.vue'
import MonitorItem from './monitor-item.vue'
import { Store, useStore } from 'vuex'
import { IGlobalState } from '@/store'
import { MONITOR_TYPES } from '@/typings'
import * as Types from '@/store/action-types'

function useMonitorType(store:Store<IGlobalState>){
  let monitorType = computed(()=>{
    return store.state.monitor.currentMonitorType
  })
  function setMonitorType(type:MONITOR_TYPES){
    store.commit(`monitor/${Types.SET_MONITOR_TYPE}`,type)
  }
  return {
    monitorType,
    setMonitorType
  }
}
export default defineComponent({
    components: {
      MonitorTab,MonitorItem
    },
    setup(props,context){
      // 1.获取vuex中的状态，更改状态.
      let store = useStore<IGlobalState>()
      let ca = computed(()=> store.state.monitor.currentMonitorType) 
      let {monitorType, setMonitorType} = useMonitorType(store)
      return {
        monitorType,
        ca,
        setMonitorType
      }
    }
})
</script>