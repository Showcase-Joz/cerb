<template>
  <div class="dashboard-main">
    <!-- <div class="loading" v-if="loading">Loading...</div> -->
    <transition-group appear name="animate-cards">
      <CreateItem
        :returnSolo="updateFromCreated"
        @createdNewN="selectedN = $event"
        key="99999"
      />
      <div
        class="item"
        v-for="(names, index) in fetchedNames.names"
        :key="index"
        @click="handleClick(names)"
      >
        <div class="delete" @click.stop.prevent="deleteN(names)">x</div>
        {{ names }}
        <!-- {{ object.event.name }} -->
      </div>
    </transition-group>
  </div>

  <!-- <div  class="dashboard-main" v-if="this.fetchedNames.count === undefined">
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
  </div>-->
</template>
<script>
import CreateItem from "../../form/CreateItem";
import { mapGetters } from 'vuex';
const initialMeta = "metadata/";
// const andFilter = "?filter=";
const maxLimit = "?limit=0";
export default {
  name: "DashboardNames",
  inheritAttrs: false,
  components: {
    CreateItem
  },
  data() {
    return {
      fetchedNames: {},
      loading: false,
      selectedN: null,
      id: "Name",
      constructN: {
        initialMeta: "metadata/",
        andFilter: "?filter=",
        maxLimit: "?limit=0"
      }
    };
  },
  beforeMount() {
    // POSSIBLE CHANGE THIS LINE TO GET NAME FROM NAMESPACE!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const queryNS = "events?namespace=" + this.selectedNamespace + "&offset=25";
    const queryNS = initialMeta + this.selectedNamespace + "/names" + maxLimit;
    if (this.selectedNamespace !== null) {
      this.fetchName(queryNS);
    } else {
      console.log("local");
    }
  },
  methods: {
    fetchName: function(namesQuery) {
      this.loading = true;
      this.$http.get(namesQuery).then(
        response => {
          if (response.status === 200) {
            this.loading = false;
            this.fetchedNames = response.data;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    },
    updateFromCreated: function() {
      const newNsAndN = initialMeta + this.selectedNamespace + "/names";
      this.fetchName(newNsAndN);
    },
    handleClick: function(name) {
      this.selectedN = name;
      this.$router.push("/dashboard/events/");
      this.$emit("handleCurrentN", this.selectedN);
    },
    deleteN: function(name) {
      this.selectedN = name;
      this.$http
        .delete(initialMeta + this.selectedNamespace + "/" + this.selectedN)
        .then(response => {
          if (response.status === 200 && this.$data.id === "Name") {
            this.fetchName(initialMeta + this.selectedNamespace + "/names" + maxLimit);
          }
        });
    }
  },
  computed: {
    ...mapGetters({
      selectedNamespace: "namespace/selectedNamespace",  
    })
  },
  watch: {
    userInputMeta: function(newVal) {
      this.selectedN = newVal;
    }
  }
};
</script>

<style lang="scss" src="@/styles/animation/_animate-cards.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-main span {
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
