<template>
	<div>
		<!-- register new user form -->
		<div id="register">
			<h4>registerView</h4>
			<form @keyup.enter.prevent.stop="userRegister" autocomplete="off">
				<input v-model="registerEmail" required placeholder="email" />

				<input v-model="registerPassword" type="password" required placeholder="password" />

				<input
					v-model="registerPasswordConfirm"
					type="password"
					required
					placeholder="confirm password"
				/>
				<a @click="verifyCode">already got a code?</a>
				<br />
				<input type="button" value="Register" @click="userRegister" />
			</form>
			<ErrorOutput />
		</div>
		<!-- loading (during async await) -->
		<Loading v-if="loading" />
	</div>
</template>

<script>
import Loading from "../authorisation/helpers/Loading.vue";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
export default {
	name: "register",
	components: {
		Loading,
		ErrorOutput
	},
	data() {
		return {
			registerEmail: "",
			registerPassword: "123456!Wa",
			registerPasswordConfirm: "123456!Wa",
			loading: false
		};
	},
	methods: {
		// tried to sign a user up
		async userRegister() {
			// checks passwords match before calling Auth...
			if (this.registerEmail === "") {
				await this.$store.dispatch("authorisation/setError", {
					code: "local resolve",
					message: "Email cannot be empty"
				});
				return;
			}
			if (this.registerPassword !== this.registerPasswordConfirm) {
				await this.$store.dispatch("authorisation/setError", {
					code: "local resolve",
					message: "Confirmation password must match"
				});
				return;
			}
			// set component elements ready for ux
			this.loading = true;
			// calls Vuex method [signup] with collected local details (email/pword)
			await this.$store.dispatch("authorisation/register", {
				email: this.registerEmail,
				password: this.registerPassword
			});
			this.loading = false;
			return false;
		},
		verifyCode: function() {
			this.$store.dispatch("authorisation/updateConfirm", true);
			this.$store.dispatch("authorisation/setError", null);
		}
	}
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
