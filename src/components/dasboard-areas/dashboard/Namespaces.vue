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
      updatedSearchString: ""
    };
  },
  created() {
    this.initialMeta = "metadata/namespaces";
    this.andFilter = "?filter=";
    this.maxLimit = "?limit=0";
  },
  async beforeMount() {
    await this.fetchNamespaces(this.initialMeta + this.maxLimit);
    if (this.notBlank) {
      return true;
    }
  },
  updated() {
    if (this.notBlank) {
      this.highlighed();
    }
  },
  methods: {
    async fetchNamespaces(queryString) {
      this.$store.dispatch(
        "updateNotice",
        {
          code: "valid",
          message: "Gathering all the namespaces"
        },
        { root: true }
      );
      await this.$store.dispatch("namespace/getNS", queryString);
    },
    updateNamespaces: function() {
      if (this.updatedSearchString < 1) {
        // return ALL NS as result of SEARCH being cleared
        const fetchAllQuery = this.initialMeta + this.maxLimit;
        this.$store.dispatch(
          "updateNotice",
          {
            code: "valid",
            message: "Gathering all of the available Namespaces!"
          },
          { root: true }
        );
        this.$store.dispatch("namespace/getNS", fetchAllQuery);
      } else {
        // return FILTERED NS or CREATED NS as result
        const fetchSearchedQuery =
          this.initialMeta + this.andFilter + this.updatedSearchString;
        this.$store.dispatch(
          "updateNotice",
          {
            code: "valid",
            message: `Filtering the Namespaces with ${this.searchedContent}`
          },
          { root: true }
        );
        this.$store.dispatch("namespace/getNS", fetchSearchedQuery);
      }
    },
    returnSelectedNS: function(returnedNS) {
      this.fetchNamespaces(this.initialMeta + this.andFilter + returnedNS);
    },
    handleClick: function(namespace) {
      this.$store.dispatch("namespace/selectNS", namespace);
      // this.saveSearch(this.searchedContent);
      this.$router.push("/dashboard/namespace/");
    },
    highlighed: function() {
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
    }),
    notBlank: function() {
      if (this.selectedNamespace !== "") {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    searchedContent(newVal) {
      this.updatedSearchString = newVal;
      this.updateNamespaces();
    },
    selectedNamespace(newVal) {
      // this.updateFromCreated(newVal);
      this.returnSelectedNS(newVal);
    }
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
