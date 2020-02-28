<template>
  <div class="post-view page">
    <div class="view-atfold">
      <h1>This is a POST page</h1>
      <p v-if="!resultBoolean">
        Please complete this form to POST data to the API for testing purposes
      </p>
    </div>

    <div class="split-view" :class="{ 'append-grid': this.resultBoolean }">
      <PostForm
        v-on:handlePost="retainPost"
        v-bind:passedMessage="passedMessage"
        v-bind:resultSwitch="resultBoolean"
      />
      <PostFormOutput
        v-bind:responseHref="responseHref"
        v-bind:passedPost="passedPost"
        v-bind:resultSwitch="resultBoolean"
      />
    </div>
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";

export default {
  name: "post",
  props: {},
  data() {
    return {
      resultBoolean: false,
      passedPost: {},
      responseHref: null,
      postString: "",
      passedMessage: null
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
          if (response.status === 200 || response.status === 201) {
            this.resultBoolean = true;
            this.responseHref = response.data.href;
            this.passedMessage = response.data.message;
          } else if (response.status !== 200 || response.status !== 201) {
            this.resultBoolean = false;
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
