<template>
  <div class="dashboard-wrapper">
    <router-view :userInputMeta="userInputMeta" v-on:handleCurrentNS="retainCurrentNS" :selectedNS="currentNS" />
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
      currentNS: null
    }
  },
  methods: {
    retainCurrentNS: function(selectedNS) {
      this.currentNS = selectedNS;
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
