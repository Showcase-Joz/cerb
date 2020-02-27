<template>
	<nav id="nav">
		<router-link to="/">Home</router-link>
		<router-link to="/dashboard">Dashboard</router-link>
		<router-link to="/get">Get</router-link>
		<router-link to="/post">Post</router-link>
		<router-link to="/about">About</router-link>
		<!-- log state button -->
		<router-link id="log-state-off" v-if="!authUser" to="/login">Login</router-link>
		<router-link id="log-state-on" v-if="authUser" to="/logout">Logout</router-link>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "TopNav",
	computed: {
		...mapGetters({
			authUser: "authorisation/authUser"
		})
	}
};
</script>

<style lang="scss" scoped>
#nav {
	align-items: center;
	display: grid;
	font-size: medium;
	grid-template-columns: repeat(auto-fit, minmax(max-content, 50px));
	justify-content: center;
	padding: 15px 20px 0px;

	@include for-size(phone-up) {
		font-size: large;
		grid-gap: 3px;
		grid-template-rows: repeat(auto-fit, minmax(max-content, 50px));
		grid-template-columns: repeat(2, 1fr);

		padding: 5px;

		& > * {
			align-items: center;
			display: grid;
			height: 50px;

			&:hover {
				background-color: $color2;
				color: $color1;
			}
		}
	}

	a {
		color: inherit;
		padding: 0 5px;
		text-decoration: none;
		font-weight: bold;

		@include pointer-only() {
			background-color: pink;
		}

		&:hover {
			color: tint($color1, $tint75);
			text-decoration: underline;
			text-decoration-color: tint($color1, $tint50);
		}

		&.router-link-exact-active {
			color: $color1;
		}

		@include for-size(phone-up) {
			padding: initial;

			&:hover {
				color: $color1;
				text-decoration: none;
			}
		}
	}

	[id^="log-state"] {
		display: inline-block;
		position: absolute;
		right: 1rem;

		@include for-size(phone-up) {
			display: grid;
			grid-column-start: 2;
			grid-row-end: 1;
			position: relative;
			right: initial;
		}
	}
}
</style>