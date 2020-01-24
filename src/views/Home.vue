<template>
  <div class="home">
    <!-- <img alt="Vue logo" height="100px" src="../assets/logo.png" /> -->
    <LogInOut />
  </div>
</template>

<script>
import LogInOut from "../components/form/forms/LogInOut";
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
