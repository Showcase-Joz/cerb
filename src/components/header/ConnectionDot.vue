<template>
  <div class="status-group">
    <div
      :title="this.computedConnectionMessage"
      class="status connection"
      :class="{
        'green-bg': this.connectionStatus,
        'red-bg': !this.connectionStatus
      }"
    ></div>
    <div
      :title="this.computedServerMessage"
      class="status server"
      :class="{
        'green-bg': this.serverStatus,
        'red-bg': !this.serverStatus
      }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ConnectionDot",
  computed: {
    ...mapGetters({
      connectionStatus: "appInfo/connectionStatus",
      serverStatus: "appInfo/serverStatus"
    }),
    computedConnectionMessage: function() {
      return this.connectionStatus
        ? "Internet connection successful"
        : "You are OFFLINE!";
    },
    computedServerMessage: function() {
      return this.serverStatus ? "API check successful" : "API is OFFLINE!";
    }
  }
};
</script>

<style lang="scss" scoped>
.status-group {
  align-self: start;
  column-gap: 0.04em;
  display: grid;
  grid-template-columns: -webkit-min-content -webkit-min-content;
  grid-template-columns: min-content min-content;
  grid-gap: 1px;
  height: min-content;
  left: 2px;
  position: relative;
  transform: rotate(45deg);
  top: 2px;
  width: min-content;

  & .status {
    // transform: rotateZ(0);
    // animation: alpha-color 0.5s linear 10;

    &.server,
    &.connection {
      height: $status-size * 2;
      width: $status-size;
    }

    &.connection {
      border-bottom-left-radius: $status-size * 2;
      border-top-left-radius: $status-size * 2;
    }

    &.server {
      border-bottom-right-radius: $status-size * 2;
      border-top-right-radius: $status-size * 2;
    }
  }
}
</style>
