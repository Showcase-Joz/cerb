<template>
  <div class="dashboard">
    <MainDashNav />
    <SearchInput v-on:handleMeta="retainMeta" />
    <DashboardWrapper />
  </div>
</template>
<script>
import MainDashNav from "../components/navigation/MainDashboard";
import SearchInput from "../components/SearchInput";
import DashboardWrapper from "../components/view-parts/DashboardWrapper";
export default {
  name: "dashboard",
  data() {
    return {
      passedMeta: {}
    };
  },
  components: {
    MainDashNav,
    SearchInput,
    DashboardWrapper
  },
  methods: {
    retainMeta: function(metaObj) {
      this.passedMeta = metaObj;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  align-content: center;
  display: grid;
  grid-template-areas:
    "dashboard-nav-main"
    "search-input"
    "dashboard-wrapper";
  grid-template-columns: 1fr;  
  // height: 100%;

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
