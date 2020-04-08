<template>
  <div class="form-group">
    <input type="checkbox" class="switch" name="" id="" />
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch"
};
</script>

<style lang="scss" scoped>
input[type="checkbox"].switch {
  background-color: $color2;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  height: 40px;
  position: relative;

  -webkit-appearance: none;
  width: 80px;

  &:before {
    background-color: $color1;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    content: "";
    height: 40px;
    left: 0;
    position: absolute;
    top: 0;
    transform: scale(0.9);
    transition: all 0.5s ease-in;
    // transition: background-color .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 40px;
  }

  &:checked {
    background-color: $color2;
  }

  &:checked::before {
    left: 40px;
    background-color: $valid;
  }
}
</style>
