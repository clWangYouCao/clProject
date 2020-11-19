## work_note

### 1. vue

#### (1) 自定义组件的 v-model    
定义：`一个组件的 v-model 默认会利用名为 value 的prop和名为 input 的事件`。可使用model配置项改变。   

如下：   
```
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `<input type="checkbox" :checked="checked" @change="@emit('change', $event.target.checked)" />`
})

<base-checkbox v-model="lovingVue"/>
```
说明：`lovingVue 的值会传入这个名为 checked 的prop。同时当<base-checkbox/> 触发 change 事件并附带一个新的值的时候，这个 lovingVue 的 property 将会被更新。`    

#### (2) .sync 修饰符用法   
解决场景：`如果要实现prop双向绑定，一般是子组件向父组件发送一个事件，父组件监听，然后更新prop`

解决方案：

```
// 子组件 组件
methods: {
    onInput(e) {
        this.$emit("update:value", e.target.value)
    }
}

// 父组件
<info :value.sync="myValue"></info>
```   

#### (3) addRoutes    
解决场景：`动态添加路由`   

如下：
```
<!-- 嵌套路由 -->
this.$router.addRoutes([
    {
        path: '/admin',
        name: 'admin',
        component: () => import("../views/Admin.vue"),
        children: [{
            path: '/admin/course/:name',
            name: 'detail',
            component: () => import("../views/Detail.vue")
        }]
    }
])
```

#### (4) vuex   
1. getters: 派生状态，形同computed   
2. mapState、mapGetters、mapMutation、mapActions 使用   
3. strict: true 严格模式防止用户手动修改状态   
4. plugins 插件 subscribe 订阅   

插件说明：`Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接受 store 作为唯一参数。`

```
<!-- user.js -->
getters: {
    welcome: state => state.username + '，欢迎回来～'
};

<!-- .vue文件 -->
import { mapState, mapGetters, mapMutation, mapActions } from 'vuex'
export default {
    computed: {
        isLogin() {
            return this.$store.state.user.isLogin
        },
        ...mapState('user', ['isLogin']),
        ...mapGetters('user', ['welcome'])
    },
    methods: {
        login() {
            this.$store.dispatch('user/login', 'admin').then(() => {})
            this['user/login']('admin').then(() => {}) // mapActions用法
        },
        ...mapActions(['user/login', 'user/logout'])
    }
}

<!-- store/index.js -->
<!-- 防止用户不通过commit mutation方式 直接 this.$store.state.user.isLogin = true 修改 -->
import user from "../modules/user"
export default new Vuex.Store({
    modules: {
        user
    },
    strict: true,
    plugins: [myPlugin], // 注册插件
})


<!-- persist.js 实现登陆状态持久化 -->
export default store => {
    <!-- 初始化从缓存获取数据 -->
    if(localStorage) {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            store.commit('user/login')
            store.commit('user/setUsername', user.username)
        }
    }

    <!-- 用户状态发生变化缓存 -->
    store.subscribe((mutation, state) => {
        if(mutation.type == 'user/login') {
            localStorage.setItem('user', JSON.stringify(state.user))
        } else if(mutation.type == 'user/logout') {
            localStorage.removeItem('user')
        }
    })
}
```
 
#### (5) 自定义指令    
说明：除了默认内置的指令(v-model 和 v-show)，Vue也允许注册自定义指令。在Vue2.0中，代码复用和抽象的主要形式是组件。`然而，有些情况下，你仍需对普通DOM元素进行底层操作`，这个时候就会用到自定义指令。

一个指令定义对象可提供如下几个钩子函数（均为可选）：
1. bind: `只调用一次，指令第一次绑定到元素时使用`
2. inserted: `被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）`
3. updated: `所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前`
4. componentUpdated: `指令所在组件的 VNode 及其子 VNode 全部更新后调用`
5. unbind: `只调用一次，指令与元素解绑时调用`

钩子函数参数(el, binding, vnode, oldVnode)

```
<!-- v-focus -->
<input v-focus/>

<!-- 注册局部自定义指令 -->
directives: {
    focus: {
        inserted: function(el) {
            el.focus()
        }
    }
}

<!-- 按钮权限控制 -->
<div class="toolbar" v-permission="'admin'"></div>

const role = "user"
Vue.directive('permission', {
    inserted(el, binding) {
        if(role == "user") {
            el.parentElement.removeChild(el)
        }
    }
})
```

