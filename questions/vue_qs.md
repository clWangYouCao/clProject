## vue 知识点

### 1.基本使用点

(1) .sync 修饰符用法  
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