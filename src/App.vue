<template>
  <div class="app-container">
    <a-input v-model:value="interfaceName" placeholder="请输入接口名(默认: interfaceName)" />
    <a-textarea v-model:value="jsonStr" :placeholder="jsonStrPlaceholder" :rows="26" @change="(e: any) => Debounced.use(() => changeTextarea(e))()"/>
   <div class="flex-button">
    <a-button type="primary" @click="handleUseTestData">使用测试数据</a-button>
    <a-button type="primary" @click="handleCreateInterface">生成</a-button>
    <a-button type="primary" @click="handleCopy">一键复制</a-button>
    <a-button type="primary" @click="handleClear">清空</a-button>
   </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import { message } from "ant-design-vue";
import { Json2Ts } from "@/utils/json2Ts";
import { Debounced } from "@/utils";
const json2ts = new Json2Ts();
const { toClipboard } = useClipboard();
const jsonStr = ref("");
const interfaceName = ref("");
const result = ref("")
const isInterface = ref(false)
const jsonStrPlaceholder: string = `
数据的具体形式
形式1: 
{
"id": "1",
"data": {
  "page": 0
}

形式2: 
{
"data": [
  {
    "page": 0
  }
]

形式3
[
  {
    "id": "1",
    "page": 0
  }
]
}

`
const testData = `
{
  "id": "12313",
  "idNumber": "123123132",
  "name": "test",
  "sex": "02",
  "address": "哈哈",
  "contact": "1222",
  "createTime": 1669283844812,
  "lastUpdateTime": 1669283844812,
  "status": "0",
  "operator": null,
  "data": {
    "page": 0,
    "pageSize": 0,
    "begin": null,
    "end": null,
    "bath": null,
    "rowId": "1"
  }
}
`
const handleUseTestData = () =>  {
  jsonStr.value = testData
  isInterface.value = false
}
const handleCreateInterface = () => {
  if(jsonStr.value.includes('export interface')) {
    message.warn("当前已经生成, 去一键复制吧~~~");
    return
  }
  try{
    const content = eval(`(${jsonStr.value})`)
    result.value = json2ts.convert(JSON.stringify(content), interfaceName.value || "interfaceName"); 
    if(result.value) {
      jsonStr.value = result.value
      isInterface.value = true
      message.success("生成成功");
    }
  return result.value

  }catch(e) {
    isInterface.value = false
    message.error("传入数据有问题, 请检查数据");
    console.log(e)
  }
}
const handleCopy = async () => {
  try {
    if(isInterface.value) {
      await toClipboard(result.value || '');
      message.success("复制成功, 请到你项目中ts文件粘贴");
      handleClear()
    }else {
      message.error("没有数据生成或者数据不符合要求");
    }
  } catch (e) {
    isInterface.value = false
    message.error("没有数据生成或者数据不符合要求");
    console.log(e)
  }
};
const handleClear = () => {
  jsonStr.value= ''
  interfaceName.value = ''
  isInterface.value = false
}
const changeTextarea = (e: any) => {
  result.value = e.target.value
}

</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.app-container {
  width: 600px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
textarea {
  margin: 20px 0;
}
.flex-button {
  display: flex;
  justify-content: space-between;
}
</style>