#### (6) 渲染函数 render
使用场景：使用javascript写html。
基本结构：
```
render: function(createElement) {
    <!-- 返回的是vNode -->
    // 简单
    return createElement(
        tag,  // 标签名称
        data,  // 传递数据
        children // 子节点数组
    )
    //复杂
    createElement(
        // { String | Object | Function }  一个 HTML 标签名、组件选项对象，或者resolve 了上述任何一种的一个 async 函数。必填项
        'div',
        // { Object } 一个与模板中属性对应的数据对象。可选
        {},
        // { String |  Array } 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选
        [
            '先写一些文字',
            createElement('h1', '一则头条'),
            createElement(MyComponent, {
                props: {
                    someProp: 'foobar'
                }
            })
        ]
    )
}
```

示例：处理title、icon

```
Vue.component('heading', {
    props: ['level', 'title', 'icon'],
    render(h) {
        let children = []
        // 添加图标功能
        // <svg><use xlink:href="#icon-xxx"></use></svg>
        if(this.icon) {
            children.push(h(
                'svg',
                { class: 'icon' },
                [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
            ))
            children = children.concat(this.$slots.default) // 子节点数组
        }
        vnode = h(
            'h' + level,
            { attrs: { this.title } },
            children
        )
        return vnode
    }
})
```

#### (7) 函数式组件
定义：`组件没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法`。可将组件标记为functional，这意味着它无状态（没有响应式数据），也没有实例（没有this上下文）。

```
Vue.component('heading', {
    functional: true,
    props: ['level', 'title', 'icon'],
    render(h, context) { // 上下文传参
        let children = []
        // 添加图标功能
        // <svg><use xlink:href="#icon-xxx"></use></svg>
        // 属性获取
        const {icon, title, level} = context.props
        if(icon) {
            children.push(h(
                'svg',
                { class: 'icon' },
                [h('use', { attrs: { 'xlink:href': '#icon-' + icon } })]
            ))
            children = children.concat(context.children)
        }
        vnode = h(
            'h' + level,
            { attrs: { title } },
            children
        )
        return vnode
    }
})
```

#### (8) 插件
作用：通常用来为Vue添加全局功能。
1. 添加全局方法或者 property
2. 添加全局资源：指令/过滤器/过渡等。
3. 通过全局混入来添加一些组件选项。如 vue-router
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

使用：`Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象`

```
MyPlugin.install = function(Vue, options) {
    Vue.myGlobalMethod = function() {

    } // 1

    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldvnode) {

        }
    }) // 2

    Vue.mixin({
        created: function() {

        },
        ...
    }) // 3

    Vue.prototype.$myMethod = function(methodOptions) {

    } // 4
}

// 使用
Vue.use(MyPlugin)
```

### 2. css   

#### (1) 引入图片几种方式    
1. js: require("xxx") 生成 base64   
   + require 引入   
   + import 引入   
2. css: background: url("xxx") 生成 static   
3. html: src="xxx" 生成 base64   

使用：
```
<img :src="bgImg1"/>
<div :style="{backgroundImage: 'url('+bgImg2+')'}"></div>
<div class="bgImg3"></div>
<img src="@/../static/images/logo.png" />


import bgImg2 from "@/../static/images/logo.png"
export default {
    name: 'App',
    data () {
        return {
            bgImg1: require("@/../static/images/logo.png"),
            bgImg2
        }
    }
}

<style>
.bgImg3 {
    background-image:url("@/../static/images/logo.png");
}
</style> 

```


### 3. lodash

#### 常用函数   
1. chunk: 将数组进行分割。   
```
import _ from 'lodash'
const arr = [1,2,3,4,5,6,7]
_.chunk(arr, 2) // [[1,2], [3,4], [5,6], [7]]
```

2. compact: 去除假值（所有空值、0、NaN过滤掉）
```
_.compact([1, 2, '', ' ', 0]) // [1,2]
```

3. uniq: 数组去重
```
_.uniq([1,1,3]) // [1,3]
```

4. filter、reject: 过滤集合，传入匿名函数（返回值相反）
``` 
_.filter([1,2], x => x = 1) // [1]
_.reject([1,2], x => x = 1) // [2]
```

5. map、forEach: 数组遍历（不改变原有数组，map支持return返回）
```
_.map([1,2], x => x+1) // [2, 3]
```

6. merge: 参数合并
```
var obj = {
    'a': [{'b': 2}, {'d': 4}]
}
var other = {
    'a': [{'c': 3}, {'e': 5}]
}
_.merge(obj, other) 
// { 'a': [{'b': 2, 'c': 3}, {'d': 4, 'e': 5}] }
```

7. cloneDeep: 深拷贝
```
var obj = [{ 'a': 1 }, { 'b': 2 }]
_.cloneDeep(obj)
```

8. debounce: 防抖函数
```
<!-- 确保 `batchLog` 调用1次之后，1秒内会被触发。 -->
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
```

