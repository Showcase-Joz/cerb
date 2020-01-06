<template>
  <div class="dashboard-wrapper">
    <router-view
      :passNsSearchString="passNsSearchString"
      :passNsSelectedString="this.userSelectedNS"
      v-on:userSelectedNS="handleUserSelectedNS"
    />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  props: {
    passNsSearchString: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      userSelectedNS: ""
    };
  },
  methods: {
    handleUserSelectedNS: function(selectedNamespace) {
      this.userSelectedNS = selectedNamespace;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-wrapper {
  grid-area: dashboard-wrapper;
  max-height: inherit;
  overflow-y: overlay;
}
</style>
