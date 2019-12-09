<template>
  <div class="dashboard-wrapper">
    <router-view :userInputMeta="passedMeta" />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper"
}
</script>
<style lang="scss" scoped>
  .dashboard-wrapper {
    grid-area: dashboard-wrapper;
  }
</style>