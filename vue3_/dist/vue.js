(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
})(this, (function (exports) { 'use strict';

    var isObject = function (val) { return typeof val == 'object' && val !== null; };

    var mutableHandlers = {
        get: function () {
        },
        set: function () {
        }
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

    function effect() {
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
