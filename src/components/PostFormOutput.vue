<template>
  <transition name="resize">
    <div v-if="resultSwitch" class="sent-fetch-data">
    <h3>
      Posted this data to the API
      <span>
        <a :href="this.passedResponse.body.href" target="_blank"
          >Open result here</a
        >
      </span>
    </h3>
    <div class="results-recap">
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
    passedResponse: {
      type: Object
    },
    resultSwitch: {
      type: Boolean
    }
  }
};
</script>
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
