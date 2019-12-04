<template>
  <div class="dashboard-wrapper">
    <div class="item">content here</div>
    <div class="item">content here</div>
    <div class="item">content here</div>
    <div class="item">content here</div>
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper"
};
</script>
<style lang="scss" scoped>
.dashboard-wrapper {
  background-color: lightcyan;
  display: inline-grid;
  grid-area: dashboard-wrapper;
  grid-gap: 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(max-content, auto));
  grid-auto-rows: minmax(auto, 150px);
  padding: $spacingDefault;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: repeat(auto-fit, minmax(max-content, 230px));
  }

  .item {
    display: grid;
    align-items: center;
    justify-items: center;
    // max-height: 350px;
    max-width: 100%;
    background: green;
    color: white;
    height: 100%;
  }
}
</style>