export function effect(fn,options:any = {}){
    const effect = createReactiveEffect(fn,options)
    if(!options.lazy){
        effect()
    }
    return effect
}

let activeEffect;
let uid = 0
function createReactiveEffect(fn,options){
    const effect = function(){
        activeEffect = effect
        return fn() // 用户写的逻辑，内部会对数据进行取值操作,在取值时可以拿到
    }
    effect.id = uid++
    effect.deps = [] // 用来表示effect中依赖了哪些属性
    effect.options = options
    return effect
}

const targetMap = new WeakMap();

// 将属性和effect做关联
export function track(target,key){
    if(activeEffect == undefined){
        return
    }
    let depsMap = targetMap.get(target)
    if(!depsMap){
        targetMap.set(target,(depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key,(dep = new Set))
    }
}