<template>
  <div class="post-view">
    <h1>This is a POST page</h1>
    <p>Please complete this form to POST data to the API for testing purposes</p>
    <PostForm v-on:handlePost="retainPost" />
    <PostFormOutput v-bind:passedPost="passedPost" />
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";

export default {
  name: "post",
  data() {
    return {
      passedPost: {}
    };
  },
  components: {
    PostForm,
    PostFormOutput
  },
  methods: {
    retainPost(newPost) {
      console.info("test: ", newPost);
      this.passedPost = newPost;
    }
  }
};
</script>
<style lang="scss" scoped>
.post-view {
  padding: $defaultPadding;
}
</style>
