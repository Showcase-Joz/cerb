<template>
  <div class="dashboard-wrapper">
    <router-view :userInputMeta="userInputMeta" />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  props: {
    userInputMeta: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
  .dashboard-wrapper {
    grid-area: dashboard-wrapper;
  }
</style>