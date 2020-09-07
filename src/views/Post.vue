<template>
  <div class="post-view page">
    <div class="view-atfold">
      <h1>
        POST
        <span class="symbol-arrows">&#8594;</span> Typhon
      </h1>
      <p v-if="this.responseData === null">
        Please complete this form to POST data to the API for testing purposes
      </p>
    </div>

    <div class="split-view" :class="{ 'append-grid': this.responseData }">
      <PostForm />
      <PostFormOutput />
    </div>
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";
import { mapGetters } from "vuex";
export default {
  name: "post",
  components: {
    PostForm,
    PostFormOutput
  },
  computed: {
    ...mapGetters({
      responseData: "post/responseData"
    })
  }
};
</script>
<style lang="scss" scoped>
.post-view {
  padding: $spacingDefault;

  h1 span.symbol-arrows {
    @include symbol-arrows;
  }
}
</style>
