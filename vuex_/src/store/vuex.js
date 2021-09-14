let Vue;

const forEach = (obj,callback)=> {
    Object.keys(obj).forEach((key) => {
        callback(key,obj[key])
    })
}

class ModuleCollection{
    constructor(options){
        this.register([],options);
    }
    register(path, rootModule){
        let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        if(path.length === 0){
            this.root = newModule
        }else{
            this.root._children[path[path.length-1]] = newModule
        }
        if(rootModule.modules) {
            forEach(rootModule.modules,(moduleName,module)=>{
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

class Store {
    constructor(options){
        this._s = new Vue({
            data: {
                state: options.state
            }
        })

        let getters = options.getters || {}
        this.getters = {}
        forEach(getters,(getterName,value) => {
            Object.defineProperty(this.getters, getterName,{
                get:()=>{
                    return value(this.state)
                }
            })
        })

        let mutations = options.mutations || {};
        this.mutations = {}
        forEach(mutations,(mutationName,value) => {
            this.mutations[mutationName] = (payload) => {
                value(this.state,payload);
            }
        })

        let actions = options.actions || {}
        this.actions = {}
        forEach(actions,(actionName,value)=> {
            this.actions[actionName] = (payload) => {
                value(this,payload)
            }
        })


        // 先格式化用户的传的数据
        this.modules = new ModuleCollection(options);
        console.log(this.modules);

        // let root = {
        //     _raw: rootModule,
        //     _children: {
        //         a: {
        //             _raw:aModule,
        //             _children: {}
        //         },
        //         b: {
        //             _raw: bModule,
        //             _children
        //         }
        //     }
        // }
        


    }
    commit = (type, payload)=>{
        this.mutations[type](payload)
    }

    dispatch = (type,payload)=>{
        this.actions[type](payload);
    }

    
    get state(){
        return this._s.state;
    }
}

const install = (_Vue) => {
    console.log('install')
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            console.log(this.$options);
            // 需要线判别是父组件还是子组件，如果是子组件应该把父组件的store增加给子组件
            if(this.$options && this.$options.store){
                this.$store = this.$options.store;
            }else{
                this.$store = this.$parent && this.$parent.$store
            }
        },
    })
}

export default {
    install,
    Store
}