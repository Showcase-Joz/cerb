<template>
  <header>
    <div>
      <h1>
        Cerberus
        <span
          class="version"
          :title="'Current vrsion of Cerberus is: ' + appVersion"
        >v{{ this.appVersion }}</span>
      </h1>
      <sup>
        ...is
        <span
          title="an external large details stored on S3"
          :class="{'status-green': this.connectionStatus,
          'status-red': !this.connectionStatus}"
        >{{ connectionStatus ? "online" : "offline" }}</span>
      </sup>
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
export default {
  name: "Header",

  data() {
    return {
      appVersion: "0.0.8",
      connectionStatus: false
    };
  },
  methods: {
    apiConnection: function() {
      this.$http.get("check").then(
        response => {
          console.log(response);
          if (response.ok === true) {
            this.connectionStatus = true;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  },
  beforeMount: function() {
    this.apiConnection();
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: $color2;
  color: tint($color2, $tint100);

  padding: 10px;
  // text-align: center;

  div {
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
      cursor: pointer;
      // display: inline-block;
      font-size: 10px;
      position: absolute;
      text-transform: none;
      transform: translate(-10px, 20px) rotate(90deg);
      // left: -20px;
      // position: relative;
    }

    & sup {
      font-variant: all-petite-caps;
      margin-right: 25x;
      text-align: right;

      span {
        &.status-red {
          color: $invalid;
        }

        &.status-green {
          color: $valid;
          position: relative;

          &::after {
            background-color: $valid;
            border-radius: 50%;
            bottom: 4px;
            content: "";
            height: 12px;
            position: absolute;
            width: 12px;
          }
        }
      }
    }
  }
}

#nav {
  padding: 15px 20px 0px;

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
