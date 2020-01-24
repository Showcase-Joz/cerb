<template>
  <div class="dashboard-main">
    <div class="loading" v-if="loading">Loading...</div>
    <CreateItem />
    <div
      tabindex="0"
      class="item"
      :key="index"
      v-for="(namespace, index) in namespaceResults"
      @click="handleClick(namespace)"
      @keyup.enter="handleClick(namespace)"
      @keyup.right.down.prevent="focusNext"
      @keyup.left.up.prevent="focusPrevious"
    >
      <span @click="deleteNS(namespace)">x</span>
      {{ namespace }}
    </div>
  </div>
</template>
<script>
import CreateItem from "../../form/CreateItem";
// const initialMeta = "metadata/namespaces";
const initialQuery = "metadata/namespaces?";
const filter = "filter=";
// const andFilter = "&filter=";
const maxLimit = "limit=0";
const andMaxLimit = "&limit=0";
export default {
  name: "DashboardNamespaces",
  props: {
    passNsSearchString: {
      type: String,
      default: ""
    }
  },
  components: {
    CreateItem
  },
  data() {
    return {
      id: "Namespace",
      lastSearchInputValue: "",
      loading: false,
      namespaceResults: []
    };
  },
  beforeMount() {
    if (this.passNsSearchString !== "") {
      const updateNamespaces =
        initialQuery + filter + this.passNsSearchString + andMaxLimit;
      this.fetchNamespaces(updateNamespaces);
      this.lastSearchInputValue = this.passNsSearchString;
    } else if (this.passNsSearchString === "") {
      this.fetchNamespaces(initialQuery + maxLimit);
    }
  },
  mounted() {
    this.focusItems();
  },
  methods: {
    fetchNamespaces: function(stringSuffix) {
      this.loading = true;
      this.$http.get(stringSuffix).then(
        response => {
          if (response.ok === true) {
            this.loading = false;
            this.namespaceResults = response.body.namespaces;
          } else if (response.ok === false) {
            console.log("there are NO results for some reason!");
          }
        },
        error => {
          this.loading = false;
          console.log("Error: ", error);
        }
      );
    },
    fetchSearchResult: function() {
      if (this.passNsSearchString === "") {
        this.fetchNamespaces(initialQuery + maxLimit);
      } else {
        const updateNamespaces =
          initialQuery + filter + this.passNsSearchString + andMaxLimit;
        this.fetchNamespaces(updateNamespaces);
      }
    },
    handleClick: function(namespace) {
      this.$emit("userSelectedNS", namespace);
      this.fetchSearchResult();
      this.$router.push("/dashboard/namespace/");
    },
    focusNext: function() {
      document.activeElement.nextSibling.focus();
    },
    focusPrevious: function() {
      document.activeElement.previousSibling.focus();
    },
    focusItems: function() {
      setTimeout(function() {
        const childItemExists = document.getElementById("createNew")
          .parentElement.childElementCount;
        if (childItemExists > 1) {
          document.getElementById("createNew").nextElementSibling.focus();
        } else {
          return;
        }
      }, 2000);
    },
    deleteNS: function(namespace) {
      // this.$http
      //   .delete(initialMeta + "/" + namespace)
      //   .then(response => {
      //     if (response.ok === true) {
      //       this.fetchNamespaces(initialMeta + maxLimit);
      //     }
      //   });
      console.log(
        "this deletes " + namespace + ", uncomment the code to continue"
      );
    }
  },
  watch: {
    passNsSearchString: function(newVal, oldVal) {
      this.lastSearchInputValue = oldVal;
      this.fetchSearchResult();
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
    height: 100%;
    opacity: 1;
    position: relative;
    word-break: break-word;

    & span {
      color: $invalid;
      content: "x";
      font-size: larger;
      margin: 5px 7px;
      position: absolute;
      right: 0;
      top: 0;
    }

    // &:hover :not(.active-item) {
    //   opacity: 0.25;
    // }

    &:focus {
      box-shadow: 0 0 10px 1px $color2;
      outline: none;
    }

    &:hover,
    &:focus {
      background-color: $color1;
      border-radius: 0.4rem;
      border-width: 3px;
      color: $color2;
      transition: all 0.15s ease-in;

      .inner-item {
        background-color: $color1;
        border: 2px groove $color1;
        color: $color2;
        font-size: 1.1rem;
        height: calc(100% - 0.5rem);
        width: calc(100% - 0.5rem);
        transition: all 0.15s ease-in;
      }
    }

    .inner-item {
      align-items: center;
      background: $color2;
      border-radius: inherit;
      cursor: pointer;
      display: grid;
      height: calc(100% - 0.4rem);
      justify-self: center;
      width: calc(100% - 0.4rem);
    }
  }
  .loading {
    color: white;
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
