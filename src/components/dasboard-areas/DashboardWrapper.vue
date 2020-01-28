<template>
  <div class="dashboard-wrapper">
    <router-view
      :userInputMeta="userInputMeta"
      v-on:handleCurrentNS="retainCurrentNS"
      v-on:handleCurrentN="retainCurrentN"
      v-on:handleNewNS="retainNewNS"
      :forceRenderMethod="forceRender"
      :selectedNS="currentNS"
      :selectedN="currentN"
      :newNS="createdNS"
    />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  props: {
    userInputMeta: {
      type: Object
    }
  },
  data() {
    return {
      currentNS: null,
      createdNS: null,
      currentN: null
    };
  },
  methods: {
    retainCurrentNS: function(selectedNS) {
      this.currentNS = selectedNS;
    },
    retainCurrentN: function(selectedN) {
      this.currentN = selectedN;
    },
    retainNewNS: function(createdNS) {
      this.createdNS = createdNS;
      this.$emit("selectedNS", createdNS)
    },
    forceRender: function() {
      this.componentKey += 1;
      console.log("test");
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-wrapper {
  grid-area: dashboard-wrapper;
  max-height: inherit;
  overflow-y: overlay;
}
</style>
