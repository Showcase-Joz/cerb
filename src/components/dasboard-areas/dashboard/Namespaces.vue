<template>
  <div>
    <div class="dashboard-main">
      <transition-group appear name="animate-cards">
        <CreateItem key="99999" />

        <div
          class="item"
          v-for="(namespace, index) in this.currentNamespaces"
          :key="index"
          :ref="index"
          @click="handleClick(namespace)"
          @keyup.enter="handleClick(namespace)"
        >
          <div class="delete" @click.stop.prevent="deleteNamespace(namespace)">
            x
          </div>
          <div class="title">{{ namespace }}</div>
          <div class="count">
            <div>{{ index + 1 }}</div>
            /{{ counts.count }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CreateItem from "../../form/CreateItem.vue";
export default {
  name: "DashboardNamespaces",
  inheritAttrs: false,
  components: {
    CreateItem
  },
  data() {
    return {
      id: "Namespace",
      updatedSearchString: "",
      updatedCreatedNamespace: ""
    };
  },
  created() {
    this.initialMeta = "metadata/namespaces";
    this.andFilter = "?filter=";
    this.maxLimit = "?limit=0";
  },
  async beforeMount() {
    if (this.selectedNamespace === "" && this.currentNamespaces === null) {
      // initial fetch
      // await this.fetchNamespaces(this.initialMeta + this.maxLimit);
      await this.fetchNamespaces(this.initialMeta);
    } else {
      await this.$store.dispatch("updateNotice", {
        code: "valid",
        message: `Gathering <em>all</em> locally stored Namespaces`
      });
      await this.$store.dispatch("namespace/getLocalNS");
      console.warn("fetching local NS on mount");
    }
    if (this.currentNamespaces !== null) {
      this.highlighted();
    }
  },
  updated() {
    if (this.currentNamespaces !== null) {
      this.highlighted();
    }
  },
  methods: {
    async fetchNamespaces(queryString) {
      this.$store.dispatch("updateNotice", {
        code: "neutral",
        message: `Gathering <em>all</em> the namespaces`
      });
      await this.$store.dispatch("namespace/getNS", queryString);
    },
    async updateNamespaces() {
      if (this.updatedSearchString.length === 0) {
        // return ALL NS as result of SEARCH being cleared
        const fetchAllQuery = this.initialMeta + this.maxLimit;
        await this.$store.dispatch("updateNotice", {
          code: "valid",
          message: `Gathering <strong id='msgStrong'>all of the available</strong> Namespaces through the API`
        });
        await this.$store.dispatch("namespace/getNS", fetchAllQuery);
      } else if (this.createdNamespace !== "") {
        await this.$store.dispatch("updateNotice", {
          code: "valid",
          message: `Creating the <strong id='msgStrong'>${this.createdNamespace}</strong> Namespace`
        });
      } else {
        // return FILTERED NS or CREATED NS as result
        // const fetchSearchedQuery =
        //   this.initialMeta + this.andFilter + this.updatedSearchString;
        await this.$store.dispatch("updateNotice", {
          code: "valid",
          message: `${
            this.searchedContent.length > 0
              ? `Filtering available Namespaces <em>locally</em> with <strong id='msgStrong'>${this.searchedContent}</strong>`
              : `Gathering <em>all</em> locally stored Namespaces`
          }`
        });
        await this.$store.dispatch("namespace/getLocalNS");
      }
    },
    // returnSelectedNS: function(returnedNS) {
    //   this.fetchNamespaces(this.initialMeta + this.andFilter + returnedNS);
    // },
    handleClick: function(namespace) {
      if (
        this.selectedNamespace !== namespace ||
        this.selectedNamespace === ""
      ) {
        this.$store.dispatch("name/clearCurrent");
        this.$store.dispatch("namespace/selectNS", namespace);
        this.$router.push("/dashboard/namespace/");
      } else {
        console.warn("local fetch N");
        this.$router.push("/dashboard/namespace/");
      }
    },
    highlighted: function() {
      if (this.currentNamespaces.includes(this.selectedNamespace)) {
        // get the value of...
        const highlightedNS = this.currentNamespaces.indexOf(
          // selected namespace
          // previously captured in vuex, now has value
          this.selectedNamespace
        );
        // use value to drill into div.items array and get
        const element = this.$refs[highlightedNS][0];
        // add a class to the node
        element.classList.add("highlighted");
        this.$nextTick(function() {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center"
            // inline: "center"
          });
        });
      } else {
        return;
      }
    },
    async deleteNamespace(namespace) {
      const verifyModal = {
        modalState: !this.showModal,
        actionName: "DELETE",
        actionID: this.$data.id,
        server: {
          initialMeta: this.initialMeta,
          maxLimit: this.maxLimit
        },
        deleteItem: namespace,
        modalOptions: {
          type: "danger",
          title: `Delete this ${this.$data.id}?`,
          content: `<p id="message">You are about to <strong>delete</strong> the <strong class="warning">${namespace}</strong> ${this.$data.id.toLowerCase()} card from Typhon as well as the API instance!.</p><p id="message-confirm">To confirm, select DELETE below.</p>`,
          leftAction: "cancel",
          leftActionConfirm: "cancel",
          rightAction: "DELETE",
          rightActionConfirm: "are you sure?"
        }
      };
      await this.$store.dispatch("updateVerifyModal", verifyModal);
    }
  },
  computed: {
    ...mapGetters({
      currentNamespaces: "namespace/currentNamespaces",
      selectedNamespace: "namespace/selectedNamespace",
      createdNamespace: "createItem/createdNamespace",
      counts: "namespace/counts",
      searchedContent: "search/searchedContent",
      showModal: "showModal"
    })
  },
  watch: {
    searchedContent(newVal) {
      this.updatedSearchString = newVal;
      this.updateNamespaces();
    },
    createdNamespace(newVal) {
      this.updatedCreatedNamespace = newVal;
      this.updateNamespaces();
    }
    // selectedNamespace(newVal) {
    //   // this.updateFromCreated(newVal);
    //   this.returnSelectedNS(newVal);
    // }
  }
};
</script>
<style lang="scss" src="@/styles/animation/_animate-cards.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-main span {
  align-items: center;
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
    height: 100%;
    opacity: 1;
    position: relative;
    text-transform: uppercase;
    word-break: break-word;
    z-index: 1;

    &:hover {
      background-color: $color1;
      border: calc(#{$borderRadius} / 1.25) ridge tint($color2, $tint25);
      border-radius: $borderRadius;
      box-shadow: 1px 1px 4px 2px rgba(shade($color2, $shade100), 0.2),
        -1px -1px 4px 2px rgba(shade($color2, $shade100), 0.2);
      color: $color2;
      font-weight: $heavy;
      transition: all 0.3s ease-in;

      & .delete {
        opacity: 1;
        transition: opacity 0.3s ease-in 1.25s;

        &:hover {
          background-color: $neutral;
          color: $invalid;
        }
      }

      .count {
        opacity: 1;

        div {
          color: tint($color1, $tint75);
          font-size: xx-large;
          line-height: 0;
          transition: font-size 0.25s ease;
        }
      }
    }

    & .title {
      justify-self: center;
      max-width: 80%;
    }

    .count {
      bottom: 5px;
      font-variant: all-petite-caps;
      opacity: 0.6;
      position: absolute;
      right: 5px;

      & div {
        display: inline;
        transition: font-size 0.3s ease;
      }
    }

    & .delete {
      align-items: center;
      color: shade($color1, $shade100);
      content: "x";
      display: grid;
      font-size: larger;
      height: auto;
      justify-content: center;
      margin: 5px 7px;
      max-height: 25px;
      min-width: 25px;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity 0.3s ease-in;
      width: 25px;
      z-index: 5;
    }
    &.highlighted {
      @include highlighted;
    }
  }
}
</style>
