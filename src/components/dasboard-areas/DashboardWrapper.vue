<template>
  <div class="dashboard-wrapper" @keyup.enter.prevent="handleSearch">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  created() {
    document.addEventListener("keyup", this.handleSearch);
  },
  methods: {
    handleSearch: function(e) {
      var map = { e };
      onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == "keydown";
        if (map[18] && map[91]) {
          document.getElementsByName("searchString")[0].focus();
          // searchInput[0].focus();
        }
      };
    }
  }
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
