<template>
  <div class="home page">
    <img alt="Vue logo" src="../assets/logo.png" />

    <p v-if="this.authUser">
      Go to the
      <button class="btn-sign-valid" @click="dashBoard">Dashboard</button> to check your developement events
    </p>
    <p v-if="this.errMessage">
      There was as error, most recently:
      <ErrorOutput />
    </p>
    <p v-if="!this.authUser">
      You are currently logged out!
      <br />Please
      <button class="btn-sign-small-valid" @click="signIn">Sign In</button>
      to continue.
    </p>
    <br />
    <hr style="width:60%; margin: 0 auto;" />
    <br />
    <p v-if="this.authUser">
      You are currently logged in as
      <strong>{{ currentEmail }}</strong>.
    </p>
    <Logout v-if="this.authUser" />
    <br />
    <br />
    <br />
    <br />
    <hr style="width:80%; margin: 0 auto;" />
    <br />Check out the
    <button class="btn-smaller-unknown" @click="about">dev log</button>&nbsp;to see
    what's
    <em>changed</em>,
    <strike>broke</strike>, got fixed, or is
    <strong>new</strong>.
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorOutput from "../components/authorisation/helpers/ErrorOutput.vue";
import Logout from "../components/authorisation/Logout.vue";
export default {
	name: "home",
	components: {
		ErrorOutput,
		Logout
	},
	created() {
		if (this.authUser) {
			console.log("user is Authorised!!");
		}
	},
	methods: {
		signIn: function() {
			this.$router.push("/login");
		},
		dashBoard: function() {
			this.$router.push("/dashboard");
		},
		about: function() {
			this.$router.push("/about");
		}
	},
	computed: {
		// ...mapGetters(["authUser", "currentEmail"]),
		...mapGetters({
			authUser: "authorisation/authUser",
			currentEmail: "authorisation/currentEmail",
			errMessage: "authorisation/errMessage"
		})
	}
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" scoped>
button {
	@include general;

	&[class*="-small"] {
		font-size: $font-normal;
		max-height: 50px;

		@include for-size(tablet-portrait-up) {
			@include small;
		}
	}

	&[class*="-smaller-"] {
		font-size: $font-normal;
		max-height: 50px;

		@include for-size(tablet-portrait-up) {
			@include smaller;
		}
	}
}
</style>