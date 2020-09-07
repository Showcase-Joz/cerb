<template>
  <transition appear name="slide-right">
    <div class="form-wrapper switch-input">dateRange area</div>
  </transition>
</template>

<script>
export default {
  name: "dateRange-input"
};
</script>

<style lang="scss" src="@/styles/_form.scss"></style>
<style lang="scss" src="@/styles/animation/_slide-right.scss" scoped></style>
<style lang="scss" scoped>
.form-wrapper.switch-input {
  // border: 1px $color2 solid;
  background-color: tint($color2, $tint100);
  grid-area: switch-input;
  max-height: 62px;
  padding: $spacingDefault;
}
</style>
