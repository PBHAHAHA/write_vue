
import { isArray, isInteger, isObject, isSymbol, hasOwn, hasChanged } from "../shared/index"
import { track } from "./effect"
import { reactive } from "./reactive"

function createGetter(){
    return function get(target,key,receiver){
        const res = Reflect.get(target,key,receiver) // target[key]

        // 如果取得值是symbol类型 要忽略他
        if(isSymbol(key)){
            return res
        }

        // 依赖收集
        track(target,key)

        console.log('此时数据做了 获取 的操作')
        if(isObject(res)){ // 取值是对象再进行代理，这里区别于Vue2的是，Vue2是从一开始就开始递归
            return reactive(res)
        }
        return res
    }
}
function createSetter(){
    return function set(target, key, value, receiver){
        // vue2 不支持新增属性
        const oldValue = target[key];
        const result = Reflect.set(target,key,value,receiver)

        // 第一种是数组新增的逻辑 第二种是对象的逻辑

        // 新增还是修改
        const hadKey = isArray(target) && isInteger(key) ? Number(key) < target.length : hasOwn(target,key)
        if(!hadKey){
            console.log('新增属性')
        }else if(hasChanged(value,oldValue)){
            console.log('修改属性')
        }
        return result
    }
}

const get = createGetter()
const set = createSetter()


export const mutableHandlers = {
    get,// 获取对象中的属性会执行此方法
    set // 设置属性时会执行
}
