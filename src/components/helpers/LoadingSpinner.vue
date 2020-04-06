<template>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.lds-ring {
  align-items: center;
  display: grid;
  height: 100%;
  justify-items: end;
  margin-right: 5px;
  position: absolute;
  opacity: 0.7;
  right: 0%;
  top: 0;
  width: 100%;
  z-index: 99999;

  @include for-size(phone-small) {
    margin-right: 10%;
  }
  @include for-size(tablet-portrait-up) {
    margin-right: 10px;
  }
}

.lds-ring div {
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border: 2.4px solid #fff;
  border-color: tint($color2, $tint100) transparent transparent transparent;
  border-radius: 50%;
  // box-sizing: border-box;
  display: block;
  height: 20px;
  position: absolute;
  width: 20px;

  @include for-size(phone-small) {
    border-width: 1.8px;
    height: 14px;
    width: 14px;
  }

  @include for-size(tablet-portrait-up) {
    border-width: 2.4px;
    height: 20px;
    width: 20px;
  }
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
