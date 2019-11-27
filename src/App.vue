<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  color: $color2;
  font-family: $primary-font-family;
  min-width: $minViewport;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.view-atfold {
  margin-bottom: $spacingDefault;
}

h1 {
  font-size: 2.5rem;
  text-transform: uppercase;
}

h4 {
  color: $color1;
}

// Animations
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeOutSpecial {
  0% {
    opacity: 1;
    height: inherit;
  }
  100% {
    opacity: 0;
    height: 0;
    margin: 0;
  }
}
</style>
