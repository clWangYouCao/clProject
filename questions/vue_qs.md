## vue ֪ʶ��

### 1.����ʹ�õ�

(1) .sync ���η��÷�  
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