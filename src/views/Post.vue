<template>
  <div class="post-view">
    <div class="view-atfold">
      <h1>This is a POST page</h1>
      <p v-if="!resultBoolean">
        Please complete this form to POST data to the API for testing purposes
      </p>
    </div>
    <PostFormOutput
      v-bind:passedPost="passedPost"
      v-bind:resultSwitch="resultBoolean"
    />
    <PostForm v-on:handlePost="retainPost" />
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";

export default {
  name: "post",
  data() {
    return {
      resultBoolean: false,
      passedPost: {},
      postString: ""
    };
  },
  components: {
    PostForm,
    PostFormOutput
  },
  methods: {
    retainPost: function(newPost) {
      this.passedPost = newPost;
      this.createPostString();
    },
    createPostString: function() {
      this.postString = JSON.stringify(this.passedPost);
      this.fetchPost();
    },
    fetchPost: function() {
      // console.log("test ", this.postString);

      this.$http.post("events", this.postString).then(
        response => {
          console.log(response);
          if (response.ok === true) {
            this.resultBoolean = true;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.post-view {
  padding: $spacingDefault;
}
</style>
