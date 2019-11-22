<template>
  <div class="post-view">
    <h1>This is a POST page</h1>
    <p>
      Please complete this form to POST data to the API for testing purposes
    </p>
    <PostForm v-on:handlePost="retainPost" />
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
let dummy = {}
console.log(dummy);

export default {
  name: "post",
  data() {
    return {
      passedPost: dummy
    }
  },
  components: {
    PostForm
  },
  methods: {
    retainPost(newPost) {
      console.info("test: ", newPost);
      this.passedPost = newPost;
      console.log("passed: ", this.passedPost);
      console.log("passed: ", this.passedPost.type);
      
    }
  }
};
</script>
<style lang="scss" scoped>
.post-view {
  padding: $defaultPadding;
}
</style>
