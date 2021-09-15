import { MONITOR_TYPES,IMonitorState } from "@/typings/index"
import { Module } from "vuex"
import { IGlobalState } from ".."



const state:IMonitorState = {
    currentMonitorType: MONITOR_TYPES.ALL,
    sliders: [],
    lessons: {
        hasMore: true,//有没有更多的数据
        loading: false,
        offset: 0,
        limit: 5,
        list: [],//当前已经显示到页面的有哪些
    }
}

const monitor:Module<IMonitorState,IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        aa(a:IMonitorState){
            console.log(a)
        }
    }
}

export default monitor