<template>
  <div class="dashboard-main" v-if="this.fetchedNames.count === undefined">
    Viewing events of [{{ this.$attrs.selectedN }}]
    <div
      class="item"
      v-for="(object, index) in fetchedNames.events"
      :key="index"
    >
      <div class="response-n">{{ object.event.name }}</div>
      <div class="response-extras">
        <div
          :class="'event-type-' + object.event.type"
          class="response-type"
          title="the type of log {debug, info, warning, error}"
        >
          {{ object.event.type }}
        </div>
        <div class="log-version" title="current verson of this log">
          v: {{ object.event.version }}
        </div>
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
</template>
<script>
export default {
  name: "Dashboard-Events",
  data() {
    return {
      fetchedNames: {},
      loading: false
    };
  },
  beforeMount() {
    const groupEvents =
      "events?namespace=" +
      this.$attrs.selectedNS +
      "&name=" +
      this.$attrs.selectedN +
      "&offset=25";
    // components.dashboardarea.dashboard.namescpaces
    // console.log(groupEvents);

    // const queryN = initialMeta + this.selectedNS + "/names" + maxLimit;
    if (this.$attrs.selectedNS !== null && this.$attrs.selectedN !== null) {
      this.fetchName(groupEvents);
    } else {
      console.warn("fetching local data");
    }
  },
  methods: {
    fetchName: function(eventsQuery) {
      this.loading = true;
      this.$http.get(eventsQuery).then(
        response => {
          if (response.ok === true) {
            this.loading = false;
            this.fetchedNames = response.body;
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
    position: relative;
    word-break: break-word;

    & .delete {
      align-items: center;
      color: $invalid;
      content: "x";
      display: grid;
      font-size: larger;
      height: auto;
      justify-content: center;
      margin: 5px 7px;
      max-height: 25px;
      min-width: 25px;
      position: absolute;
      right: 0;
      top: 0;
      width: 25px;
      z-index: 5;

      &:hover {
        background-color: $neutral;
        color: tint($color2, $tint100);
      }
    }

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
      column-gap: calc(#{$col-gap} * 2);
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
        padding: 0.2rem 0.5rem;
        border-radius: 3px;
        color: tint($color2, $tint100);

        &.event-type {
          &-debug {
            background-color: $neutral;
          }
          &-error {
            background-color: $warning;
          }
          &-info {
            background-color: $valid;
          }
          &-warning {
            background-color: $invalid;
          }
        }

        // &::after {
        // 	content: "|";
        // 	padding-left: 3px;
        // }
      }

      .log-version {
        border-bottom: solid medium tint($color2, $tint100);
        border-radius: 3px;
        color: tint($color2, $tint100);
        cursor: help;
        font-weight: 500;
        min-width: max-content;
        // padding: 0.2rem 0.5rem;
        padding: calc(#{$spacingDefault} / 5) calc(#{$spacingDefault} / 2);
      }

      .status-group {
        column-gap: $col-gap;
        display: grid;
        grid-template-columns: repeat(2, minmax(15px, min-content));
        height: 100%;
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
