<template>
  <div class="app-container">
    <a-input v-model:value="interfaceName" placeholder="请输入接口名" />
    <a-textarea v-model:value="jsonStr" :placeholder="jsonStrPlaceholder" :rows="30" />
   <div class="flex-button">
    <a-button type="primary" @click="jsonStr=testData;isInterfaceDefined=false">使用测试数据</a-button>
    <a-button type="primary" @click="createdInterfaceDefined">生成</a-button>
    <a-button type="primary" @click="copyClick">一键复制</a-button>
    <a-button type="primary" @click="jsonStr= '';isInterfaceDefined=false">清空</a-button>
   </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import { message } from "ant-design-vue";
import { Json2Ts } from "@/utils/json2Ts";
const json2ts = new Json2Ts();
const { toClipboard } = useClipboard();
let jsonStr = ref<any>("");
let interfaceName = ref("");
let result = ref("")
let isInterfaceDefined = ref(false)
let testData = `
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
const jsonStrPlaceholder = `
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

const createdInterfaceDefined = () => {
  try{
    const content = eval(`(${jsonStr.value})`)
    result.value = json2ts.convert(JSON.stringify(content), interfaceName.value || "interfaceName"); 
    if(result.value) {
      jsonStr.value = result.value
      isInterfaceDefined.value = true
      message.success("生成成功");
    }
  return result.value

  }catch(e) {
    isInterfaceDefined.value = false
    message.error("传入数据有问题, 请检查数据");
    console.log(e)
  }
}
const copyClick = async () => {
  try {
    if(isInterfaceDefined.value) {
      await toClipboard(result.value || '');
      message.success("复制成功");
    }else {
      message.error("没有数据生成或者数据不符合要求");
    }
  } catch (e) {
    isInterfaceDefined.value = false
    message.error("没有数据生成或者数据不符合要求");
    console.log(e)
  }
};

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
