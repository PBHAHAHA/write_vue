<template>
  <div class="monitor">
    <!-- <MonitorTab></MonitorTab> -->
    <div class="monitor-content">
      {{ca}}
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue'
import MonitorTab from './monitor-tab.vue'
import MonitorItem from './monitor-item.vue'
import { useStore } from 'vuex'
import { IGlobalState } from '@/store'
export default defineComponent({
    components: {
      MonitorTab,MonitorItem
    },
    setup(props,context){
      let store = useStore<IGlobalState>()
      let ca = computed(()=>{
        return store.state.monitor.currentMonitorType
      })
      console.log("是水水水水",store.state.monitor);
      
      return {
        ca
      }
    }
})
</script>