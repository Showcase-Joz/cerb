<template>
  <div>
    <h1>This is a POST page</h1>

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
      console.log(newPost);
    }
  }
};
</script>
