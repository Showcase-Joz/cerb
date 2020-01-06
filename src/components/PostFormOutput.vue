<template>
  <transition name="fade">
    <div v-if="resultSwitch" class="sent-fetch-wrapper">
      <h3>
        Posted this data to the API
        <span>
          <a :href="this.responseHref" target="_blank">View JSON here</a>
        </span>
      </h3>
      <div class="sent-fetch-data results-recap">
        <p class>{{ this.passedPost.namespace }}</p>
        <p>{{ this.passedPost.name }}</p>
        <p>{{ this.passedPost.type }}</p>
        <p class="output-desc">{{ this.passedPost.description }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "PostFormOutput",
  data() {
    return {
      newPost: {}
    };
  },
  props: {
    passedPost: {
      type: Object
    },
    responseHref: {
      type: String
    },
    resultSwitch: {
      type: Boolean
    }
  }
};
</script>
<style lang="scss" src="@/styles/_form.scss" scoped></style>
<style lang="scss" scoped>
.sent-fetch-data {
  background-color: lighten($color: $valid, $amount: 25%);
  border-radius: $borderRadius;
  margin-bottom: $spacingDefault;
  padding: $spacingDefault;

  .results-recap {
    display: grid;
    grid-template-columns: repeat(3, [col] minmax(auto, 1fr));
    grid-template-rows: repeat(2, [row] auto);
    grid-row-gap: $spacingDefault;

    .output-desc {
      grid-column: col / span 4;
      grid-row: row 2;
    }
  }
  h3 {
    color: darken($color: $valid, $amount: 35%);
    margin-bottom: $spacingLarge;
    text-decoration: underline solid darken($color: $valid, $amount: 35%);

    span > a {
      color: $valid;
      display: block;
    }
  }
  p {
    color: white;
    font-style: italic;
    white-space: pre-line;

    &.output-desc {
      text-align: justify;
    }
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-leave {
  }
  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }
}
</style>
