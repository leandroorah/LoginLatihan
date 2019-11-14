<template>
  <button @click="btnClick" class="universal-btn">{{ btnValue }}</button>
</template>
<style>
.universal-btn {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #164af5;
  color: #164af5;
  text-decoration: none;
  padding: 10px 30px;
}
.universal-btn:hover {
  color: #fff;
  background-color: #164af5;
}
</style>
<script>
export default {
  props: {
    btnValue: {
      type: String,
      required: false,
      default: ''
    },
    btnClick: {
      type: Function,
      required: true,
      default: () => {}
    }
  }
}
</script>
