<template>
  <div class="dashboard">
    <MainDashNav />
    <SearchInput />
    <DashboardWrapper />
  </div>
</template>
<script>
import MainDashNav from "../components/navigation/MainDashboard";
import SearchInput from "../components/SearchInput";
import DashboardWrapper from "../components/DashboardWrapper";
export default {
  name: "dashboard",
  components: {
    MainDashNav,
    SearchInput,
    DashboardWrapper
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  align-content: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "main-nav-dashboard"
    "search-input"
    "dashboard-wrapper";
  // height: 100%;

  @include for-size(tablet-portrait-up) {
    align-content: center;
    grid-template-columns: minmax(60px, 100px) 1fr;
    grid-template-areas:
      "main-nav-dashboard search-input search-input"
      "main-nav-dashboard dashboard-wrapper dashboard-wrapper";
  }
}
</style>
