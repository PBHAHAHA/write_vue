function createGetter(){
    return function get(target,key,receiver){
        const res = Reflect.get(target,key,receiver)

        return res
    }
}
function createSetter(){
    return function set(target, key, value, receiver){

    }
}

const get = createGetter()
const set = createSetter()


export const mutableHandlers = {
    get,// 获取对象中的属性会执行此方法
    set // 设置属性时会执行
}
