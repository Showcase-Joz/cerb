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
  grid-template-columns: 1fr auto 1fr;

  div:nth-child(2) {
    display: grid;
    justify-items: center;
  }

  :not(.toggledOn) {
    cursor: inherit;
    text-decoration: line-through solid $invalid;
    text-transform: lowercase;
  }

  .toggledOn {
    color: $neutral;
    font-size: smaller;
    font-weight: 500;
    text-transform: uppercase;
  }

  input[type="checkbox"].switch {
    appearance: none;
    -webkit-appearance: none;
    background-color: lighten($color: $color1, $amount: 25%);
    border-radius: 20px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    height: 40px;
    outline: none;
    position: relative;
    width: 80px;

    &:hover {
      background-color: lighten($color: $color1, $amount: 15%);
    }

    &:hover:before,
    &:hover:checked::before {
      background-color: desaturate($neutral, $amount: 30%);
    }

    &:before {
      background-color: $neutral;
      border-radius: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
      // background-color: $neutral;
    }

    &:checked::before {
      left: 40px;
      background-color: $neutral;
    }
  }
}
</style>
