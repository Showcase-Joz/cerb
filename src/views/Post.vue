<template>
  <div class="post-view">
    <h1>This is a POST page</h1>
    <p>Please complete this form to POST data to the API for testing purposes</p>
    <PostForm v-on:handlePost="retainPost" />
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";

export default {
  name: "post",
  components: {
    PostForm
  },
  methods: {
    retainPost(newPost) {
      console.log('test: ', newPost);
    }
  }
};
</script>
<style lang="scss" scoped>
  .post-view {
    padding: $defaultPadding;
  }
</style>
