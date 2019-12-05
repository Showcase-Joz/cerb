<template>
  <div class="dashboard">
    <MainDashNav />
    <SearchInput />
    <DashboardNamespaces />
  </div>
</template>
<script>
import MainDashNav from "../components/navigation/MainDashboard";
import SearchInput from "../components/SearchInput";
import DashboardNamespaces from "../components/DashboardNamespaces";
export default {
  name: "dashboard",
  components: {
    MainDashNav,
    SearchInput,
    DashboardNamespaces
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
    "dashboard-namespaces";
  // height: 100%;

  @include for-size(tablet-portrait-up) {
    align-content: center;
    grid-template-columns: minmax(60px, 100px) 1fr;
    grid-template-areas:
      "main-nav-dashboard search-input search-input"
      "main-nav-dashboard dashboard-namespaces dashboard-namespaces";
  }
}
</style>
