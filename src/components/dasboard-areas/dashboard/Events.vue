<template>
  <div class="dashboard-main">
    <transition-group appear name="animate-cards">
      <div class="info" key="99999">
        <div class="total-events">
          Viewing
          <strong>
            <number
              ref="number1"
              :to="this.totalEvents > 0 ? this.totalEvents : '0'"
              :duration="3"
              :delay="0.5"
              easing="Power0.easeOut"
            />
          </strong>
          events in
        </div>
        <div class="name-title">{{ this.selectedName }}</div>
        <div class="functional-buttons">
          <div class="function-l">l</div>
          <div class="function-m">m</div>
          <div class="function-r">r</div>
        </div>
      </div>

      <div class="item" v-for="(item, index) in currentEvents" :key="index">
        <div class="response-timestamp">
          {{ item.event.created | convertEpoch }}
        </div>
        <div class="response-extras">
          <div
            :class="'event-type-' + item.event.type"
            class="response-type"
            title="the type of log {debug, info, warning, error}"
          >
            {{ item.event.type }}
          </div>
          <div class="log-version" title="current verson of this log">
            v: {{ item.event.version }}
          </div>
          <div class="status-group">
            <div
              class="status-setting"
              title="an external large details stored on S3"
              :class="{
                'status-green': item.haslargedetails,
                'status-red': !item.haslargedetails
              }"
            ></div>
            <div
              class="status-setting"
              title="this log has details available"
              :class="{
                'status-green': item.weredetailsfound,
                'status-red': !item.weredetailsfound
              }"
            ></div>
          </div>
        </div>
        <div class="response-event">{{ item.event.name }}</div>
        <p class="response-desc">{{ item.event.description }}</p>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard-Events",
  data() {
    return {
      loading: false
    };
  },
  beforeMount() {
    const groupEvents =
      "events?namespace=" +
      this.selectedNamespace +
      "&name=" +
      this.selectedName +
      "&offset=16";
    // components.dashboardarea.dashboard.namescpaces
    // console.log(groupEvents);

    // const queryN = initialMeta + this.selectedNS + "/names" + maxLimit;
    if (this.selectedNamespace !== null && this.selectedName !== null) {
      this.fetchName(groupEvents);
    } else {
      console.warn("fetching local data");
    }
  },
  updated() {
    this.descendingOrder();
  },
  methods: {
    async fetchName(queryString) {
      await this.$store.dispatch("events/getEvents", queryString);
    },
    descendingOrder: function() {
      console.log(this.currentEvents);
      
      // this.currentEvents.sort(function(a,b) {
      //   const descendingOrder = new Date(a.item.event.created).getTime() - new Date(b.item.event.created).getTime();
      //   console.log(descendingOrder);
        
      //   return descendingOrder;
      // })
    }
    // fetchName: function(eventsQuery) {
    //   this.loading = true;
    //   this.$http.get(eventsQuery).then(
    //     response => {
    //       if (response.status === 200) {
    //         this.loading = false;
    //         this.currentEvents = response.data;
    //       }
    //     },
    //     error => {
    //       console.log("Error: ", error);
    //     }
    //   );
    // }
  },
  computed: {
    ...mapGetters({
      selectedNamespace: "namespace/selectedNamespace",
      selectedName: "name/selectedName",
      currentEvents: "events/currentEvents",
      totalEvents: "events/totalEvents"
    })
  },
  filters: {
    convertEpoch: function(timeStamp) {
      if (timeStamp) {
        const now = new Date(),
          secondsPast = (now.getTime() - timeStamp) / 1000;
        if (secondsPast < 60) {
          return parseInt(secondsPast) + "s ago";
        }
        if (secondsPast < 3600) {
          return parseInt(secondsPast / 60) + "m ago";
        }
        if (secondsPast <= 86400) {
          return parseInt(secondsPast / 3600) + "h ago";
        }
        if (secondsPast > 86400) {
          const tdStamp = new Date(timeStamp);
          const day = tdStamp.getDate();
          const month = tdStamp
            .toDateString()
            .match(/ [a-zA-Z]*/)[0]
            .replace(" ", "");
          const year =
            tdStamp.getFullYear() === now.getFullYear()
              ? ""
              : " " + tdStamp.getFullYear();
          return `On the ${day} ${month} ${year}`;
        }
      }
    }
  }
};
</script>
<style lang="scss" src="@/styles/animation/_animate-cards.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-main > span {
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

  .info {
    cursor: help;
    display: grid;
    grid-template-areas:
      "total-events"
      "name-title"
      "functional-buttons";
    grid-template-columns: 1fr;
    height: 100%;
    @include card--border;

    .total-events {
      align-self: center;
      grid-area: total-events;
      text-transform: uppercase;
    }

    .name-title {
      background-color: $color1;
      color: tint($color2, $tint100);
      font-weight: $heavy;
      grid-area: name-title;
      padding: $spacingDefault;
      word-break: break-word;
    }

    .functional-buttons {
      align-self: center;
      display: flex;
      justify-content: space-around;

      .function-l {
        grid-area: function-l;
      }

      .function-m {
        grid-area: function-m;
      }

      .function-r {
        grid-area: function-r;
      }
    }
  }

  .item {
    align-items: center;
    border: 1px solid $color2;
    background-color: $color2;
    border-radius: calc(#{$borderRadius} / 1);
    color: tint($color2, $tint100);
    cursor: pointer;
    display: grid;
    grid-gap: 0.5rem;
    grid-template-areas:
      "response-timestamp response-timestamp"
      "response-event response-event"
      "response-desc response-desc";
    grid-template-columns: [col] minmax(auto, 1fr);
    grid-template-rows: repeat(3, [row] minmax(auto, min-content));
    height: 100%;
    opacity: 1;
    padding: calc(#{$spacingDefault} / 2);
    position: relative;
    word-break: break-word;

    &:hover {
      .response-event {
        color: $color1;
      }
      .response-desc {
        border-top-color: rgba(tint($color2, $tint100), 0.5);
      }
    }

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

    .response-timestamp {
      font-size: larger;
      font-variant: all-petite-caps;
      grid-area: response-timestamp;
      justify-self: start;
      letter-spacing: $letter-spacing;
      max-width: 100%;
      width: max-content;
    }

    p {
      white-space: pre-line;
    }

    .response-event {
      font-size: 1.25rem;
      font-variant: all-petite-caps;
      grid-area: response-event;
      grid-column: col / span 4;
      grid-row: row 2;
      text-align: left;
      word-break: break-word;

      &:hover {
        font-weight: $heavy;
      }
    }

    .response-desc {
      border-top: solid rgba($color1, 0.5) 1px;
      font-size: smaller;
      grid-area: response-desc;
      grid-column: col / span 4;
      grid-row: row 3;
      justify-self: left;
      max-height: 100%;
      overflow-y: auto;
      padding-top: calc(#{$spacingDefault} / 4);
      padding-right: calc(#{$spacingDefault} / 4);
      text-align: justify;
      width: 100%;
    }

    .response-extras {
      align-items: center;
      column-gap: calc(#{$col-gap} * 2);
      display: grid;
      font-size: 0.75rem;
      grid-area: response-extras;
      grid-column: col / span -1;
      grid-row: row 1;
      grid-template-areas: "response-type log-version status-group";
      grid-template-columns: repeat(3, minmax(max-content, 1fr));
      justify-self: right;
      max-width: min-content;

      .response-type {
        cursor: help;
        display: inline-block;
        grid-area: response-type;
        width: max-content;
        text-transform: uppercase;
        padding: 0.2rem 0.5rem;
        border-radius: calc(#{$borderRadius} / 1.5);
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
        border-radius: calc(#{$borderRadius} / 1.5);
        color: tint($color2, $tint100);
        cursor: help;
        font-weight: $heavy;
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
