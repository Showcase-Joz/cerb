<template>
  <div class="dashboard-main">
    <div class="item" v-for="(namespace, index) in namespaceResults" :key="index">
      <div class="inner-item">{{ namespace }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardNamespaces",
  props: {
    userInputMeta: {
      type: Object
    }
  },
  data() {
    return {
      namespaceResults: null,
      searchInputUpdatedValue: null
    };
  },
  beforeMount() {
    const initialMeta = "metadata/namespaces";
    this.fetchNamespaces(initialMeta);
  },
  methods: {
    fetchNamespaces: function(stringSuffix) {
      this.$http.get(stringSuffix).then(
        response => {
          console.log("Namespaces says: ", response);
          if (response.ok === true) {
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
      const updatedMeta = "metadata/namespaces" + "?filter=" + this.searchInputUpdatedValue.namespace;
      console.log(updatedMeta);
      
      this.fetchNamespaces(updatedMeta);
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
  background-color: lightcyan;
  display: inline-grid;
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
    border-radius: 0.3rem;
    color: tint($color2, $tint100);
    display: grid;
    height: 100%;
    opacity: 1;
    word-break: break-word;

    // &:hover :not(.active-item) {
    //   opacity: 0.25;
    // }

    // & .item:hover {
    //     opacity: 1;
    // }

    &:hover {
      border-radius: 0.4rem;
      border-width: 3px;
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
}
</style>
