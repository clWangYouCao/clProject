## work_note

### 1. vue

#### (1) �Զ�������� v-model    
���壺`һ������� v-model Ĭ�ϻ�������Ϊ value ��prop����Ϊ input ���¼�`����ʹ��model������ı䡣   

���£�   
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
˵����`lovingVue ��ֵ�ᴫ�������Ϊ checked ��prop��ͬʱ��<base-checkbox/> ���� change �¼�������һ���µ�ֵ��ʱ����� lovingVue �� property ���ᱻ���¡�`    

#### (2) .sync ���η��÷�   
���������`���Ҫʵ��prop˫��󶨣�һ������������������һ���¼��������������Ȼ�����prop`

���������

```
// ����� ���
methods: {
    onInput(e) {
        this.$emit("update:value", e.target.value)
    }
}

// �����
<info :value.sync="myValue"></info>
```   

#### (3) addRoutes    
���������`��̬���·��`   

���£�
```
<!-- Ƕ��·�� -->
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
1. getters: ����״̬����ͬcomputed   
2. mapState��mapGetters��mapMutation��mapActions ʹ��   
3. strict: true �ϸ�ģʽ��ֹ�û��ֶ��޸�״̬   
4. plugins ��� subscribe ����   

���˵����`Vuex �� store ���� plugins ѡ����ѡ�¶��ÿ�� mutation �Ĺ��ӡ�Vuex �������һ�������������� store ��ΪΨһ������`

```
<!-- user.js -->
getters: {
    welcome: state => state.username + '����ӭ������'
};

<!-- .vue�ļ� -->
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
            this['user/login']('admin').then(() => {}) // mapActions�÷�
        },
        ...mapActions(['user/login', 'user/logout'])
    }
}

<!-- store/index.js -->
<!-- ��ֹ�û���ͨ��commit mutation��ʽ ֱ�� this.$store.state.user.isLogin = true �޸� -->
import user from "../modules/user"
export default new Vuex.Store({
    modules: {
        user
    },
    strict: true,
    plugins: [myPlugin], // ע����
})


<!-- persist.js ʵ�ֵ�½״̬�־û� -->
export default store => {
    <!-- ��ʼ���ӻ����ȡ���� -->
    if(localStorage) {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            store.commit('user/login')
            store.commit('user/setUsername', user.username)
        }
    }

    <!-- �û�״̬�����仯���� -->
    store.subscribe((mutation, state) => {
        if(mutation.type == 'user/login') {
            localStorage.setItem('user', JSON.stringify(state.user))
        } else if(mutation.type == 'user/logout') {
            localStorage.removeItem('user')
        }
    })
}
```
 
#### (5) �Զ���ָ��    
˵��������Ĭ�����õ�ָ��(v-model �� v-show)��VueҲ����ע���Զ���ָ���Vue2.0�У����븴�úͳ������Ҫ��ʽ�������`Ȼ������Щ����£����������ͨDOMԪ�ؽ��еײ����`�����ʱ��ͻ��õ��Զ���ָ�

һ��ָ��������ṩ���¼������Ӻ�������Ϊ��ѡ����
1. bind: `ֻ����һ�Σ�ָ���һ�ΰ󶨵�Ԫ��ʱʹ��`
2. inserted: `����Ԫ�ز��븸�ڵ�ʱ���ã�����֤���ڵ���ڣ�����һ���ѱ������ĵ��У�`
3. updated: `��������� VNode ����ʱ���ã����ǿ��ܷ��������� VNode ����֮ǰ`
4. componentUpdated: `ָ����������� VNode ������ VNode ȫ�����º����`
5. unbind: `ֻ����һ�Σ�ָ����Ԫ�ؽ��ʱ����`

���Ӻ�������(el, binding, vnode, oldVnode)

```
<!-- v-focus -->
<input v-focus/>

<!-- ע��ֲ��Զ���ָ�� -->
directives: {
    focus: {
        inserted: function(el) {
            el.focus()
        }
    }
}

<!-- ��ťȨ�޿��� -->
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

