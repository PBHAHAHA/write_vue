<template>
  <van-swipe class="my-swipe" :autoplay="3000">
    <van-swipe-item v-for="l in sliderList.value" :key="l.url">
        {{l}}
        <img :src="l.url" alt="">
    </van-swipe-item>
  </van-swipe>
</template>
<script lang="ts">
import { IGlobalState } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import * as Types from '@/store/action-types'

export default defineComponent({
  async setup() {
    //   页面加载就要获取图片数据
    let store = useStore<IGlobalState>()
    let sliderList = computed(()=>{
        return store.state.monitor.sliders
    })
    console.log('----------',sliderList.value);
    
    if(sliderList.value.length == 0){
        sliderList = await store.dispatch(`monitor/${Types.SET_SLIDER_LIST}`)
    }
    return {
        sliderList
    }
  },
});
</script>
