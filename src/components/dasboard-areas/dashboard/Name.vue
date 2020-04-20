<template>
  <div class="dashboard-main">
    <transition-group appear name="animate-cards">
      <CreateItem key="99999" />
      <div
        class="item"
        v-for="(names, index) in currentNames"
        :key="index"
        :ref="index"
        @click="handleClick(names)"
        @keyup.enter="handleClick(names)"
      >
        <div class="delete" @click.stop.prevent="deleteName(names)">x</div>
        {{ names }}
        <!-- {{ object.event.name }} -->
      </div>
    </transition-group>
  </div>
</template>
<script>
import CreateItem from "../../form/CreateItem";
import { mapGetters } from "vuex";
export default {
  name: "DashboardNames",
  inheritAttrs: false,
  components: {
    CreateItem
  },
  data() {
    return {
      id: "Name",
      updatedSearchString: ""
    };
  },
  created() {
    (this.initialMeta = "metadata/"),
      (this.andFilter = "?filter="),
      (this.maxLimit = "?limit=0");
  },
  async beforeMount() {
    this.groupNames =
      this.initialMeta + this.selectedNamespace + "/names" + this.maxLimit;
    if (this.selectedName === "" && this.currentNames === null) {
      // initial fetch
      await this.fetchName(this.groupNames);
    } else if (this.currentNames.length === 1 && this.storedN !== "") {
      // fetch if "search content" has been used (as it reduces the currentNames array to 1)
      await this.fetchName(this.groupNames);
      await this.$store.dispatch("search/storedN", "", { root: true });
    } else {
      await this.$store.dispatch(
				"updateNotice",
				{
					code: "valid",
					message: `Fetching <em>all</em> locally stored Names`
				},
				{ root: true }
			);
			await this.$store.dispatch("name/getLocalN");
      console.warn("fetching local N on mount");
    }
  },
  updated() {
    this.highlighed();
  },
  methods: {
    async fetchName(queryString) {
      await this.$store.dispatch("name/getN", queryString);
    },
    // updateFromCreated: function() {
    // 	const newNsAndN = this.initialMeta + this.selectedNamespace + "/names";
    // 	this.fetchName(newNsAndN);
    // },
    async updateNames() {
      if (this.updatedSearchString.length === 0) {
        // return ALL N as result of SEARCH being cleared
        const fetchAllQuery =
          this.initialMeta + this.selectedNamespace + "/names";
        await this.$store.dispatch(
          "updateNotice",
          {
            code: "valid",
            message: `Gathering <strong id='msgStrong'>all of the available</strong> Names through the API`
          },
          { root: true }
        );
        await this.$store.dispatch("name/getN", fetchAllQuery);
      } else {
        // return FILTERED NS or CREATED N as result
        // const fetchSearchedQuery =
        //   this.initialMeta +
        //   this.selectedNamespace +
        //   "/names" +
        //   this.andFilter +
        //   this.updatedSearchString;
        await this.$store.dispatch(
          "updateNotice",
          {
            code: "valid",
            message: `${this.searchedContent.length > 0 ? `Filtering available Names <em>locally</em> with <strong id='msgStrong'>${this.searchedContent}</strong>` : `Fetching <em>all</em> locally stored Names`}`
          },
          { root: true }
        );
        await this.$store.dispatch("name/getLocalN",);
      }
    },
    handleClick: function(name) {
      if (this.selectedName !== name || this.selectedName === "") {
        this.$store.dispatch("events/clearCurrent");
        this.$store.dispatch("name/selectN", name);
        this.$router.push("/dashboard/events/");
      } else {
        console.warn("local fetch E");
        this.$router.push("/dashboard/events/");
      }
    },
    highlighed: function() {
      if (this.currentNames.includes(this.selectedName)) {
        // get the value of...
        const highlightedN = this.currentNames.indexOf(
          // selected namespace
          // previously captured in vuex, now has value
          this.selectedName
        );
        // use value to drill into div.items array and get
        const element = this.$refs[highlightedN][0];
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
    async deleteName(name) {
      const verifyModal = {
        modalState: !this.showModal,
        actionName: "DELETE",
        actionID: this.$data.id,
        server: {
          initialMeta: this.initialMeta,
          maxLimit: this.maxLimit
        },
        deleteItem: name,
        parentNamespace: this.selectedNamespace,
        modalOptions: {
          type: "danger",
          title: `Delete this ${this.$data.id}?`,
          content: `<p id="message">You are about to <strong>delete</strong> the <strong class="warning">${name}</strong> ${this.$data.id.toLowerCase()} card from Typhon as well as the API instance!.</p><p id="message-confirm">To confirm, select DELETE below.</p>`,

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
      currentNames: "name/currentNames",
      selectedName: "name/selectedName",
      createdName: "createItem/createdName",
      counts: "name/counts",
      searchedContent: "search/searchedContent",
      storedN: "search/storedN",
      selectedNamespace: "namespace/selectedNamespace"
    })
  },
  watch: {
    searchedContent(newVal) {
      this.updatedSearchString = newVal;
      this.updateNames();
    }
    // selectedName(newVal) {
    //   // this.updateFromCreated(newVal);
    //   this.$store.dispatch("name/selectN", newVal)
    // }
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
