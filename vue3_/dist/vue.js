(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
})(this, (function (exports) { 'use strict';

    var isObject = function (val) { return typeof val == 'object' && val !== null; };
    var isSymbol = function (val) { return typeof val == 'symbol'; };
    var isArray = Array.isArray;
    var isInteger = function (key) { return '' + parseInt(key, 10) === key; };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };
    var hasChanged = function (value, oldValue) { return value !== oldValue; };

    function effect(fn, options) {
        if (options === void 0) { options = {}; }
        var effect = createReactiveEffect(fn, options);
        if (!options.lazy) {
            effect();
        }
        return effect;
    }
    var activeEffect;
    var uid = 0;
    function createReactiveEffect(fn, options) {
        var effect = function () {
            activeEffect = effect;
            return fn(); // 用户写的逻辑，内部会对数据进行取值操作,在取值时可以拿到
        };
        effect.id = uid++;
        effect.deps = []; // 用来表示effect中依赖了哪些属性
        effect.options = options;
        return effect;
    }
    var targetMap = new WeakMap();
    // 将属性和effect做关联
    function track(target, key) {
        if (activeEffect == undefined) {
            return;
        }
        var depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        var dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set));
        }
    }

    function createGetter() {
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver); // target[key]
            // 如果取得值是symbol类型 要忽略他
            if (isSymbol(key)) {
                return res;
            }
            // 依赖收集
            track(target, key);
            console.log('此时数据做了 获取 的操作');
            if (isObject(res)) { // 取值是对象再进行代理，这里区别于Vue2的是，Vue2是从一开始就开始递归
                return reactive(res);
            }
            return res;
        };
    }
    function createSetter() {
        return function set(target, key, value, receiver) {
            // vue2 不支持新增属性
            var oldValue = target[key];
            var result = Reflect.set(target, key, value, receiver);
            // 第一种是数组新增的逻辑 第二种是对象的逻辑
            // 新增还是修改
            var hadKey = isArray(target) && isInteger(key) ? Number(key) < target.length : hasOwn(target, key);
            if (!hadKey) {
                console.log('新增属性');
            }
            else if (hasChanged(value, oldValue)) {
                console.log('修改属性');
            }
            return result;
        };
    }
    var get = createGetter();
    var set = createSetter();
    var mutableHandlers = {
        get: get,
        set: set // 设置属性时会执行
    };

    function reactive(target) {
        // 需要将target变成响应式的对象， Proxy
        // 核心的操作就是当读取文件时做依赖收集，当数据变化时重新执行effect
        return createReactiveObject(target, mutableHandlers);
    }
    var proxyMap = new WeakMap();
    function createReactiveObject(target, baseHandlers) {
        // 如果不是对象，只接返回
        if (!isObject(target)) {
            return target;
        }
        var exisitingProxy = proxyMap.get(target);
        if (exisitingProxy) {
            return exisitingProxy;
        }
        // 只是对最外层对象做代理，默认不会递归，而且不会重新重写对象中的属性
        var proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy); //将代理的对象和代理的结果做一个映射表
        return proxy;
    }

    function ref() {
    }

    function computed() {
    }

    exports.computed = computed;
    exports.effect = effect;
    exports.reactive = reactive;
    exports.ref = ref;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue.js.map
