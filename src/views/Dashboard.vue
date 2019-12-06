<template>
  <div class="dashboard">
    <MainDashNav />
    <SearchInput />
    <router-view />
  </div>
</template>
<script>
import MainDashNav from "../components/navigation/MainDashboard";
import SearchInput from "../components/SearchInput";
export default {
  name: "dashboard",
  components: {
    MainDashNav,
    SearchInput
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
    grid-template-columns: minmax(auto, 100px) 1fr;
    grid-template-areas:
      "main-nav-dashboard search-input search-input"
      "main-nav-dashboard dashboard-namespaces dashboard-namespaces";
  }
}
</style>
