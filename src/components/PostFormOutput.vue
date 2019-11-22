<template>
  <div>test

    <p>{{this.passedPost}}</p>
  </div>
  
</template>
<script>
export default {
  name: "PostFormOutput",
  data() {
    return {
      newPost: {}
    }
  },
  props: {
    passedPost: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>

</style>