#### (6) ��Ⱦ���� render
ʹ�ó�����ʹ��javascriptдhtml��
�����ṹ��
```
render: function(createElement) {
    <!-- ���ص���vNode -->
    // ��
    return createElement(
        tag,  // ��ǩ����
        data,  // ��������
        children // �ӽڵ�����
    )
    //����
    createElement(
        // { String | Object | Function }  һ�� HTML ��ǩ�������ѡ����󣬻���resolve �������κ�һ�ֵ�һ�� async ������������
        'div',
        // { Object } һ����ģ�������Զ�Ӧ�����ݶ��󡣿�ѡ
        {},
        // { String |  Array } �Ӽ�����ڵ� (VNodes)���� `createElement()` �������ɣ�Ҳ����ʹ���ַ��������ɡ��ı�����ڵ㡱����ѡ
        [
            '��дһЩ����',
            createElement('h1', 'һ��ͷ��'),
            createElement(MyComponent, {
                props: {
                    someProp: 'foobar'
                }
            })
        ]
    )
}
```

ʾ��������title��icon

```
Vue.component('heading', {
    props: ['level', 'title', 'icon'],
    render(h) {
        let children = []
        // ���ͼ�깦��
        // <svg><use xlink:href="#icon-xxx"></use></svg>
        if(this.icon) {
            children.push(h(
                'svg',
                { class: 'icon' },
                [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
            ))
            children = children.concat(this.$slots.default) // �ӽڵ�����
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

#### (7) ����ʽ���
���壺`���û�й����κ�״̬��Ҳû�м����κδ��ݸ�����״̬��Ҳû���������ڷ���`���ɽ�������Ϊfunctional������ζ������״̬��û����Ӧʽ���ݣ���Ҳû��ʵ����û��this�����ģ���

```
Vue.component('heading', {
    functional: true,
    props: ['level', 'title', 'icon'],
    render(h, context) { // �����Ĵ���
        let children = []
        // ���ͼ�깦��
        // <svg><use xlink:href="#icon-xxx"></use></svg>
        // ���Ի�ȡ
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

#### (8) ���
���ã�ͨ������ΪVue���ȫ�ֹ��ܡ�
1. ���ȫ�ַ������� property
2. ���ȫ����Դ��ָ��/������/���ɵȡ�
3. ͨ��ȫ�ֻ��������һЩ���ѡ��� vue-router
4. ��� Vue ʵ��������ͨ����������ӵ� Vue.prototype ��ʵ�֡�
5. һ���⣬�ṩ�Լ��� API��ͬʱ�ṩ�����ᵽ��һ���������ܡ��� vue-router

ʹ�ã�`Vue.js �Ĳ��Ӧ�ñ�¶һ�� install ��������������ĵ�һ�������� Vue ���������ڶ���������һ����ѡ��ѡ�����`

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

// ʹ��
Vue.use(MyPlugin)
```

### 2. css   

#### (1) ����ͼƬ���ַ�ʽ    
1. js: require("xxx") ���� base64   
   + require ����   
   + import ����   
2. css: background: url("xxx") ���� static   
3. html: src="xxx" ���� base64   

ʹ�ã�
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

#### ���ú���   
1. chunk: ��������зָ   
```
import _ from 'lodash'
const arr = [1,2,3,4,5,6,7]
_.chunk(arr, 2) // [[1,2], [3,4], [5,6], [7]]
```

2. compact: ȥ����ֵ�����п�ֵ��0��NaN���˵���
```
_.compact([1, 2, '', ' ', 0]) // [1,2]
```

3. uniq: ����ȥ��
```
_.uniq([1,1,3]) // [1,3]
```

4. filter��reject: ���˼��ϣ�������������������ֵ�෴��
``` 
_.filter([1,2], x => x = 1) // [1]
_.reject([1,2], x => x = 1) // [2]
```

5. map��forEach: ������������ı�ԭ�����飬map֧��return���أ�
```
_.map([1,2], x => x+1) // [2, 3]
```

6. merge: �����ϲ�
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

7. cloneDeep: ���
```
var obj = [{ 'a': 1 }, { 'b': 2 }]
_.cloneDeep(obj)
```

8. debounce: ��������
```
<!-- ȷ�� `batchLog` ����1��֮��1���ڻᱻ������ -->
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
```

