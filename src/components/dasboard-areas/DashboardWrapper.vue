<template>
  <div class="dashboard-wrapper">
    <router-view
      :userInputMeta="userInputMeta"
      v-on:handleCurrentNS="retainCurrentNS"
      v-on:handleNewNS="retainNewNS"
      :selectedNS="currentNS"
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
      createdNS: null
    };
  },
  methods: {
    retainCurrentNS: function(selectedNS) {
      this.currentNS = selectedNS;
    },
    retainNewNS: function(createdNS) {
      this.createdNS = createdNS;
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
