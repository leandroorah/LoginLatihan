<template>
  <div>
    <div class="danger-color">{{ messageAlert }}</div>
  </div>
</template>

<style>
.danger-color {
  color: red;
}
</style>

<script>
export default {
  props: {
    messageAlert: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
