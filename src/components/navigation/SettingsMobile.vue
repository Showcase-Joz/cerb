<template>
  <div id="settings">
    <div class="dash-nav-item settings-nav">
      <router-link to="/settings" tag="button" class="btn">&#9881;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings-Mobile"
};
</script>

<style lang="scss" scoped>
#settings {
  position: absolute;
  z-index: 99999;
  color: white;
  right: 0;
  font-size: clamp(30px, 2.5rem, 48px);
  height: 50px;

  display: flex;
  align-items: center;
  min-width: 50px;
	justify-content: center;

  @include pointer-only() {
    @include for-size(tablet-portrait-up) {
      display: none;
		}
		// @include for-size(desktop-up) {
    //   display: flex;
    // }
	}

	@include touch-only() {
    @include for-size(tablet-portrait-up) {
      display: flex;
		}
		@include for-size(tablet-landscape-up) {
      display: none;
		}
	}
	
	@include touch-and-pointer() {
    @include for-size(phone-small) {
      display: flex;
    }
  }

  & .btn {
    @include btn;
    color: inherit;
    font-size: inherit;
  }
}
</style>
