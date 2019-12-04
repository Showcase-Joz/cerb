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
          :title="this.computedConnectionMessage"
          :class="{
            'status-green': this.connectionStatus,
            'status-red': !this.connectionStatus
          }"
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
          } else if (response.ok === false) {
            this.connectionStatus = false;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  },
  computed: {
    computedConnectionMessage: function() {
      return this.connectionStatus ? "Cerberus is currently able to communicate with the API and serving ONLINE results" : "Cerberus is unable to communicate with the API and is therefore OFFLINE";
    }
  },
  beforeMount: function() {
    this.apiConnection();
  },
  created () {
	setInterval(() => {
    console.log("new");
    this.apiConnection();
	}, 3000)
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
      cursor: help;
      // display: inline-block;
      font-size: 10px;
      position: absolute;
      text-transform: none;
      transform: translate(-10px, 20px) rotate(90deg);
      // left: -20px;
      // position: relative;
    }

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
