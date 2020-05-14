<template>
  <div class="dashboard">
    <MainDashNav />
    <AscDescInput v-if="this.switchValue === 'ascDesc'" />
    <DateRangeInput v-if="this.switchValue === 'dateRange'" />
    <SearchInput v-if="this.switchValue === 'filterText'" />
    <TypeInput v-if="this.switchValue === 'type'" />
    <ViewControls v-on:switchRestrict="switchType" />
    <DashboardWrapper />
  </div>
</template>
<script>
import MainDashNav from "../components/navigation/MainDashboard";
import AscDescInput from "../components/dasboard-areas/AscDescInput";
import DateRangeInput from "../components/dasboard-areas/DateRangeInput";
import SearchInput from "../components/dasboard-areas/SearchInput";
import TypeInput from "../components/dasboard-areas/TypeInput";
import ViewControls from "../components/dasboard-areas/ViewControls";
import DashboardWrapper from "../components/dasboard-areas/DashboardWrapper";
export default {
  name: "dashboard",
  data() {
    return {
      switchValue: "filterText"
    };
  },
  components: {
    MainDashNav,
    AscDescInput,
    DateRangeInput,
    SearchInput,
    TypeInput,
    ViewControls,
    DashboardWrapper
  },
  methods: {
    switchType: function(type) {
      this.switchValue = type;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  align-content: start;
  display: grid;
  grid-template-areas:
    "dashboard-nav-main"
    "view-controls"
    "switch-input"
    "dashboard-wrapper";
  grid-template-columns: 1fr;
  height: calc(100vh - 120px);
  position: relative;

  @include for-size(tablet-portrait-up) {
    align-content: end;
    grid-template-areas:
      "dashboard-nav-main switch-input view-controls"
      "dashboard-nav-main dashboard-wrapper dashboard-wrapper";
    grid-template-columns: minmax(max-content, 150px) 1fr minmax(min-content, max-content);
    grid-auto-rows: max-content 1fr;
  }

}
</style>
