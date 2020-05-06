<template>
  <div class="view-controls" title="WIP - sort/filter types">
    <div class="vc-item" id="filterText" @click="restrictData($event)">filter text</div>
    <div class="vc-item" id="ascDesc" @click="restrictData($event)">desc/asc sort</div>
    <div class="vc-item" id="type" @click="restrictData($event)">type only</div>
    <div class="vc-item" id="dateRange" @click="restrictData($event)">between dates</div>
  </div>
</template>

<script>
export default {
  name: "View-Controls",
  methods: {
    restrictData: function(event) {
      this.$emit("switchRestrict", event.target.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.view-controls {
  background-color: $color2;
  color: tint($color2, $tint50);
  cursor: help;
  display: grid;
  font-variant-caps: all-petite-caps;
  grid-area: view-controls;
  grid-template-rows: 1fr;
  grid-gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  height: 62px;
  line-height: 1;

  @include for-size(tablet-portrait-up) {
    background-color: tint($color2, $tint100);
    border-bottom: 1px solid tint($color2, $tint75);
    color: tint($color2, $tint50);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-inline-end: $spacingDefault;
    margin-inline-start: -$spacingDefault;
    padding-inline-end: $spacingDefault;
  }

  @include for-size(desktop-up) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
  }

  .vc-item {
    align-self: center;
    display: grid;
    justify-content: space-evenly;
    width: 100%;

    @include for-size(tablet-portrait-up) {
      align-self: end;
      font-size: large;
    }
  }
}
</style>
