<template>
  <div class="dashboard-wrapper">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  data() {
    return {
    };
  },
  methods: {
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
