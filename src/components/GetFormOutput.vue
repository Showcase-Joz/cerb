<template>
  <div class="sent-fetch-wrapper">
    <h3>Get Data</h3>

    <div v-if="resultSwitch" class="sent-fetch-data">
      <p>
        {{ this.getResponse.body.event.namespace }} |
        {{ this.getResponse.body.event.name }}
      </p>
      <p>
        Type: {{ this.getResponse.body.event.type }} | v:{{
          this.getResponse.body.event.version
        }}
        | Has Details:{{ this.getResponse.body.haslargedetails }} | Found
        Details:{{ this.getResponse.body.weredetailsfound }}
      </p>
      <p class="output-desc">{{ this.getResponse.body.event.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "GetFormOutput",
  data() {
    return {
      // newGet: {}
    };
  },
  props: {
    passedGet: {
      type: Object
    },
    resultSwitch: {
      type: Boolean
    },
    getResponse: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
.sent-fetch-wrapper {
  grid-area: sent-fetch-wrapper;

  h3 {
    margin-bottom: $spacingDefault;
    text-decoration: underline overline double $color1;
  }

  .sent-fetch-data {
    background-color: $color2;
    border-radius: 0.2rem;
    color: tint($color2, $tint90);
    padding: $spacingDefault;
  }

  p {
    white-space: pre-line;

    &.output-desc {
      text-align: left;
    }
  }
}
</style>
