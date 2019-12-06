<template>
  <div class="main-nav-dashboard">
    <div class="dash-nav-item">
      <!-- <button @click="navigateTo" :class="{active: this.activeNav === 'dashboard'}" data-link="" class="btn">Namespaces</button> -->
      <router-link to="/dashboard/" tag="button" class="btn" exact
        >Namespaces</router-link
      >
    </div>
    <div class="dash-nav-item">
      <router-link to="/dashboard/names" tag="button" class="btn"
        >Names</router-link
      >
    </div>
    <div class="dash-nav-item">
      <router-link to="/dashboard/test" tag="button" class="btn"
        >Test
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "main-nav-dashboard",
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
.main-nav-dashboard {
  align-items: center;
  // align-self: stretch;
  background-color: pink;
  border-top: 1px solid tint($color2, $tint50);
  display: inline-grid;
  grid-area: main-nav-dashboard;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  justify-items: center;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, minmax(50px, 100px));
  }

  .dash-nav-item {
    align-items: center;
    display: grid;
    height: 50px;
    text-align: center;
    width: 100%;

    &:hover {
      background-color: $color2;
      color: tint($color2, $tint50);
      cursor: pointer;
    }

    button {
      background-color: red;
      color: white;
      padding: calc(#{$spacingDefault} / 2);

      &.router-link-active {
        background-color: green;
      }
    }
  }
}
</style>
