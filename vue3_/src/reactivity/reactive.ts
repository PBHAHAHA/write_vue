import { isObject } from "../shared/index";
import { mutableHandlers } from "./baseHandlers";

export function reactive(target:object){
    // 需要将target变成响应式的对象， Proxy

    // 核心的操作就是当读取文件时做依赖收集，当数据变化时重新执行effect
    return createReactiveObject(target,mutableHandlers);
    
}

const proxyMap = new WeakMap();

function createReactiveObject(target,baseHandlers){
    // 如果不是对象，只接返回
    if(!isObject(target)){
        return target
    }

    const exisitingProxy = proxyMap.get(target)
    if(exisitingProxy){
        return exisitingProxy
    }
    // 只是对最外层对象做代理，默认不会递归，而且不会重新重写对象中的属性
    const proxy = new Proxy(target,baseHandlers)
    proxyMap.set(target, proxy) //将代理的对象和代理的结果做一个映射表
    return proxy
}