<template>
  <div id="logout">
    <p v-if="this.authUser">
      Would you like to
      <button class="btn-sign-smaller-invalid" @click="signOut">Sign Out</button
      >&nbsp;?
    </p>
    <div v-if="!this.authUser">
      <strong>You are already logged out</strong>.
      <p>
        Do you want to
        <router-link to="/login">login</router-link>&nbsp;again?
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Logout",
  methods: {
    signOut: function() {
      this.$store.dispatch("authorisation/logout");
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" scoped>
button {
  @include general;

  &[class*="-smaller"] {
    font-size: $font-normal;
    max-height: 50px;

    @include for-size(tablet-portrait-up) {
      @include smaller;
    }
  }
}
</style>
