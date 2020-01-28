<template>
  <div>
    <transition name="fade">
      <form
        v-if="this.$store.state.signedIn"
        id="logoutForm"
        @submit.prevent="signOut"
      >
        <div class="submit">
          <input type="submit" value="Logout" class="btn btn-submit" />
        </div>
      </form>
    </transition>
    $store {{ this.$store.state.signedIn }} ||
    <br />
    <!-- local {{ this.signedIn }} -->
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "Logout",
  methods: {
    signOut: function() {
      Auth.signOut()
        .then(data => {
          this.$store.state.signedIn = !!data;
          this.$store.state.user = null;
          console.warn("logged out!");
          // this.signedIn = !!data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" src="@/styles/_form.scss" scoped></style>
<style lang="scss" scoped>
#logoutForm {
  height: 320px;
  position: relative;

  & .submit {
    bottom: 0;
    position: absolute;
    transform: translateX(50%);
    width: 50%;
  }
}
</style>
