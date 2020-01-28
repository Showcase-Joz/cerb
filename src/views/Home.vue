<template>
  <div class="home">
    <!-- <img alt="Vue logo" height="100px" src="../assets/logo.png" /> -->
    <LogInOut />
    <!-- {{ this.$store.state.signedIn }} -->
    <!-- {{ this.$store.state.user }} -->
  </div>
</template>

<script>
import LogInOut from "../components/form/forms/LogInOut";
// import { Auth } from "aws-amplify";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    LogInOut
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.home {
  overflow-y: scroll;
  height: 100vh;
}
</style>
