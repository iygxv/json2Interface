<script setup lang="ts">
  import { Codemirror } from 'vue-codemirror';
  import { defineProps, ref } from 'vue';
  import { javascript } from '@codemirror/lang-javascript';
  import { json } from '@codemirror/lang-json';
  import { Debounced } from "@/utils";
  // import { oneDark } from '@codemirror/theme-one-dark';

  // 定义props
  const props = defineProps({
    code: String,
    languages: String,
    disabled: Boolean
  });

  const emit = defineEmits(['codeChange'])

  const languagesMap: any = {
    javascript: javascript(),
    json: json(),
  }
  const targetLanguages = props.languages || 'javascript'
  const editorExtensions = ref([
    languagesMap[targetLanguages],
    // oneDark
  ])

  console.log(editorExtensions);
  

  // 事件处理函数
  const handleCodeMirrorReady = () => {
    // 处理Codemirror准备就绪的逻辑
  };

  const handleCodeChange = (event: any) => {
    // 处理代码变化的逻辑
    if(props.languages ==='json') {
      Debounced.use(() => codeChange(event))()
    }
  };

  const codeChange = (code: any) => {
    emit('codeChange', code)
  }; 

  const handleCodeFocus = (event: any) => {
    console.log('focus', event);
    // 处理代码编辑器获得焦点的逻辑
  };

  const handleCodeBlur = (event: any) => {
    console.log('blur', event);
    // 处理代码编辑器失去焦点的逻辑
  };
</script>

<template>
  <Codemirror
    :modelValue="code"
    :style="{ width: '50%' }"
    :placeholder="`${props.languages === 'json' ? '请输入 JSON 数据' : '' }`"
    class="codemirror"
    :disabled="props.disabled"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="editorExtensions"
    @change="handleCodeChange"
  />
</template>
<style scoped lang="scss">
</style>