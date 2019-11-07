<template>
  <div class="header">
    <h1>
      Cerberus
      <h4>v0.1.0</h4>
    </h1>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/get">Get</router-link>|
      <router-link to="/post">Post</router-link>|
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;

  h4 {
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
    color: #fff;
    padding: 0 5px;
    text-decoration: none;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>