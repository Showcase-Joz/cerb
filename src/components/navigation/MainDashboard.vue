<template>
  <div class="dashboard-nav-main">
    <div class="dash-nav-item">
      <router-link
        to="/dashboard/"
        tag="button"
        class="btn"
        exact
        @click.native="clearSearch()"
      >
        Namespaces
        <ItemCount ref="1" :counts="countsNS" />
      </router-link>
    </div>
    <div class="dash-nav-item">
      <router-link
        :disabled="this.disabledNames"
        to="/dashboard/namespace"
        tag="button"
        class="btn"
        @click.native="clearSearch()"
      >
        Names
        <ItemCount ref="2" :counts="countsN" />
      </router-link>
    </div>
    <div class="dash-nav-item">
      <router-link
        :disabled="this.disabledEvents"
        to="/dashboard/events"
        tag="button"
        class="btn"
        @click.native="clearSearch()"
      >
        Events
        <ItemCount ref="3" :counts="countsE" />
      </router-link>
    </div>
    <div class="dash-nav-item">
      <router-link
        :disabled="this.disabledDetails"
        to="/dashboard/details"
        tag="button"
        class="btn"
        @click.native="clearSearch()"
        >Details</router-link
      >
    </div>

    <div class="dash-nav-item settings-nav">
      <router-link
        to="/settings"
        tag="button"
        class="btn"
        @click.native="clearSearch()"
        >Settings</router-link
      >
    </div>
  </div>
</template>
<script>
import ItemCount from "../helpers/ItemCount";
import { mapGetters } from "vuex";
export default {
  name: "dashboard-nav-main",
  data() {
    return {
      activeNav: null
    };
  },
  components: {
    ItemCount
  },
  methods: {
    // activeLink: function(event) {
    // 	const element = event.target;
    // 	const link = element.dataset.link;
    // 	this.activeNav = link;
    // 	this.$router.push("/dashboard/" + link).catch(err => {err.message});
    // },
    clearSearch: function() {
      this.$store.dispatch("search/storedSearch", "");
    }
  },
  computed: {
    ...mapGetters({
      selectedNamespace: "namespace/selectedNamespace",
      selectedName: "name/selectedName",
      selectedEvent: "events/selectedEvent",
      countsNS: "namespace/counts",
      countsN: "name/counts",
      currentEvents: "events/currentEvents",
      totatEvents: "events/totalEvents"
    }),
    countsE() {
      return {
        totalCount: this.totatEvents,
        count: this.currentEvents === null ? "0" : this.currentEvents.length
      };
    },
    disabledNames() {
      return this.selectedNamespace === "" ? true : false;
    },
    disabledEvents() {
      return this.selectedName === "" ? true : false;
    },
    disabledDetails() {
      return this.selectedEvent === "" ? true : false;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-nav-main {
  align-items: center;
  // align-self: stretch;
  background-color: tint($color2, $tint15);
  border-top: 1px inset tint($color2, $tint50);
  display: inline-grid;
  grid-area: dashboard-nav-main;
  grid-gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  justify-items: center;
  height: 100%;
  z-index: 150;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: auto;
    grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  }

  .dash-nav-item {
    align-items: stretch;
    display: grid;
    height: 50px;
    text-align: center;
    width: 100%;

    &.settings-nav {
      grid-row-end: -1;
      display: none;

      @include pointer-only() {
        @include for-size(tablet-landscape-up) {
          display: grid;
        }
      }

      @include touch-only() {
        @include for-size(tablet-portrait-up) {
          display: grid;
        }
      }

      @include touch-and-pointer() {
        @include for-size(tablet-portrait-up) {
          display: grid;
        }
      }
    }

    @include for-size(tablet-portrait-up) {
      height: 100%;
    }

    .btn {
      background-color: $color2;
      border: none;
      color: tint($color1, $tint100);
      padding: calc(#{$spacingDefault} / 2);
      position: relative;

      &::after {
        border-bottom: tint($color1, $tint50) 2px solid;
        bottom: 0;
        content: "";
        left: 0;
        margin: 0 auto;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(0);
        transition: all 0.2s ease-in-out 0.2s;
        width: 0%;
      }

      &:hover::after {
        transform: translateX(1);
        transition: all 0.3s ease-in-out 0s;
        width: 100%;
      }

      &.router-link-active {
        background-color: $valid;
        color: $color2;
        font-size: smaller;
        font-weight: $heavy;
        text-decoration: none;
      }

      &:hover {
        background-color: shade($color1, $shade10);
        color: $color2;
        cursor: pointer;
        outline: inherit;
      }

      &:disabled {
        background-color: shade($unknown, $shade25);
        cursor: not-allowed;
        color: tint($color2, $shade75);

        &:hover {
          text-decoration: line-through;
        }

        &::after {
          content: none;
        }
      }
    }
  }
}
</style>
