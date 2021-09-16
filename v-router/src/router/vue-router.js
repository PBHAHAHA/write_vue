

class HistoryRoute{
    constructor(){
        this.current = null
    }
}
class VueRouter {
    constructor(options){
        this.mode = options.mode || 'hash',
        this.routes = options.routes || []
        // 传递的路由表是个数组 {'/home': Home, '/about': About}
        this.routeMap = this.createMap(this.routes)
        // 路由中需要当前的路径
        this.history = new HistoryRoute;
        // 开始初始化
        this.init()
    }
    init() {
        if(this.mode === 'hash'){
            // 先判断用户打开时有没有hash ,没有就跳转到 #/
            location.hash? '' : location.hash = '/'
            window.addEventListener('load',() => {
                this.history.current = location.hash.slice(1)
            });
            window.addEventListener('hashchange',() => {
                this.history.current = location.hash.slice(1)
            });
        }else{
            location.pathname?'':location.pathname='/'
            window.addEventListener('load',() => {
                this.history.current = location.hash.slice(1)
            });
            window.addEventListener('popstate',() => {
                this.history.current = location.hash.slice(1)
            });
        }
    }
    createMap(routes){
        return routes.reduce((prev,next)=> {
            prev[next.path] = next.component
            return prev
        },{})
    }
}

VueRouter.install = function(Vue){
    // 每个组件都有this.$route  和  this.$router
    Vue.mixin({
        beforeCreate() {
            Object.defineProperty(this,'$router',{

            })
            Object.defineProperty(this,'$route',{

            })
        },
    })

    Vue.component('router-link',{
        render(h) {
            return h('a',{},'首页')
        },
    })
    Vue.component('router-view',{
        render(h) {
            return <h1>首页</h1>
        },
    })
}

export default VueRouter