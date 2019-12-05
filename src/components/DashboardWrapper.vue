<template>
  <div class="dashboard-wrapper">
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
    <div class="item" :class="{'active-item': elementHover}" @mouseover="elementHover = true"
        @mouseout="elementHover = false">
      <div
        class="inner-item"
        
      >content here 1</div>
    </div>
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
    <div class="item">
      <div class="inner-item">content here 1</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardWrapper",
  data() {
    return {
      elementHover: false
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.dashboard-wrapper {
  background-color: lightcyan;
  display: inline-grid;
  grid-area: dashboard-wrapper;
  grid-gap: 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(max-content, auto));
  grid-auto-rows: minmax(auto, 150px);
  padding: $spacingDefault;

  @include for-size(tablet-portrait-up) {
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  }



  .item {
    align-items: center;
    border: 1px solid $color2;
    border-radius: 0.3rem;
    color: tint($color2, $tint100);
    display: grid;
    height: 100%;
    opacity: 1;

  &:hover:not(.active-item) {
    opacity: .25;
}
// & .item:hover {
//     opacity: 1;
// }

    &:hover {
      border-radius: 0.4rem;
      border-width: 3px;
      transition: all 0.3s ease-in;

      .inner-item {
        background-color: $color1;
        border: 2px groove $color1;
        font-size: 1.1rem;
        height: calc(100% - 0.5rem);
        width: calc(100% - 0.5rem);
        transition: all 0.3s ease-in;
      }

      
    }
 
    .inner-item {
      align-items: center;
      background: $color2;
      border-radius: inherit;
      cursor: pointer;
      display: grid;
      height: calc(100% - 0.4rem);
      justify-self: center;
      width: calc(100% - 0.4rem);
    }
  }
}
</style>
