<template>
  <div class="dashboard-nav-main">
    <div class="dash-nav-item">
      <router-link to="/dashboard/" tag="button" class="btn" exact
        >Namespaces</router-link
      >
    </div>
    <div class="dash-nav-item">
      <router-link to="/dashboard/namespace" tag="button" class="btn"
        >Names</router-link
      >
    </div>
    <div class="dash-nav-item">
      <router-link to="/dashboard/events" tag="button" class="btn"
        >Events</router-link
      >
    </div>

    <div class="dash-nav-item settings-nav">
      <router-link to="/settings" tag="button" class="btn"
        >Settings</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboard-nav-main",
  data() {
    return {
      activeNav: null
    };
  },
  methods: {
    // activeLink: function(event) {
    //   const element = event.target;
    //   const link = element.dataset.link;
    //   this.activeNav = link;
    //   this.$router.push("/dashboard/" + link).catch(err => {});
    // }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-nav-main {
  align-items: center;
  // align-self: stretch;
  background-color: tint($color2, $tint15);
  border-top: 1px inset tint($color2, $tint50);
  display: inline-grid;
  grid-area: dashboard-nav-main;
  grid-gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  justify-items: center;
  height: 100%;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  }

  .dash-nav-item {
    align-items: stretch;
    display: grid;
    height: 50px;
    text-align: center;
    width: 100%;

    &.settings-nav {
      grid-row-end: -1;
    }

    @include for-size(tablet-portrait-up) {
      height: 100%;
    }

    button {
      background-color: $color2;
      border: none;
      color: white;
      padding: calc(#{$spacingDefault} / 2);

      &.router-link-active {
        background-color: $valid;
        color: $color2;
        font-weight: 600;
      }

      &:hover {
        background-color: shade($color1, $shade10);
        color: $color2;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
