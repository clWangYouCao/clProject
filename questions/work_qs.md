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

