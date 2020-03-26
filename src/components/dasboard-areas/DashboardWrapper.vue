<template>
  <div class="dashboard-wrapper">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper"
};
</script>
<style lang="scss" src="@/styles/animation/_loading-fade.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-wrapper {
  grid-area: dashboard-wrapper;
  height: auto;
  padding-bottom: calc(#{$spacingDefault} * 2);
  max-height: max-content;
  overflow-y: auto;
  padding-bottom: calc(#{$spacingLarge} * 2);
  position: initial;
}
</style>
