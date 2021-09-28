# Vue3和Vue2的对比
- vue2 采用flow进行编写，vue3采用TypeScript开发
- 源码体积优化，移除了部分api，使用tree-shaking
- 数据劫持采用Proxy，性能得以提升
- 编译优化： Vue3实现了静态模板分析、重写diff算法
- CompositionAPI: 整合代码的业务逻辑，提取公共逻辑（Vue2采用mixin，命名冲突数据来源不清晰）
- 自定义渲染器：改写Vue的底层渲染逻辑
- 新增Fragment、Teleport、Suspense组件



```
    rollup解析typescript  
    rollup-plugin-typescript2 
    @rollup/plugin-node-resolve 映入第三方模块
    @rollup/plugin-replace 可以把 process.ENV语法替换
    rollup-plugin-serve 开发时启动一个本地服务

```