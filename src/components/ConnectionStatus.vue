<template>
  <sup>
    ...is
    <span
      :title="this.computedConnectionMessage"
      :class="{
        'status-green': this.connectionStatus,
        'status-red': !this.connectionStatus
      }"
      >{{ connectionStatus ? "online" : "offline" }}</span
    >
  </sup>
</template>
<script>
export default {
  name: "connectionStatus",

  data() {
    return {
      connectionStatus: false,
      polling: null
    };
  },
  methods: {
    apiConnection: function() {
      this.$http.get("check").then(
        response => {
          if (response.ok === true) {
            this.connectionStatus = true;
          } else {
            // rethink this, its not very accurate!!!
            this.connectionStatus = false;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    },
    pollData: function() {
      this.polling = setInterval(() => {
        this.apiConnection();
      }, 10000);
    }
  },
  computed: {
    computedConnectionMessage: function() {
      return this.connectionStatus
        ? "Cerberus is currently able to communicate with the API and serving ONLINE results"
        : "Cerberus is unable to communicate with the API and is therefore OFFLINE";
    }
  },
  beforeMount: function() {
    // check status before view loads
    this.apiConnection();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.pollData();
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  & sup {
    cursor: help;
    font-variant: all-petite-caps;
    justify-self: end;
    letter-spacing: 1px;
    margin-right: 5px;
    width: max-content;

    span {
      &.status-red {
        color: $invalid;
        position: relative;

        &::after {
          background-color: shade($invalid, $shade10);
          border-radius: 50%;
          content: "";
          bottom: 4px;
          height: 10px;
          margin-left: 4px;
          position: absolute;
          width: 10px;
        }
      }

      &.status-green {
        color: $valid;
        position: relative;

        &::after {
          background-color: $valid;
          border-radius: 50%;
          content: "";
          bottom: 4px;
          height: 10px;
          position: absolute;
          margin-left: 4px;
          width: 10px;
        }
      }
    }
  }
}
</style>
