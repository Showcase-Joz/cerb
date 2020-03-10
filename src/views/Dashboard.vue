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
import DashboardWrapper from "../components/dasboard-areas/DashboardWrapper";
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
  align-content: start;
  display: grid;
  grid-template-areas:
    "dashboard-nav-main"
    "search-input"
    "dashboard-wrapper";
  grid-template-columns: 1fr;
  height: calc(100vh - 120px);
  position: relative;

  @include for-size(tablet-portrait-up) {
    align-content: center;
    grid-template-areas:
      "dashboard-nav-main search-input search-input"
      "dashboard-nav-main dashboard-wrapper dashboard-wrapper";
    grid-template-columns: minmax(auto, 100px) 1fr;
    grid-auto-rows: max-content 1fr;
  }
}
</style>
