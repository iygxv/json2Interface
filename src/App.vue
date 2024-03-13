<template>
  <Header/>
  <div class="container">
    <Codemirror :code="jsonStr" languages="json" :disabled="false" @codeChange="codeChange"/>
    <Codemirror :code="resultStr" languages="javascript" :disabled="false"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Header from './Header.vue'
const json2ts = new Json2Ts();
import Codemirror from './Codemirror.vue'
import { exampleJsonStr } from "./utils";
import { Json2Ts } from "./utils/json2Ts";
import { ElNotification } from 'element-plus'

const jsonStr = ref(exampleJsonStr);
const resultStr = ref("")
const handleResult = () => {
  try {
    resultStr.value = json2ts.convert(jsonStr.value);
  } catch (error: any) {
    ElNotification({
      title: 'Error Tips',
      message: error,
      type: 'error',
    })
  }
}
const codeChange = (code: string) => {
  jsonStr.value = code
  handleResult()
}
handleResult()

</script>
 
<style lang = "scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  box-sizing: border-box;
  padding: 10px !important;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
   /* 样式 */
  ::v-deep(.codemirror) .cm-editor {
      flex: 1;
      height: 88vh !important;
      /* margin: 0 1rem !important; */
      border: 1px solid #ddd;
      .ͼe {
        color:#0969da !important;
      }
  }
}
</style>