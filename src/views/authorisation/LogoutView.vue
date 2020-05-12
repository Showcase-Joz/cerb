<template>
  <div class="logout page">
    <br>
    <h4>Sign Out</h4>
    <br />
    <p><strong>You are currently logged in!</strong></p>
    <Logout />
  </div>
</template>

<script>
import Logout from "../../components/authorisation/Logout.vue";
export default {
  name: "LogoutView",
  components: {
    Logout
  }
};
</script>
<style lang="scss" scoped>
h4 {
  color: $valid;
  text-decoration: underline;
}
</style>