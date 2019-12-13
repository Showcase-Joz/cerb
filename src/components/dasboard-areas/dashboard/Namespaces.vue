<template>
  <div class="dashboard-main">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="item item-create">
      <span class="create-title">Create</span>
      <div class="form-group">
        <input class="create-input" type="text" value="this is a test" />
        <button class="add-created" type="submit">Add</button>
      </div>
    </div>
    <div
      class="item"
      v-for="(namespace, index) in namespaceResults"
      :key="index"
      @click="handleClick(namespace)"
    >{{ namespace }}</div>
  </div>
</template>
<script>
export default {
  name: "DashboardNamespaces",
  inheritAttrs: false,
  props: {
    userInputMeta: {
      type: Object
    }
  },
  data() {
    return {
      namespaceResults: [],
      searchInputUpdatedValue: null,
      selectedNS: null,
      loading: false
    };
  },
  beforeMount() {
    const initialMeta = "metadata/namespaces?limit=1000";
    this.fetchNamespaces(initialMeta);
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
        const initialMeta = "metadata/namespaces?limit=1000";
        this.fetchNamespaces(initialMeta);
      } else {
        const updatedMeta =
          "metadata/namespaces" +
          "?filter=" +
          this.searchInputUpdatedValue.namespace;
        this.fetchNamespaces(updatedMeta);
      }
    },
    handleClick: function(namespace) {
      this.selectedNS = namespace;
      this.$emit("handleCurrentNS", this.selectedNS);
      this.$router.push("/dashboard/namespace/");
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
    word-break: break-word;

    &.item-create {
      background-color: $color1;
      color: $color2;
      display: grid;
      grid-template-areas: "create-title";
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      grid-template-columns: 1fr;

      .create-title {
        grid-area: create-title;
      }

      .form-group {
        display: none;
        flex-direction: row;
        grid-area: form-group;
        position: relative;

        .create-input {
          border: none;
          border-bottom: 1px solid tint($color1, $tint100);
          background-color: transparent;
          color: tint($color1, $tint100);
          display: block;
          flex-grow: 2;
          font-size: large;
          // grid-area: create-input;
          margin: $spacingDefault;
          padding: calc(#{$spacingDefault} / 3);

          &:focus {
            outline: none;
          }
        }
        .add-created {
          height: 40px;
          min-width: 40px;
          position: absolute;
          right: $spacingDefault;
        }
      }

      &:hover {
        grid-template-areas:
          "create-title .."
          "form-group form-group";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;

        .form-group {
          display: flex;
        }
      }
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
