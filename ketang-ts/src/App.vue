<template>
  <div id="nav">
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item to="/monitor">监控</van-tabbar-item>
      <van-tabbar-item to="/strategy">策略</van-tabbar-item>
      <van-tabbar-item to="/analysis">分析</van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
