<template>
	<header>
		<div class="header-wrapper">
			<h1>Typhus</h1>
			<span
				class="version"
				:title="'Current vrsion of Typhon is: ' + appVersion"
			>v{{ this.appVersion }}</span>
			<!-- NEED TO EXTRACT connectionStatus to so that it's only active ondash, get, post views. This will allow the beforeDestroy method to prevent on views that do not require an online/offline state check. -->
			<ConnectionStatus />
		</div>
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
	</header>
</template>

<script>
import { mapGetters } from "vuex";
import ConnectionStatus from "../components/ConnectionStatus";
export default {
	name: "Header",
	components: {
		ConnectionStatus
	},
	data() {
		return {
			appVersion: "0.2.3"
		};
	},
	computed: {
		...mapGetters(["authUser"])
	}
};
</script>

<style lang="scss" scoped>
header {
	background-color: $color2;
	color: tint($color2, $tint100);
	display: grid;
	grid-auto-rows: 1fr minmax(auto, max-content);
	min-height: 120px;
	padding: 10px;

	@include for-size(phone-up) {
		padding: initial;
	}

	.header-wrapper {
		display: grid;
		grid-template-columns: 1fr min-content;
		grid-template-rows: 1fr min-content;
		width: max-content;
		justify-self: center;
		margin: auto;

		& h1 {
			color: tint($color2, $tint100);
      max-height: 42px;
      padding-right: 1px;
		}

		& span.version {
			color: tint($color2, $tint90);
			cursor: help;
      font-size: 10px;
      height: fit-content;
      margin-inline-start: 2px; 
			text-transform: none;
			transform: translate(-10px, 20px) rotate(90deg);
		}
	}
}

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
