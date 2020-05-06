<template>
  <div class="form-wrapper switch-input">
    type area
  </div>
</template>

<script>
  export default {
    name: "type-input"
  }
</script>

<style lang="scss" src="@/styles/_form.scss"></style>
<style lang="scss" src="@/styles/animation/_fade-in-out.scss" scoped></style>
<style lang="scss" scoped>
.form-wrapper.switch-input {
  // border: 1px $color2 solid;
  background-color: tint($color2, $tint100);
  grid-area: switch-input;
  max-height: 62px;
  padding: $spacingDefault;

}

</style>