<template>
  <div class="post-view">
    <div class="view-atfold">
      <h1>This is a POST page</h1>
      <p v-if="!resultBoolean">
        Please complete this form to POST data to the API for testing purposes
      </p>
    </div>

    <PostForm v-on:handlePost="retainPost" v-bind:passedMessage="passedMessage" />
    <PostFormOutput
      v-bind:passedResponse="passedResponse"
      v-bind:passedPost="passedPost"
      v-bind:resultSwitch="resultBoolean"
    />
    
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";

export default {
  name: "post",
  props: {

  },
  data() {
    return {
      resultBoolean: false,
      passedPost: {},
      passedResponse: {},
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

      this.$http.post("events", this.postString)
      .then(
        response => {
          if (response.ok === true) {
            this.resultBoolean = true;
            this.passedResponse = response;
            this.passedMessage = response.body.message;
            console.log(this.passedResponse);

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
