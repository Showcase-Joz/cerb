<template>
  <transition appear name="slide-right">
    <div class="switch-input">ascDesc area</div>
  </transition>
</template>

<script>
export default {
  name: "ascDesc-input"
};
</script>

<style lang="scss" src="@/styles/animation/_slide-right.scss" scoped></style>
<style lang="scss" scoped>
.switch-input {
  align-items: center;
  background-color: tint($color2, $tint100);
  border-bottom: 1px solid rgba($color: shade($color1, $shade90), $alpha: 0.2);
  display: grid;
  grid-area: switch-input;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  justify-items: start;
  height: 62px;
  padding-left: calc(#{$spacingDefault} / 2);
  padding-right: calc(#{$spacingDefault} / 2);
  padding-top: $spacingDefault;
  position: relative;
  column-gap: 1rem;
  max-width: 100%;
  min-width: fit-content;
  width: unset;
}
</style>
