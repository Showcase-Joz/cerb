<template>
  <div class="main-nav-dashboard">
    <div class="dash-nav-item">
      <button @click="navigateTo" data-link="namespaces" class="btn">Namespaces</button>
    </div>
    <div class="dash-nav-item">
      <button @click="navigateTo" data-link="names" class="btn">Names</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "main-nav-dashboard",
  methods: {
    navigateTo: function(event) {
      const element = event.target;
      const link = element.dataset.link;
      this.$router.push("/dashboard/" + link);
    }
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
    width: 50px;

    &:hover {
      background-color: $color2;
      color: tint($color2, $tint50);
      cursor: pointer;
    }
  }
}
</style>
