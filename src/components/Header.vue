<template>
  <header>
    <div class="header-wrapper">
      <h1>
        Cerberus
        <span
          class="version"
          :title="'Current vrsion of Cerberus is: ' + appVersion"
          >v{{ this.appVersion }}</span
        >
      </h1>
      <!-- NEED TO EXTRACT connectionStatus to so that it's only active ondash, get, post views. This will allow the beforeDestroy method to prevent on views that do not require an online/offline state check. -->
      <ConnectionStatus />
    </div>
    <nav id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/get">Get</router-link>|
      <router-link to="/post">Post</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
import ConnectionStatus from "../components/ConnectionStatus";
export default {
  name: "Header",
  components: {
    ConnectionStatus
  },
  data() {
    return {
      appVersion: "0.0.8"
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: $color2;
  color: tint($color2, $tint100);
  height: 100%;
  max-height: 120px;
  padding: 10px;
  // text-align: center;

  .header-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(max-content, auto) minmax(max-content, auto);
    width: max-content;
    justify-self: center;
    margin: auto;

    & h1 {
      color: tint($color2, $tint100);
      max-height: 42px;
      // margin: auto;
      // width: fit-content;
    }

    & span.version {
      color: tint($color2, $tint90);
      cursor: help;
      // display: inline-block;
      font-size: 10px;
      position: absolute;
      text-transform: none;
      transform: translate(-10px, 20px) rotate(90deg);
      // left: -20px;
      // position: relative;
    }
  }
}

#nav {
  font-size: medium;
  padding: 15px 20px 0px;

  @include for-size(phone-small) {
      font-size: smaller;
    }

  a {
    color: inherit;
    padding: 0 5px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: tint($color1, $tint75);
      text-decoration: underline;
      text-decoration-color: tint($color1, $tint50);
    }

    &.router-link-exact-active {
      color: $color1;
    }
  }
}
</style>
