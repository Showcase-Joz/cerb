<template>
  <header>
    <h1>
      Cerberus
      <span :title="'Current vrsion of Cerberus is: ' + appVersion">v{{this.appVersion}}</span>
    </h1>
    <p>{{ apiConnection() }}</p>
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
  data(){
    return {
      appVersion: "0.0.8"
    }
  },
  methods: {
    apiConnection: function() {
      this.$http.get("check").then(
        response => {
          console.log(response);
          if (response.ok === true) {
            this.resultBoolean = true;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: $color2;
  color: tint($color2, $tint100);
  text-align: center;
  padding: 10px;
  margin-bottom: 2rem;

  & h1 {
    color: tint($color2, $tint100);
  }

  & span {
    color: tint($color2, $tint90);
    cursor: pointer;
    display: inline-block;
    font-size: 10px;
    text-transform: none;
    transform: translateY(-70%) rotate(90deg);
    left: -20px;
    position: relative;
  }
}

#nav {
  padding: 30px;

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
