<template>
  <!-- <div class="dashboard-main">
    <div class="loading" v-if="loading">Loading...</div>
    <div
      class="item"
      v-for="(object, index) in fetchedNames.events"
      :key="index"
    >{{ object.event.name }}</div>
  </div>-->

  <transition name="fade">
    <div class="dashboard-main">
      <div class="item" v-for="(object, index) in fetchedNames.events" :key="index">
        <div class="response-n">{{ object.event.name }}</div>
        <div class="response-extras">
          <div
            class="response-type"
            title="the type of log {debug, info, warning, error}"
          >{{ object.event.type }}</div>
          <div class="log-version" title="current verson of this log">v: {{ object.event.version }}</div>
          <div class="status-group">
            <div
              class="status-setting"
              title="an external large details stored on S3"
              :class="{
                'status-green': object.haslargedetails,
                'status-red': !object.haslargedetails
              }"
            ></div>
            <div
              class="status-setting"
              title="this log has details available"
              :class="{
                'status-green': object.weredetailsfound,
                'status-red': !object.weredetailsfound
              }"
            ></div>
          </div>
        </div>
        <div class="response-n">{{ object.event.name }}</div>
        <p class="response-desc">{{ object.event.description }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Dashboard-Names",
  inheritAttrs: false,
  props: {
    userInputMeta: {
      type: Object
    },
    selectedNS: {
      type: String
    }
  },
  data() {
    return {
      fetchedNames: {}
    };
  },
  beforeMount() {
    const queryNS = "events?namespace=" + this.selectedNS + "&offset=25";
    if (this.selectedNS !== null) {
      this.fetchNamespace(queryNS);
    } else {
      console.log("local");
    }
  },
  methods: {
    fetchNamespace: function(namespaceQuery) {
      this.loading = true;
      this.$http.get(namespaceQuery).then(
        response => {
          if (response.ok === true) {
            this.loading = false;
            this.fetchedNames = response.body;
          } else if (response.ok === false) {
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
.dashboard-main {
  align-items: center;
  // background-color: rgb(42, 166, 166);
  display: grid;
  grid-area: dashboard-main;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(max-content, auto));
  grid-auto-rows: minmax(auto, 150px);
  padding: $spacingDefault;
  width: 100%;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  }

  .item {
    align-items: center;
    border: 1px solid $color2;
    background-color: $color2;
    border-radius: 0.2rem;
    color: tint($color2, $tint90);
    cursor: pointer;
    display: grid;
    grid-template-columns: [col] minmax(auto, 1fr);
    grid-template-rows: repeat(3, [row] auto);
    height: 100%;
    opacity: 1;
    padding: $spacingDefault;
    word-break: break-word;

    p {
      white-space: pre-line;
    }

    .response-ns {
      grid-area: response-ns;
      grid-column: col / span 2;
      grid-row: row 1;
      justify-self: left;
    }
    .response-n {
      grid-area: response-n;
      grid-column: col / span 3;
      grid-row: row 2;
      margin-bottom: 0.75rem;
      justify-self: left;
      text-align: left;
      word-break: break-word;
    }

    div[class^="response-n"] {
      font-size: 1.25rem;
      font-variant: all-petite-caps;
      font-weight: 500;
      line-height: 1.2rem;
    }

    .response-extras {
      grid-area: response-extras;
      grid-column: col / span -1;
      grid-row: row 1;
      justify-self: right;
    }

    .response-desc {
      border-top: solid rgba($color1, 0.5) 1px;
      font-size: smaller;
      grid-area: response-main;
      grid-column: col / span 3;
      grid-row: row 3;
      justify-self: left;
      max-height: 100%;
      overflow-y: auto;
      padding-top: 0.25rem;
      text-align: justify;
      width: 100%;
    }

    .response-extras {
      align-items: center;
      column-gap: 0.5rem;
      display: grid;
      grid-template-areas: "response-type log-version status-group";
      grid-template-columns: repeat(3, minmax(max-content, 1fr));
      font-size: 0.75rem;
      max-width: min-content;

      .response-type {
        cursor: help;
        display: inline-block;
        grid-area: response-type;
        width: max-content;
        text-transform: uppercase;

        &::after {
          content: "|";
          padding-left: 3px;
        }
      }

      .log-version {
        background-color: tint($color1, $tint25);
        border-radius: 3px;
        color: $color2;
        cursor: help;
        min-width: max-content;
        padding: 0 5px;
      }

      .status-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  .loading {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>