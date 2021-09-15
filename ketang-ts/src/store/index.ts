import { IMonitorState } from '@/typings'
import { createStore } from 'vuex'
import monitor from './modules/monitor'

export interface IGlobalState {
  monitor:IMonitorState
}

const store = createStore<IGlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    monitor
  }
})

export default store