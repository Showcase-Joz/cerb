<template>
  <div>
    <h3>LogoutView</h3>
    <br>
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
