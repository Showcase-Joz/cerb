<template>
  <div v-if="resultSwitch" class="sent-fetch-data">
    <h3>Get Data</h3>
    <p>{{ this.passedGet.namespace }} | {{ this.passedGet.name }}</p>
    <p>{{ this.passedGet.type }}</p>
    <p class="output-desc">{{ this.passedGet.description }}</p>
  </div>
</template>
<script>
export default {
  name: "GetFormOutput",
  data() {
    return {
      newGet: {}
    };
  },
  props: {
    passedGet: {
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
  h3 {
    margin-bottom: $spacingDefault;
    text-decoration: underline overline double $color1;
  }
}
p {
  white-space: pre-line;

  &.output-desc {
    text-align: left;
  }
}
</style>
