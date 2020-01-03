<template>
  <div class="dashboard-main">
    <div class="loading" v-if="loading">Loading...</div>
    <CreateItem v-on:passNewItem="createUserNS" />
    <div
      tabindex="0"
      class="item"
      v-for="(namespace, index) in namespaceResults"
      :key="index"
      @click="handleClick(namespace)"
      @keyup.enter="handleClick(namespace)"
    >
      <span @click="deleteNS(namespace)">x</span>
      {{ namespace }}
    </div>
  </div>
</template>
<script>
import CreateItem from "../../form/CreateItem";
const initialMeta = "metadata/namespaces";
const andFilter = "?filter=";
const maxLimit = "?limit=1000";
export default {
  name: "DashboardNamespaces",
  inheritAttrs: false,
  props: {
    userInputMeta: {
      type: Object
    }
  },
  components: {
    CreateItem
  },
  data() {
    return {
      namespaceResults: [],
      searchInputUpdatedValue: null,
      selectedNS: null,
      passedNS: null,
      loading: false,
      id: "Namespace"
    };
  },
  beforeMount() {
    if (this.$attrs.selectedNS === null) {
      this.fetchNamespaces(initialMeta + maxLimit);
    } else if (this.$attrs.selectedNS !== null) {
      const slelectedNS =
          initialMeta + andFilter + this.$attrs.selectedNS;
        this.fetchNamespaces(slelectedNS);
    } else {
      error => {
        console.log("Error: ", error);
      };
    }
  },
  // created() {
  //   if ( Object.keys(this.userInputMeta).length === 0 ) {
  //     console.log("test");
  //     // no value in searchbar
  //     const clearData = null;
  //     this.$emit("clearSearch", clearData);
  //     console.log("clearned");
      
      
  //   } else if ( this.userInputMeta.namespace.length !== 0 ) {
  //     console.log("tets2");
  //     // has value in searchbar

      
  //   }
  // },
  methods: {
    fetchNamespaces: function(stringSuffix) {
      this.loading = true;
      this.$http.get(stringSuffix).then(
        response => {
          if (response.ok === true) {
            this.loading = false;
            this.namespaceResults = response.body.namespaces;
          } else if (response.ok === false) {
            this.resultBoolean = false;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    },
    updateNamespaces: function() {
      if (this.searchInputUpdatedValue.namespace.length < 1) {
        this.fetchNamespaces(initialMeta + maxLimit);
      } else {
        const updatedMeta =
          initialMeta + andFilter + this.searchInputUpdatedValue.namespace;
        this.fetchNamespaces(updatedMeta);
      }
    },
    createUserNS: function(passedNS) {
      this.passedNS = passedNS;
    },
    updateFromCreated: function(newNS) {
      const justNewNS = initialMeta + andFilter + newNS;
      this.$emit("handleNewNS", newNS);
      this.fetchNamespaces(justNewNS);
    },
    handleClick: function(namespace) {
      this.selectedNS = namespace;
      this.$emit("handleCurrentNS", this.selectedNS);
      this.$emit("clearSearch", true);
      this.$router.push("/dashboard/namespace/");
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
    userInputMeta: function(newVal) {
      this.searchInputUpdatedValue = newVal;
      this.updateNamespaces();
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

    &:hover {
      background-color: $color1;
      border-radius: 0.4rem;
      border-width: 3px;
      color: $color2;
      transition: all 0.3s ease-in;

      .inner-item {
        background-color: $color1;
        border: 2px groove $color1;
        color: $color2;
        font-size: 1.1rem;
        height: calc(100% - 0.5rem);
        width: calc(100% - 0.5rem);
        transition: all 0.3s ease-in;
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
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
