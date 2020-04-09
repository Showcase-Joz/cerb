<template>
  <div class="form-group">
    <div class="toggle-switch-grid">
      <div :class="{ toggledOn: !this.getType }" v-on:click="changeToggle">
        Single Instance
      </div>
      <div>
        <input
          type="checkbox"
          class="switch"
          v-model="getType"
          v-on:input="changeToggle"
        />
      </div>
      <div :class="{ toggledOn: this.getType }" v-on:click="changeToggle">
        Multiple Instances
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitchClear",
  data() {
    return {
      getType: false
    };
  },
  methods: {
    changeToggle: function() {
      this.getType ? (this.getType = false) : (this.getType = true);
      this.$emit("updateToggleValue", this.getType);
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle-switch-grid {
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-template-columns: min-content 1fr min-content;

  div:nth-child(2) {
    display: grid;
    justify-items: center;
  }

  .toggledOn {
    color: inherit;
    font-size: x-small;
    font-weight: $heavy;
    text-transform: uppercase;

    @include for-size(tablet-portrait-up) {
      font-size: smaller;
    }
  }

  :not(.toggledOn) {
    cursor: inherit;
    font-size: small;
    line-height: 0.75rem;
    text-decoration: line-through solid $invalid;
    text-transform: lowercase;

    @include for-size(tablet-portrait-up) {
      font-size: medium;
      line-height: unset;
    }
  }

  input[type="checkbox"].switch {
    appearance: none;
    -webkit-appearance: none;
    background-color: tint($color1, $tint100);
    border-radius: 0.3rem;
    box-shadow: inset 0 0 5px shade($color1, $shade25);
    height: 40px;
    position: relative;
    width: 80px;

    &:hover {
      background-color: tint($color1, $tint90);
    }

    &:hover:before,
    &:hover:checked::before {
      background-color: shade($color1, $shade10);
      // box-shadow: 2px 0 3px shade($color1, $shade50);
    }

    &:before {
      background-color: $color1;
      border-radius: 0.3rem;
      // box-shadow: -2px 0 5px shade($color1, $shade75);
      content: "";
      height: 40px;
      left: 0;
      position: absolute;
      top: 0;
      transform: scale(0.9);
      transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
      // transition: background-color .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: 40px;
    }

    &:checked {
      // background-color: tint($color1, $tint100);
    }

    &:checked::before {
      left: 40px;
      background-color: $color1;
      // box-shadow: 2px 0 5px shade($color1, $shade75);
    }
  }
}
</style>
