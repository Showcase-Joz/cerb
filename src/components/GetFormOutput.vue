<template>
  <transition name="fade">
    <div v-if="resultSwitch" class="sent-fetch-wrapper">
      <div class="sent-fetch-data">
        <div class="response-ns">
          {{ this.getResponse.body.event.namespace }}
        </div>
        <div class="response-extras">
          <div
            class="response-type"
            title="the type of log {debug, info, warning, error}"
          >
            {{ this.getResponse.body.event.type }}
          </div>
          <div class="log-version" title="current verson of this log">
            v: {{ this.getResponse.body.event.version }}
          </div>
          <div class="status-group">
            <div
              class="status-setting"
              title="an external large details stored on S3"
              :class="{
                'status-green': this.getResponse.body.haslargedetails,
                'status-red': !this.getResponse.body.haslargedetails
              }"
            ></div>
            <div
              class="status-setting"
              title="this log has details available"
              :class="{
                'status-green': this.getResponse.body.weredetailsfound,
                'status-red': !this.getResponse.body.weredetailsfound
              }"
            ></div>
          </div>
        </div>
        <div class="response-n">{{ this.getResponse.body.event.name }}</div>
        <p class="response-desc">
          {{ this.getResponse.body.event.description }}
        </p>
      </div>
    </div>
  </transition>
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
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s 1.2s;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 2s;
  opacity: 0;
}
.sent-fetch-wrapper {
  grid-area: sent-fetch-wrapper;
  margin-top: $spacingLarge;

  @include for-size(desktop-up) {
    margin-top: inherit;
  }

  h3 {
    margin-bottom: $spacingDefault;
    text-decoration: underline overline double $color1;
  }

  .sent-fetch-data {
    background-color: $color2;
    border-radius: 0.2rem;
    color: tint($color2, $tint90);
    display: grid;
    grid-template-columns: [col] minmax(auto, 1fr);
    grid-template-rows: repeat(3, [row] auto);
    min-height: 100%;
    max-width: fit-content;
    min-width: 250px;
    padding: $spacingDefault;

    @include for-size(desktop-up) {
      min-height: max-content;
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
    font-weight: $heavy;
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
</style>
