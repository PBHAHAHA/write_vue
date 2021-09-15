<template>
    <van-tabs v-model:active="active">
      <van-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    
})
</script>